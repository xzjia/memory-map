This was created during my time as a student at Code Chrysalis.

# What is this

This is an application that one can choose and upload their photos, set a location for each of the photos, and then see them painted on google map.
A link with a google map containing all photos painted will be generated for each user, thus they can share the link.

# How to start

It will be necessary to have a GCP account to use Cloud Storage.

* Get the keys right.
  * Make a new file `.env` under the root of the app. Following keys are necessary:
    * `BUCKET_NAME`: Name of the bucket which will be used to store all the photos.
    * `CLOUD_STORAGE_KEY`: JSON key file path. The key is used to access Google Cloud Storage.
    * `GCP_PROJECT`: The name of your GCP project.
    * `GOOGLE_API_KEY`: The key used to query Google Geocoding API.
* For development
  * First install all the dependencies by `yarn install`
  * Then start up the server by `yarn start`.
  * Run `yarn hack` will give you access to the app on http://localhost:3000
* For production
  * First run a build by `yarn build`
  * Start up the server by `yarn start`, then it should be available on http://${~}:9000

# Future TODO

* Authentication
* Transcoding images into a smaller size
* Validation: Limit size of uploaded files
  * Location validation
* Read location from exif
* Deploy pipeline
* Clean up photos on the server
* Cluster on photos when zoom in/out of the map
* Tests!!!
