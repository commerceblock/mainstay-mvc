#!/bin/bash

case "$1" in
        nodejs)
            echo "Running node"
            sleep 12
            node ./src/app.js
            ;;
        signups)
            echo "Running signups"
            sleep 12
            node ./src/signups.js
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
