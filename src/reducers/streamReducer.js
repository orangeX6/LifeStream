import _ from 'lodash';
import {
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_STREAMS:
      //lodash
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    //JS
    // return action.payload.reduce((obj, el) => ({ ...obj, [el.id]: el }), {
    //   ...state,
    // });
    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_STREAM:
      // Lodash
      return _.omit(state, action.payload);
    //JS ALT  1
    //   const { [action.payload]: removedStream, ...newState } = state;
    //   return newState;
    // JS ALT 2
    //     const newState = { ...state };
    // delete newState[action.payload];
    // return newState;
    default:
      return state;
  }
};
