import { all, takeLeading, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

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

    if (!user.provider) {
      throw new Error('Not provider');
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
    history.push('/schedule');
  } catch (err) {
    yield put(signFailure());
    if (err.message === 'Not provider') {
      toast.error('😕 O usuário não é prestador');
    } else if (err.response.data.error === 'Password does not match') {
      toast.error('😕 Senha incorreta');
    } else {
      toast.error('😕 Algo deu errado, tente novamente!');
    }
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    yield put(signInRequest(email, password));
  } catch (err) {
    yield put(signFailure());

    if (err.response.data.error === 'This email has already been taken.') {
      toast.error('😕 Já existe uma conta com este email');
    } else {
      toast.error('😕 Algo deu errado, tente novamente!');
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

export default all([
  takeLeading('persist/REHYDRATE', setToken),
  takeLeading('@auth/SIGN_IN_REQUEST', signIn),
  takeLeading('@auth/SIGN_UP_REQUEST', signUp),
]);
