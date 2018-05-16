const defaultState = {
  currentUser: "initialuser",
  currentUserSecret: "3ec585f2e04e4c12adcd2d13ab3d5b85",
  initView: {
    center: {
      lat: 33,
      lng: 120
    },
    zoom: 1
  },
  isFetchingMarkers: true,
  markers: [],
  uploadPending: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "REQUEST_MARKERS": {
      return {
        ...state,
        isFetchingMarkers: true
      };
    }
    case "RECEIVE_MARKERS": {
      return {
        ...state,
        isFetchingMarkers: false,
        markers: action.markers
      };
    }
    case "ADD_PHOTO": {
      const newUploadPending = [...state.uploadPending];
      newUploadPending.push(action.photo);
      return {
        ...state,
        uploadPending: newUploadPending
      };
    }
    case "ADD_PLACE": {
      const newUploadPending = [...state.uploadPending];
      newUploadPending[action.index] = {
        ...state.uploadPending[action.index],
        rawPlace: action.rawPlace
      };
      return {
        ...state,
        uploadPending: newUploadPending
      };
    }
    case "UPLOAD_PHOTOS": {
      return {
        ...state,
        uploadPending: [],
        isFetchingMarkers: true
      };
    }
    default:
      return state;
  }
};
