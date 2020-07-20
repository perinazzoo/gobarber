import { all, takeLeading, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { signInSuccess, signFailure, signInRequest } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const {
      data: { token, user },
    } = yield call(api.post, '/sessions', {
      email,
      password,
    });

    if (user.provider) {
      yield put(signFailure());
      return Alert.alert('😕 O usuário é um prestador');
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    return yield put(signInSuccess(token, user));
  } catch (err) {
    yield put(signFailure());

    if (err.response.data.error === 'Password does not match') {
      return Alert.alert('😕 Senha incorreta');
    }
    return Alert.alert('😕 Algo deu errado, tente novamente!');
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    yield put(signInRequest(email, password));
  } catch (err) {
    yield put(signFailure());

    if (err.response.data.error === 'This email has already been taken.') {
      Alert.alert('😕 Já existe uma conta com este email');
    } else {
      Alert.alert('😕 Algo deu errado, tente novamente!');
    }
  }
}

export function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  //
}

export default all([
  takeLeading('persist/REHYDRATE', setToken),
  takeLeading('@auth/SIGN_IN_REQUEST', signIn),
  takeLeading('@auth/SIGN_UP_REQUEST', signUp),
  takeLeading('@auth/SIGN_OUT', signOut),
]);
