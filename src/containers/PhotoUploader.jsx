import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import { addPhoto, addPlace, uploadPhotos } from "../actions/index";

class PhotoUploader extends Component {
  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={accepted => this.props.addPhoto(accepted[0])}
            style={{
              width: "50%",
              height: "100%",
              borderWidth: "2px",
              borderColor: "rgb(102, 102, 102)",
              borderStyle: "dashed",
              borderRadius: "5px",
              display: "inline-block",
              marginTop: "3em",
              marginBottom: "3em"
            }}
          >
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
        <NotificationContainer />
        <aside>
          {this.props.uploadPending.length > 0 ? (
            <div className="selectedHeader">
              <h2>Selected files</h2>
              <button
                onClick={() =>
                  this.props.uploadPhotos(this.props.uploadPending)
                }
                className="upload-button"
              >
                <span>Upload</span>
              </button>
            </div>
          ) : (
            ""
          )}
          <ul className="upload-preview-container">
            {this.props.uploadPending.map((f, index) => (
              <div key={f.name} className="upload-preview-item">
                <img
                  className="upload-preview"
                  src={f.preview}
                  alt="Uploaded preview"
                />{" "}
                <input
                  type="text"
                  className="place-input"
                  placeholder="Name of Place, default to Tokyo"
                  onChange={event =>
                    this.props.addPlaceToPhoto({ event, index })
                  }
                />
              </div>
            ))}
          </ul>
        </aside>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  uploadPending: state.uploadPending,
  currentUserSecret: state.currentUserSecret
});

const mapDispatchToProps = dispatch => {
  return {
    addPhoto: photo => {
      const action = addPhoto({
        name: photo.name,
        preview: photo.preview,
        file: photo
      });
      dispatch(action);
    },
    addPlaceToPhoto: ({ event, index }) => {
      const action = addPlace(event.target.value, index);
      dispatch(action);
    },
    uploadPhotos: photos => {
      const action = uploadPhotos(photos);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUploader);
