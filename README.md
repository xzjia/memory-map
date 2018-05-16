This was created during my time as a student at Code Chrysalis.

# What is this

This is an appication that one can choose and upload their photos, set a location for each of the photos, and then see them painted on google map.

# How to start

You will need a GCP account to use their Cloud Storage. It should be the same with S3 on AWS, but some utility functions will be necessary.

* Get the keys right. \* \*
* For development
  * First start up the server by `yarn start`.
  * Then run `yarn hack` will give you access to the app on http://localhost:3000
* For production

  * First run a build by `yarn build`
  * Start up the server by `yarn start`, then it should be available on http://localhost:9000

* Something that binds to the environment
  * The path of Google Cloud Storage key in `server/gcp.js`
  * The bucket name in Storage in `server/gcp.js`
  * The geocoding API key in `server/gcp.js`
