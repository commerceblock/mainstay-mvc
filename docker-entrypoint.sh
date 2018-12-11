#!/bin/bash

case "$1" in
        nodejs)
            echo "Running node"
            sleep 12
            node ./src/app.js
            ;;
        webpack)
            echo "Running webpack dev server"
            ./node_modules/webpack-dev-server/bin/webpack-dev-server.js
            ;;
        shell)
            bash
            ;;
        *)
            echo $"Usage: $0 {nodejs|webpack}"
            exit 1

esac
