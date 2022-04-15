// >> REACT FINAL FORM
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  streams: streamReducer,
});

// REACT FORM
// import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
// import authReducer from './authReducer';
// import streamReducer from './streamReducer';

// export default combineReducers({
//   auth: authReducer,
//   form: formReducer,
//   streams: streamReducer,
// });
