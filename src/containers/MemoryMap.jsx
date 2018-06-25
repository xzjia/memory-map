import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";

const centerPhotoMarker = {
  position: "absolute",
  transform: "translate(-50%, -50%)"
};

const PhotoMarker = ({ src, altText }) => (
  <div className="photo-marker-container" style={centerPhotoMarker}>
    <img className="photo-marker" src={src} alt={altText} />{" "}
  </div>
);

class MemoryMap extends Component {
  render() {
    return (
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAycRTfGMX7OQl7tQDFlwS9P55PUIAULvM" }}
          defaultCenter={this.props.initView.center}
          defaultZoom={this.props.initView.zoom}
        >
          {this.props.markers.map((marker, id) => (
            <PhotoMarker
              lat={marker.lat}
              lng={marker.lng}
              src={marker.src}
              altText="Alternative photo"
              key={id}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  initView: state.initView,
  markers: state.markers
});

export default connect(mapStateToProps)(MemoryMap);
