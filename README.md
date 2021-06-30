![yarn](https://img.shields.io/badge/yarn->=v1.22.0-blue)
![storybook](https://img.shields.io/badge/storybook->=v6.1.21-blue)

# Atlas of Population Genetics

An application for presenting evolutionary phenomena using visualizations and animations.

## Maintainer

James Bain

<jamescbain@gmail.com>


## Installation and running

### mapbox

This project actively uses [mapbox](https://docs.mapbox.com/) for its mapping features. In order to get those features to work in development, you must first create an account and generate an api key. The api key should then be set in your `.env.local` file as `REACT_APP_MAPBOX_API_KEY`. 

```
# .env.local
REACT_APP_MAPBOX_API_KEY="your key goes here"
```

**locally**

Open a terminal and download the repo. Navigate to the top level of the repository and run `yarn` to install the application dependencies.

```sh
cd path/to/popgen-atlas && yarn
```

To start a development session of the application, run 

```sh
yarn start
```

and navigate to <localhost:3000/>

**docker**

You can also run a docker container as your development environment. First build the image:

```sh
docker build -t <tag-name> .
```

Then run a container with a development version of the application

```sh
docker run -it <tag-name> yarn start
```

port 3000 is exposed so you can then navigate to <localhost:3000/>

You can also run storybook to build components through this container by running 

```sh
docker run -it <tag-name> yarn storybook
```

Then navigate to <localhost:6006/>


