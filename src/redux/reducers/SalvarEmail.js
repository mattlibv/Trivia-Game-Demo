import md5 from 'crypto-js/md5';
import { SALVAR_HASH } from '../actions';

const INITIAL_STATE = {
  hash: '',
  name: '',
};

const saveHash = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVAR_HASH:
    return {
      ...state,
      hash: md5(action.email).toString(),
      name: action.name,
    };
  default:
    return state;
  }
};

export default saveHash;
