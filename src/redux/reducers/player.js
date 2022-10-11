import md5 from 'crypto-js/md5';
import { RESET, SALVAR_HASH, SAVE_POINTS } from '../actions';

const INITIAL_STATE = {
  hash: '',
  name: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVAR_HASH:
    return {
      ...state,
      hash: md5(action.email).toString(),
      name: action.name,
    };
  case SAVE_POINTS:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + action.score,
    };
  case RESET:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default player;
