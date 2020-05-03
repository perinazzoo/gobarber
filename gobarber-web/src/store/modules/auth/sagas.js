import { all, takeLeading, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

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

    yield put(signInSuccess(token, user));
    history.push('/schedule');
  } catch (err) {
    yield put(signFailure());
    if (err.message === 'Not provider') {
      toast.error('O usuário não é prestador 😕');
    } else if (err.response.data.error === 'Password does not match') {
      toast.error('Senha incorreta 😕');
    } else {
      toast.error('😕 Algo deu errado, tente novamente!');
    }
  }
}

export default all([takeLeading('@auth/SIGN_IN_REQUEST', signIn)]);
