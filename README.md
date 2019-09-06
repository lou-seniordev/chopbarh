This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Builds the app and then deploys to Firebase on completion

### `npm run eject`

**Note: Do not eject unless you are absolutely sure you know what you are doing!**

## Source Code Methodology

The approach is such that production version is deployed only from the master branch. For development and test cases, deploy to the develop branch or any other branch. The develop branch is deployed to Netlify [here](https://chopbarh.netlify.com)

**Note: Do not push to the master branch directly. Create a PR instead to be merged to the master branch**
