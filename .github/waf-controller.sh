#!/usr/bin/env bash

CIRCUIT_BREAKER=10
AWS_RETRY_ERROR=254
#0, 1, 2 are the levels of debug, with 0 being off
DEBUG=1

set -o pipefail -o nounset -u

NAME="${1}"
ID="${2}"
RUNNER_IP="${3}/32"

[[ $DEBUG -ge 1 ]] && echo "Inputs:  NAME ${NAME}, ID ${ID}, RUNNER_IP ${RUNNER_IP}"

#Exponential backoff with jitter
jitter() {
  #.25 seconds
  SHORTEST=25
  #5 seconds
  LONGEST=500
  DIV=100
  EXP=$(perl -e "print $SHORTEST**$1")
  MIN=$(($EXP>$LONGEST ? $LONGEST : $EXP))
  RND=$(shuf -i$SHORTEST-$MIN -n1)
  perl -e "print $RND/$DIV"
}

for ((i=1; i <= $CIRCUIT_BREAKER; i++)); do
  for ((j=1; j <= $CIRCUIT_BREAKER; j++)); do
    #Read WAF configuration from AWS
    WAF_CONFIG=$(aws wafv2 get-ip-set --scope CLOUDFRONT --id ${ID} --name ${NAME})
    CMD_CD=$?
    [[ $DEBUG -ge 1 ]] && echo "AWS CLI Read Response Code:  ${CMD_CD}"
    [[ $DEBUG -ge 2 ]] && echo "AWS CLI Read Response:  ${WAF_CONFIG}"

    #If the retries exceeded error code is returned, try again, otherwise exit the loop
    [[ $CMD_CD -eq $AWS_RETRY_ERROR ]] || break

    #Using the outer loop to configure jitter is intentional, let's scale retries globally
    SLEEP_FOR=$(jitter ${i})
    echo "CLI retries exceed.  Waiting for ${SLEEP_FOR} seconds to execute read again..."
    sleep ${SLEEP_FOR}
  done

  #Unable to get the lock tocken and IP set so there isn't any point in attempting the write op
  [[ $j -ge $CIRCUIT_BREAKER ]] && echo “Attempts to read WAF IPSet exceeded” && sleep $(jitter ${i}) && continue

  #The loop was short circuited with an error code other than 0, so something is wrong
  [[ $CMD_CD -eq 0 ]] || echo "An unexpected read error occurred:  ${CMD_CD}" && exit 2

  echo "Read was successful."

  #Parse out IP set addresses to array
  IP_ADDRESSES=($(jq -r '.IPSet.Addresses | .[]' <<< ${WAF_CONFIG}))

  #This really can't happen because each node in the matrix gets a unique IP
  [[ -n "${IP_ADDRESSES[$RUNNER_IP]}" ]] && echo "IP is present in IP Set." && exit 0

  #Add runner IP to array
  IP_ADDRESSES+=("$RUNNER_IP")

  #Stringify IPs
  STRINGIFIED=$(echo $(IFS=" " ; echo "${IP_ADDRESSES[*]}"))
  [[ $DEBUG -ge 2 ]] && echo "Ip Addresses:  ${STRINGIFIED}"

  #Parse out optimistic concurrency control token
  OCC_TOKEN=$(jq -r '.LockToken' <<< ${WAF_CONFIG})
  [[ $DEBUG -ge 2 ]] && echo "LockToken:  ${OCC_TOKEN}"

  for ((k=1; k <= $CIRCUIT_BREAKER; k++)); do
    #Write updated WAF configuration to AWS
    OUTPUT=$(aws wafv2 update-ip-set --scope CLOUDFRONT --id ${ID} --name ${NAME} --lock-token ${OCC_TOKEN} --addresses ${STRINGIFIED})
    CMD_CD=$?
    [[ $DEBUG -ge 1 ]] && echo "AWS CLI Write Response Code:  ${CMD_CD}"
    [[ $DEBUG -ge 2 ]] && echo "AWS CLI Write Response:  ${OUTPUT}"

    #If the retries exceeded error code is returned, try again, otherwise exit the loop
    [[ $CMD_CD -eq $AWS_RETRY_ERROR ]] || break

    #Using the outer loop to configure jitter is intentional, let's scale retries globally
    SLEEP_FOR=$(jitter ${i})
    echo "CLI retries exceed.  Waiting for ${SLEEP_FOR} seconds to execute write again..."
    sleep ${SLEEP_FOR}
  done

  [[ $CMD_CD -ne 0 ]] || break
  #Still not having success, so try again

  echo "Error:  ${OUTPUT}"

  SLEEP_FOR=$(jitter ${i})
  echo "Waiting for ${SLEEP_FOR} seconds to execute main loop again..."
  sleep ${SLEEP_FOR}
done

[[ $DEBUG -ge 1 ]] && echo "Attempts to update ip set:  $i"

[[ $i -ge $CIRCUIT_BREAKER ]] && echo “Attempts to update WAF IPSet exceeded, exiting.” && exit 2

echo "Applied the IP successfully."

#Things should not have made it this far without being able to successfully write the IP
exit $CMD_CD
