const express = require("express");
const morgan = require("morgan");
const path = require("path");
const uuidv4 = require("uuid/v4");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, newFilename);
  }
});
const upload = multer({ storage });

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

app.post("/api/v1/photos", upload.array("photos"), (req, res) => {
  const locationArray = Array.isArray(req.body.location)
    ? req.body.location
    : [req.body.location];
  locationArray.forEach((loc, i) => {
    const fileObj = req.files[i];
    getGeoCode(loc).then(data => {
      savePhoto(currentUser, fileObj.path, fileObj.filename, data);
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
