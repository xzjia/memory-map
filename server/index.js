const express = require("express");
const morgan = require("morgan");
const uuidv4 = require("uuid/v4");
const path = require("path");
const Multer = require("multer");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

const { getPhotos, savePhoto, getGeoCode } = require("./gcp");

const PORT = process.env.PORT || 9000;
const currentUser = "initialuser";

const app = express();

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

app.get("/api/v1/markers", async (req, res) => {
  try {
    const photoMarkers = await getPhotos();
    res.send(photoMarkers);
  } catch (err) {
    console.error("Error loading photo markers!", err);
    res.send(500, "Internal server error");
  }
});

app.post("/api/v1/photos", multer.array("photos"), (req, res, next) => {
  const locationArray = Array.isArray(req.body.location)
    ? req.body.location
    : [req.body.location];
  locationArray.forEach((loc, i) => {
    const fileObj = req.files[i];
    console.log(fileObj);
    const newFilename = `${uuidv4()}${path.extname(fileObj.originalname)}`;
    getGeoCode(loc).then(data => {
      savePhoto(currentUser, newFilename, fileObj.buffer, data);
    });
  });
  res.status(200).send("All photos uploaded.");
});

app.use(express.static(path.join(__dirname, "../build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

console.log("Starting express...");
app.listen(PORT, () => {
  console.log(`Access http://localhost:${PORT}/api/v1/markers`);
});
