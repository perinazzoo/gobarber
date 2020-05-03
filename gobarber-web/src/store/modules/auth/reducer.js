import { produce } from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function Auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
        draft.loading = true;
        return draft;
      case '@auth/SIGN_IN_SUCCESS':
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        return draft;
      case '@auth/SIGN_FAILURE':
        draft.loading = false;
        return draft;
      case '@auth/SIGN_UP_REQUEST':
        draft.loading = true;
        return draft;
      default:
        return state;
    }
  });
}
