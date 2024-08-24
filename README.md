# NodeJs Person Api

NodeJs REST API for Person intended to be a best practices demo

## How to set up

### install dependencies

```powershell
npm install
```

### Configure Port

> If you change the port from default of `30083`, then update `launch.json` as well and change the `API_PORT` environment variable

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

## Run site

```powershell
npm start
```

-or-

```powershell
node .\index.js
```

## Unit tests

1. Make sure JEST is installed globally

```powershell
npm install jest --global
```

3. Run tests with

```powershell
jest --coverage
```

## JSDOC

1. Make sure site runs

2. Be in the root folder

3. Install JsDoc globally

```powershell
npm i jsdoc -g
```

4. Generate docs

```powershell
scripts/Invoke-JsDoc.ps1
```

5. Output will be in

`docs/`

Where `version` is the version attribute from `package.json`

7. The site can be lauched locally with

```powershell
cd docs/
start index.html
```

Which will launch documents in the default browser

## Docker

Files:

- .dockerignore
- Dockerfile
- scripts\Start-Docker.ps1

Run the PowerShell script to build and run docker container. Container will run as the user `Node`

## Recommendations for VS Code Extensions

1. https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
2. https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner
3. https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

## OWASP Considerations

### Let the infrastructure handle it

1. DDOS
2. IAM
3. `InfoRouter` routes are assumed to be blocked if needed

### Handle it in code

1. See InfoSec Middleware
2. `config\ev.js`
