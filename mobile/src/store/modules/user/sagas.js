import { takeLeading, all, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword && rest) };

    const { data } = yield call(api.put, '/users', profile);

    Alert.alert('🥳 Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(data));
  } catch (err) {
    Alert.alert('😕 Algo deu errado, confira seus dados e tente novamente!');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLeading('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
