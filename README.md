# Event applications

## Technologies used
- [Node.js v14.16](https://nodejs.org) - Check allowed functionalities for this version of Node on [node.green](http://node.green/)
- [Express](https://expressjs.com/) -  Web server
- [React v17](https://reactjs.org/) - UI library
- [Redux](http://redux.js.org/docs/basics/UsageWithReact.html) – State management
- [React Router](https://github.com/ReactTraining/react-router) – SPA URL routing
- [React Bootstrap 4](https://react-bootstrap.github.io/) – CSS Framework
- [Formik](https://formik.org/) - Forms framework
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) – Client-side requests handler
- [Yup](https://github.com/jquense/yup) - Object schema validator
- [Docker](https://docker.com) - for development purposes and AWS deployments
- [Passport](http://www.passportjs.org/) - authentication middleware
- [Sequelize](https://sequelize.org/) - DB ORM

## Tools Used

- [ESLint](https://eslint.org/) - static code analysis for JS files
- [Stylelint](https://stylelint.io/) - static code analysis for SCSS files
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - override user/workspace settings with settings found in `.editorconfig` files

## Documentation

This project includes code for both the Node server (at the root) and the client app (under the /client folder).

### Node version

The app is developed using Node 14.16. To set the correct version you can use [nvm](https://github.com/creationix/nvm) and just run `nvm use` in the main directory. The command will use `.nvmrc` file to set the Node version.

### Database

Event Applications app is running with MySql database. In order to connect to DB you need to provide config environment variables which can be found in `.env.template` file:

```
MYSQL_HOST =
MYSQL_DATABASE =
MYSQL_USER =
MYSQL_PASSWORD =
MYSQL_PORT =
```

### Running the app in development mode

First, make sure that you completed the following steps:
- [You use a correct node version](#node-version).
- [Provide DB config environment variable values](#database)

Then install NPM packages by running the following command in project's root directory:
```
npm run install:all
```

Now you can use [`docker-run` script](#documentation-of-docker-run-script) to run the containers:

```
./docker-run
```

You can either run it with already existing MySql instance to which you have access, or run `MySql 5.7` docker image in parallel with Event Applications by attaching additional docker-compose file to `docker-run`:

```
./docker-run --file db
```

### Documentation of docker-run script

To run the containers:
```
./docker-run
```

To force-recreate the containers:
```
./docker-run -c or --create
```
To rebuild the images:
```
./docker-run -r or --rebuild
```

To stop the containers:
```
./docker-run -d or --down
```

To log the output:
```
./docker-run -l or --logs
```

To log the output in watch mode:
```
./docker-run -f or --follow
```

To pull newest images from artifactory:
```
./docker-run -p or --pull
```

For help:
```
./docker-run -h or --help
```

If you want to use different docker-compose file than the default `docker-compose.yml` use `--file` param, for example:
```
./docker-run --file db -c
```

which would run both `docker-compose.yml` and `docker-compose.db.yml`
