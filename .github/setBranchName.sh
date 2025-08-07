#!/bin/bash

set -e

GITHUB_REFNAME="${1}"

[ -z "${GITHUB_REFNAME}" ] && echo "Error setting branch name.  No input given." && exit 1

# Change "main" to "master"
if [ "${GITHUB_REFNAME}" = "main" ]; then
  GITHUB_REFNAME="master"
fi

case ${GITHUB_REFNAME} in
  $([[ "$GITHUB_REFNAME" =~ ^dependabot/.* ]] && echo ${GITHUB_REFNAME}))
    echo ${GITHUB_REFNAME} | md5sum | head -c 10 | sed 's/^/x/'
    ;;
  $([[ "$GITHUB_REFNAME" =~ ^snyk-* ]] && echo ${GITHUB_REFNAME}))
    echo ${GITHUB_REFNAME##*-} | head -c 10 | sed 's/^/s/'
    ;;
  *)
    echo ${GITHUB_REFNAME}
    ;;
esac
