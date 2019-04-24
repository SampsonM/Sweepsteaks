# Notes from last time....

*This Folder includes the code for the BE app for Sweepstakes, to push changes you must be in the root app and to deply the changes you must cd into the BE folder and push to heroku.*

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

#
## TO-DO
#

## BE

- started testing!
- finally got the first controller func working to send competitions
- started first error handling, *learn more about error handling
- fixed config to have test config and test db
- ADD Validation to requests!! ### https://medium.freecodecamp.org/how-to-make-input-validation-simple-and-clean-in-your-express-js-app-ea9b5ff5a8a7 ###
- Add validation on reserved api calls for superuser only 
- add authentication to delete requests

#

## FE

- Challenge....
- Build a version of the front end in angular, react and vue!

#


