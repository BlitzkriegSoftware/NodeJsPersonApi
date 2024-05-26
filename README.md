# NodeJs Person Api

NodeJs REST API for Person

## How to set up

### install dependencies

`npm install`

### Configure Port

> If you change the port from default of `30083`, then update `launch.json` as well and change the `API_PORT`

Configure port (powershell)

```powershell
setx API_PORT 30083
```

Refresh the environment variables

if you have https://community.chocolatey.org/ installed, just run

```powershell
refreshenv
```

If not, close and re-open the terminal to get a fresh session + vars

### generate swagger

`npm swagger-autogen`

-or-

`node .\swagger.js`

## Run site

`npm start`

-or-

```powershell
node .\index.js
```

## Unit tests

1. Make sure JEST is installed

`npm install --save-dev jest` (is part of the packages)

2. Install it globally

`npm install jest --global`

3. Run tests with

`jest --coverage`

## JSDOC

1. Make sure site runs

2. Be in the root folder

3. Install JsDoc (if not already)

`npm i jsdoc -g`

4. Generate docs

`jsdoc -c ./jsdoc.json ./package.json -R ./README.md --verbose`

5. Output will be in

`out/nodejs_people_api/{version}/`

Where `version` is the version attribute from `package.json`

7. The site can be lauched with

```powershell
cd out/nodejs_people_api/{version}/
start index.html`
```

Which will launch documents in the default browser

## Recommendations for VS Code Extensions

1. https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
2. https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner
3. https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
