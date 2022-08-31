# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup
To run the frontend and backend, install Docker [here](https://docs.docker.com/get-docker/).

Verify Docker is running with ```docker -v``` and ```docker-compose -v``` in the terminal.

Confirm that you run all scripts on one of the containers created by ```docker-compose up``` or use ```docker exec``` to run commands on a running container.

Execute a command on a running container with ```docker exec -it anythink-backend bash```.

Execute command to run mongodb container with ```docker exec -it mongodb mongo```.

If Docker is working, test backend by pointing to browser to [http://localhost:3000/api/ping](http://localhost:3000/api/ping)

Test frontend and make sure it's connected to backend by creating new user here: [http://localhost:3001/register](http://localhost:3001/register)

**[TODO 05/01/2018 @vanessa-cooper]:** _It's been a while since anyone ran a fresh copy of this repo. I think it's worth documenting the steps needed to install and run the repo on a new machine?_
