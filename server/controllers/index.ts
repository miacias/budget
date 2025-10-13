import { loginUser, logoutUser } from './auth';
import { create, getAll, getOneById, deleteUser } from './user';
import { createIncomeSource, patchIncomeSource } from './user/income';

export const api = {
  auth: {
    loginUser,
    logoutUser,
  },
  user: {
    create,
    getAll,
    getOneById,
    deleteUser,
    income: {
      createIncomeSource,
      patchIncomeSource,
    },
  },
}