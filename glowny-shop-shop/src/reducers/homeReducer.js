import * as types from '../actions/actionTypes.js';

const defaultState = {
  onProgress: false,
  snackbarOpen: false,
  snackbarMessage: '',
};

export default function(state = defaultState, action) {
  switch (action.type) {

    case types.UPDATE_HOME_ON_PROGRESS:
      return {
        ...state,
        onProgress: action.onProgress,
      }

    case types.UPDATE_HOME_SNACKBAR:
      return {
        ...state,
        snackbarOpen: action.snackbarOpen,
        snackbarMessage: action.snackbarMessage,
      }

    default: return state;
  }
}
