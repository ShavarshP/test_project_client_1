import { combineReducers } from 'redux';
import { usersTask } from './UsersTask';

export const rootReducer = combineReducers({ usersTask });

export type RootState = ReturnType<typeof rootReducer>;
