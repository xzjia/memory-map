import axios from "axios";
const DEFAULT_LOC = "Tokyo";

function requestMarkerss() {
  return {
    type: "REQUEST_MARKERS"
  };
}

function receiveMarkers(markers) {
  return {
    type: "RECEIVE_MARKERS",
    markers
  };
}

export function getMarkers() {
  return function(dispatch) {
    dispatch(requestMarkerss());

    return fetch("/api/v1/markers")
      .then(
        response => response.json(),
        error => console.log("An error occurred.", error)
      )
      .then(json => dispatch(receiveMarkers(json)));
  };
}

export function addPhoto(photo) {
  return {
    type: "ADD_PHOTO",
    photo
  };
}

export function addPlace(rawPlace, index) {
  return {
    type: "ADD_PLACE",
    rawPlace,
    index
  };
}

export function uploadPhotos(photos) {
  return function(dispatch) {
    dispatch({
      type: "UPLOAD_PHOTOS"
    });
    const data = new FormData();
    photos.forEach(photo => {
      data.append("photos", photo.file);
      const place = photo.rawPlace ? photo.rawPlace : DEFAULT_LOC;
      data.append("location", place);
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post("/api/v1/photos", data, config).then(response => {
      dispatch(requestMarkerss());
    });
  };
}
