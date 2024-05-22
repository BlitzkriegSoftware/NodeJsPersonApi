# NodeJsPersonApi

NodeJs REST API for Person

## How to set up

1. install deps

`npm i`

2. generate swagger

`npm swagger-autogen`

## Configure Port

1. Configure port (powershell)

`setx API_PORT 30090`

Refresh the shell to load variable

> OR

2. Edit `launch.json`

Change the `API_PORT`

## Run site

`npm start`

## Unit tests

1. Make sure JEST is installed

`npm install --save-dev jest` (is part of the packages)

2. Install it locally

`npm install jest --global`

3. Run tests with

`jest`
