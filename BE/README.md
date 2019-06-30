# Notes from last time....

*This Folder includes the code for the BE app for Sweepstakes, to push changes you must be in the root folder of sweepstakes and to deploy the changes you must cd into the BE folder and push to heroku.*

## Set up of Sweepstakes BE *to run* Locally

To set up the env follow these steps:
- git clone this repo
- Run 'NPM i' to install packages
- Open the terminal and install mongod and mongo db clis tools
- Run 'mongod'
- Open a new window and run 'mongo'
- Run 'NPM run seed:dev' to seed dev environment
- Ensure DB seeded by checking mongo shell with 'show dbs' you can further check the collections with 
	'use Sweepstakes'
	'show collections'
	'db.*collection name*.find().pretty()'
- Run 'NPM run start:dev' to start api
- In the browser enter 'https://localhost:3000/api' to see the base api page

## Running dev env

```bash
Run in development mode - npm run start:dev
```

## Running tests

To run the tests follow these steps:
- Open the terminal and run 'mongo'
- Open new terminal window and run 'mongod'
- In the repo BE folder run 'NPM run seed:dev' to seed the test db
- Check the db has been sown in the terminal window with mongo running, run 'show dbs' to check 'Sweepstakes_test' exists, you can further check the internals if you wish with relevant mongo commands
- Run 'NPM run test' in the BE folder of the Repo to run Util tests

## Pushing changes to Heroku
- After Git adding all the files you wish to change currently I push to github then to heroku using 'git push heroku master'
- This builds the app and restarts using the heroku config


## URL's/Routes for api
### Teams
- GET Teams:---------------*'/api/teams/'*
- GET Team by id:-----------*'/api/teams/:team_ID'*
- POST Team:---------------*'/api/teams/:team_name'*
- DELETE Team:-------------*'/api/teams/:team_ID'*

### Groups
- GET Groups:--------------*'/api/groups/'*
- GET Group by id:----------*'/api/groups/:group_ID'*
- POST Group:--------------*'/api/groups/'*
- POST/Edit Group:----------*'/api/groups/:group_name'*

### Competitions
- GET Competitions:---------*'/api/competitions/'*
- GET Competition by id:----*'/api/competitions/:competition_ID'*
- POST Competition:--------*'/api/competitions/'*
- POST/Edit Competition:----*'/api/competitions/:competition_ID'*
- DELETE Competition:------*'/api/competitions/:competition_ID'*


### Users
- GET User login status:----*'/api/users/current?user_id'*
- GET User by name:-------*'/api/users/:user_name'*
- POST 'Create' User:------*'/api/users/'*
- POST Log User in:--------*'/api/users/login'*
- POST/Edit User by id:-----*'/api/users/:user_ID'*
- DELETE User by id:-------*'/api/users/:user_ID'*

#

## TO-DO

## BE

- started testing!
- finally got the first controller func working to send competitions
- started first error handling, *learn more about error handling
- fixed config to have test config and test db
- ADD Validation to requests!! ### https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7 ###
- Add validation on reserved api calls for superuser only 
- add authentication to delete requests
- CURRENTLY THE CURRENT ROUTE FOR USERS DOESNT WORK AS IT CANNOT AUTHENTICATE JWT

#