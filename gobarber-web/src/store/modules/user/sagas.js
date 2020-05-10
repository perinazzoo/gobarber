import { takeLeading, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    // eslint-disable-next-line camelcase
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = { name, email, avatar_id, ...(rest.oldPassword && rest) };

    const { data } = yield call(api.put, '/users', profile);

    toast.success('🥳 Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(data));
  } catch (err) {
    toast.error('😕 Algo deu errado, confira seus dados e tente novamente!');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLeading('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
