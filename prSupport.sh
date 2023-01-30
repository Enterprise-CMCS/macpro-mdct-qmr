#!/bin/bash

set -e

stage=${1:-dev}

export PATH=$(pwd)/node_modules/.bin/:$PATH
