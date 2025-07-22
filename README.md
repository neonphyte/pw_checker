# Password Checker

## Services
- Local Services
    - Web Server
    - Local Git Server
    - Local SonarQube

- Github Actions
    - Selenium Test cases
    - OWASP Dependency Checks
    - Eslint Security

### Web Server
- Runs on port 80 and accessible via 127.0.0.1:80
- Has a build file called `web.Dockerfile`

### Local Git Server
- Runs on port 3000
- Has a build file called `gitserver.Dockerfile`
- Create a /repos folder
    - `cd repos`
    - `git init --bare repository.git`
    - `git config --global init.defaultBranch main`
- Add local git server to your push
    - `git remote add localgit http://localhost:3000/repository.git`
- Double check: `git remote -v`
- Commands to run to push as a particular user:
    - `git config user.name "DONALD TRUMP"`
    - `git config user.email "test@mail.com"`
    - `git add .`
    - `git commit -m "Add this"`
    - `git push origin main` Push to Github
    - `git push localgit main` Push to Local Git

### Local SonarQube
- Runs on port 8000 and accessible via 127.0.0.1:8000
- Default login: admin / admin
- Prompt to change password when first login
#### Perform scanning
    1. Click the “Create a local project” link, located at the bottom left of the page.

    2. Input the project key and project name.

    3. Press “Use global settings”.

    4. Press “Locally”.

    5. Generate a token for your project, copy the token and you will be using the token in the Github Actions.

    6. Select Python and copy the code on the screen to execute the scanner on the directory of the files.

    7. View your Sonar Scanner result in SonarQube.


### Selenium Test cases
- Create a `.github/workflows/selenium-tests.yml` file
- The yml file runs SeleniumTest.mjs
- The test file runs 2 test cases: Entering a common password and a complex password
- Preferably to run the SeleniumTest.mjs first before moving to github


### OWASP Dependency Checks
- Create a `.github/workflows/dependency-check.yml` file
- Push to github to see the status on the repo


### Eslint Security
- Create your js web app
- Create a package.json using this command: `npm init -y`
- Install any services you need: `npm install express`
- Install eslint and sarif formatter
  - `npm install eslint -save-dev`
  - `npm install @microsoft/eslint-formatter-sarif -save-dev`
- Initialize eslint: `npx eslint --init`
  1. ✔ What do you want to lint? · javascript
  2. ✔ How would you like to use ESLint? · syntax
  3. ✔ What type of modules does your project use? · esm
  4. ✔ Which framework does your project use? · react
  5. ✔ Does your project use TypeScript? · no / yes
  6. ✔ Where does your code run? · browser
  7. The config that you've selected requires the following dependencies: eslint, globals, eslint-plugin-react
  8. ✔ Would you like to install them now? · Yes
  9. ✔ Which package manager do you want to use? · npm


#### eslint security plugin
- Install the plugin `npm install eslint-plugin-security -save-dev`
- Create .eslintrc.js and edit eslint.config.mjs to apply the plugin

#### eslint via Github Action
- Make sure repo is public and go to Security>Enable Code scanning alerts
- Make sure to declare and allow write permissions in the `cda-eslint.yml` file

### Others
- In the `docker-compose.yml` file, there wasn't a need to setup a user as Johnson Tay
- For sonarqube, you cant set the username and password as Aaron in the `docker-compose.yml`. GPT suggest to start sonarqube first then run a bash/shell script that calls sonarqube API to change the username and password. Does not make sense, could just login and change.