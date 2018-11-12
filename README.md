# Login API with Mocha and nyc
Login API to manage log service of an use
"# mocha_nyc" 


#To Run project basic setup
 
 1- define your db host and port in config/default or run your mongod locally
 2- run cmd "npm install" to install all dependencies.

# To Run project in dev mode
 1- run cmd "npm run devstart"
 2- you find swagger UI on url- "http://localhost:4000/api/v1/docs" 

#To build project 
 1- run cmd "npm build"

#To build docker image 
 user existing docker file 
 1- run cmd "docker build -t {imageName} ." 
 
it will transpile project in es5 and run it on "http://localhost:4000/api/v1/docs"

# To test and build coverage report 
 1- Build the project using cmd "npm run build"
 2- press contol c to exit program
 3- Run cmd "npm test"

It will run all test cases and produce an coverage report under coverage folder in app directory. "# loginApi_mocha_chai" 
# ProjectSetup
