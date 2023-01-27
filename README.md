# React_weather_App
Created with CodeSandbox
API Info:
Method: GET URL: https://api.openweathermap.org/data/2.5/weather?q={CITY_NAME}&appid={API_KEY
When Documentation Becomes Important?
You have multiple teams working on the same project.
You building some component library that is used by many people
You forget things very easily( like me :P )
Advantages of Having Good Documentation
It’s a sign that the developers care about this project
It helps new people to understand the project quickly
Good documentation reduces the chance of misunderstanding
The documentation itself can be a great asset besides your application
Good documentation can sometimes work as a style guide for others.
Documentation increases the value of a project.
There are many ways today we will be using react-styleguidist. So let's get started
Step 1. Install dependencies
First, install the required dependencies

npm install --save-dev react-styleguidist
Step 2. Start Server
You don’t need to configure anything if you created your app with create-react-app . Now start the dev server.

npx styleguidist server

If you want to build your documentation you can build it as a static resource

npx styleguidist build
Step 3. Start Basic Documenting
Before starting to add any kind of documentation you need to remember one thing that react-styleguidist will by default look inside the src/components directory and try to match any file with an extension of .js .ts .jsx .tsx etc.

So Make sure you have all your components under the directory named components . You can override this behavior if you like.

Also, this library is smart enough to find out the appropriate components that need documenting. For example, it excludes all files inside __tests__ folder.

First, create a new component named CustomButton.tsx It is a very simple button component that takes a title as a prop.

step 4 to Start server
> npm start
it will start 
