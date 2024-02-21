# Mainstay-MVC

## Technologies Used

[![Bootstrap](https://img.shields.io/badge/Bootstrap-v4.1.3-blue.svg)](https://github.com/twbs/bootstrap/tree/v4.1.3)
[![Reactstrap](https://img.shields.io/badge/Reactstrap-v6.5.0-blue.svg)](https://github.com/reactstrap/reactstrap/releases/tag/6.5.0)
[![React](https://img.shields.io/badge/React-v16.6.3-blue.svg)](https://github.com/facebook/react/releases/tag/v16.6.3)
[![Webpack](https://img.shields.io/badge/Webpack-v4.27.1-blue.svg)](https://github.com/webpack/webpack/releases/tag/v4.27.1)


## Install

Update to the latest version of npm

```perl
npm install npm -g
```

Install dependencies

```perl
npm install --legacy-peer-deps
```

```perl
npm rebuild node-sass
```

Create replication Mongodb [![Mongodb](https://img.shields.io/badge/Mongodb-r4.1.6-blue.svg)](https://github.com/mongodb/mongo/releases/tag/r4.1.6)


```perl
sudo mongod --replSet "rs"
```

Launch mongo in another terminal

```perl
mongo
```

In mongo

```perl
rs.initiate()

```

Import db for testing
```perl
mongorestore -d "mainstayX" ./dbTest
```

Run API server app
```perl
JWT_SECRET="dhe?3wfje;wf1" DB_NAME="mainstayX" DB_PORT="27017" DB_HOST="127.0.0.1" LISTEN_API="4000" node ./src/app.js
```

Run Webpack dev server (website)
```perl
npm run
```

