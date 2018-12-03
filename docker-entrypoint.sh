#!/bin/bash

case "$1" in
        nodejs)
            echo "Running node"
            sleep 12
            node ./src/api.js
            ;;
        webpack)
            echo "Running webpack dev server"
            webpack-dev-server
            ;;
        shell)
            bash
            ;;
        *)
            echo $"Usage: $0 {nodejs|webpack}"
            exit 1

esac