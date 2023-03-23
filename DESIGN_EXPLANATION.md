# Overview of project

This api has two endpoints on the /crypto route, one for receiving a list of all coins that are given as rewards and another for receiving a list of information about pools which offer a specific coin as rewards.

I added unit tests for the controller methods at these endpoints and integration testing to test the routes. 

I created an api folder in the root of the project. Inside /api there are 4 files, app, index, server, and cryptoRouter. app.js contains the middleware,routes, global error handler, and instance of express. I exported this so it will be available elsewhere. inside our entrypoint index I import app and listen on a port provided by the node environment or 3000. this makes testing easier as the ports can be unique. inside server.js is a function to export the app instance so it can be used in my testing files easily. 

# Design Decisions and Thoughts



In the crypto route handler inside app.js I added authentication middleware and finally the cryptoRouter. the auth middleware is first so that only requests which are authenticated will move on to the router.

 I added the crypto router to have a nice separation of the logic for those endpoints and avoid clutter. 

I created a controller folder inside /api to house the cryptoController and authController. 

Since for this project we have specific authorization credentials, I did not write anything to create credentials. I confirmed the presence of a bearer token in authorization headers and user in the request body. Then verified that they match the credentials provided.

Inside the protected crypto Router there are two endpoints. One for retrieving a list of all unique coins which can be received as rewards. The other for receiving a list of objects related to the coin passed in the request parameters. 

inside the cryptoController module I created a cache to store data returned from the request to minerstat. This is to limit unnecessary requests. Items in the cache expire after 5 minutes, which should ensure that data is fresh. This reduces response time from over 1000 ms on a cache miss to as low as 10 ms on a cache hit. 

In getAllRewards I am using a set to store the unique names of all of the 'reward_unit' coins in the list of objects from minerstat.

In coinPools I am also making use of the cache, checking for the presence of our specific key , and in the case of a cache miss the presence of our initial data returned from minerstat. there is a great benefit to time here as well. I decided to return all of the information about the pools which have the top 10 highest 'reward' value. I am trusting the user to know what to do with the information, since I personally am not familiar with crypto mining pools. 


I am using the dotenv module to store the address for our minerstat api. this is also hardcoded into files in this case since we are not in production and other people will need to take a look at the code without the .env file.

I tested to ensure that routes are properly protected, unknown routes return correct error, that the controllers catch errors properly, and that the responses will return what is expected from the controllers. I did end up working closer to 4 hours and testing did take up the bulk of my time. Testing is something I am looking forward to getting more work with.

Thank you for this opportunity, I look forward to discussing this and working with you!



