#!/bin/bash
NAME=$1
ID=$2
RUNNER_IP=$3

echo $NAME $ID $RUNNER_IP
exit 2

CIRCUIT_BREAKER=10
jitter() {
  SHORTEST=25
  LONGEST=500
  DIV=100
  EXP=$(perl -e "print $SHORTEST**$1")
  MIN=$(($EXP>$LONGEST ? $LONGEST : $EXP))
  RND=$(shuf -i$SHORTEST-$MIN -n1)
  perl -e "print $RND/$DIV"
}

#RUNNER_IP=${{ steps.get-execute-cypress-ip.outputs.RUNNER_IP }}

echo "Runner IP:  ${RUNNER_IP}"
for i in {1..$CIRCUIT_BREAKER}; do
#  WAF_CONFIG=$(aws wafv2 get-ip-set --scope CLOUDFRONT --id ${{ steps.fetch-ip-set-info.outputs.IPSET_ID }} --name ${{ steps.fetch-ip-set-info.outputs.IPSET_NAME }})
  WAF_CONFIG=$(aws wafv2 get-ip-set --scope CLOUDFRONT --id ${ID} --name ${NAME})
  echo "Waf Config:  ${WAF_CONFIG}"

  IP_ADDRESSES=($(jq -r '.IPSet.Addresses | .[]' <<< ${WAF_CONFIG}))
  IP_ADDRESSES+=("$RUNNER_IP")

  STRINGIFIED=$(echo $(IFS=" " ; echo "${IP_ADDRESSES[*]}"))
  echo "Ip Addresses:  ${STRINGIFIED}"

  OCC_TOKEN=$(jq -r '.LockToken' <<< ${WAF_CONFIG})
  echo "LockToken:  ${OCC_TOKEN}"

#  OUTPUT=$(aws wafv2 update-ip-set --name ${{ steps.fetch-ip-set-info.outputs.IPSET_NAME }} --scope CLOUDFRONT --id ${{ steps.fetch-ip-set-info.outputs.IPSET_ID }} --lock-token ${OCC_TOKEN} --addresses ${STRINGIFIED})
  OUTPUT=$(aws wafv2 update-ip-set --scope CLOUDFRONT --id ${ID} --name ${NAME} --lock-token ${OCC_TOKEN} --addresses ${STRINGIFIED})
  CMD_CD=$?
  echo "AWS CLI Response Code:  ${CMD_CD}"
  echo "AWS CLI Response:  ${OUTPUT}"

  [[ $CMD_CD -ne 0 ]] || break

  SLEEP_FOR=$(jitter($i))
  echo "Sleeping for ${SLEEP_FOR} seconds..."
  sleep ${SLEEP_FOR}
done

[[ $CIRCUIT_BREAKER == $i ]] && echo “Attempts to update WAF IPSet exceeded, exiting.” && exit 2
echo "Applied the IP successfully."

exit 0