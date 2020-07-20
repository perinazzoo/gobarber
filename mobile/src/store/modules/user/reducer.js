import produce from 'immer';

const INITIAL_STATE = {};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS':
        draft = action.payload.user;
        return draft;
      case '@user/UPDATE_PROFILE_SUCCESS':
        draft = action.payload.user;
        return draft;
      case '@auth/SIGN_OUT':
        draft = null;
        return draft;
      default:
        return state;
    }
  });
}
