const Storage = require("@google-cloud/storage");
const axios = require("axios");

const storage = Storage();

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
console.log(`bucketname is ${bucketName}`);

const bucket = storage.bucket(bucketName);
const publicBaseUrl = `https://storage.googleapis.com/${bucketName}/`;
const googleGeoCodeBaseUrl = `https://maps.googleapis.com/maps/api/geocode/json`;

const GOOGLE_GEO_API_KEY = process.env.GOOGLE_GEO_API_KEY;

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

const savePhoto = (currentUserName, fileName, fileBuffer, metadata) => {
  const blob = bucket.file(`${currentUserName}/${fileName}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      metadata: {
        ...metadata
      }
    }
  });
  blobStream.on("error", err => {
    console.log("error", err);
  });
  blobStream.on("finish", () => {
    console.log("Finished uploading for ", fileName);
  });
  blobStream.end(fileBuffer);
};

const getGeoCode = async placeName => {
  const response = await axios.get(googleGeoCodeBaseUrl, {
    params: {
      key: GOOGLE_GEO_API_KEY,
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
