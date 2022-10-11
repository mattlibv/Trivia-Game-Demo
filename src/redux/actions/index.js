export const SALVAR_HASH = 'SALVAR_HASH';

export const salvarEmail = (email, name) => ({
  type: SALVAR_HASH,
  email,
  name,
});

export const SAVE_POINTS = 'SAVE_POINTS';
export const savePoints = (score) => ({
  type: SAVE_POINTS,
  score,
});

export const RESET = 'RESET';
export const reset = () => ({
  type: RESET,
});
