const Storage = require("@google-cloud/storage");
const axios = require("axios");
const projectId = process.env.GCP_PROJECT;

const storage = new Storage({
  projectId,
  keyFilename: process.env.CLOUD_STORAGE_KEY
});

const bucketName = process.env.BUCKET_NAME;

const bucket = storage.bucket(bucketName);
const publicBaseUrl = `https://storage.googleapis.com/${bucketName}/`;
const googleGeoCodeBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const getPhotos = () => {
  return bucket
    .getFiles()
    .then(results => results[0])
    .then(files =>
      files.filter(file => file.metadata.metadata).map(file => ({
        src: publicBaseUrl + file.metadata.name,
        lat: file.metadata.metadata.lat,
        lng: file.metadata.metadata.lng
      }))
    )
    .catch(err => {
      console.error("ERROR:", err);
    });
};

const savePhoto = (currentUserName, photoPath, fileName, metadata) => {
  const options = {
    destination: `${currentUserName}/${fileName}`,
    public: true,
    metadata: {
      metadata: {
        ...metadata
      }
    }
  };
  bucket
    .upload(photoPath, options)
    .then(() => {
      console.log(`${fileName} uploaded successfully `);
    })
    .catch(err => {
      console.log(`Error happened when uploading ${fileName} ${err}`);
    });
};

const getGeoCode = async placeName => {
  const response = await axios.get(googleGeoCodeBaseUrl, {
    params: {
      key: GOOGLE_API_KEY,
      address: placeName
    }
  });
  return response.data.results[0].geometry.location;
};

module.exports = {
  getPhotos,
  savePhoto,
  getGeoCode
};
