import { Dispatch } from 'redux';
import axios from 'axios';

import { UserAction, UserActionTypes } from 'store/types';
import { loadState, saveState } from 'util/LocalStorage';
import { query } from 'util/Api';

const API_URL = process.env.REACT_APP_API;

export const logOut = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await axios.get(`${API_URL}/logout`, {
                withCredentials: true,
            });
            saveState('accessToken', { accessToken: '' });

            dispatch({
                type: UserActionTypes.USER_LOGOUT,
            });
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Error',
            });
        }
    };
};

export const login = (user: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/login`,
                {
                    user,
                    password,
                },
                { withCredentials: true },
            );

            saveState('accessToken', { accessToken: data.accessToken });

            dispatch({
                type: UserActionTypes.USER_LOGIN,
            });
        } catch (e) {
            alert('invalid data');
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Error',
            });
        }
    };
};

export const updateLogin = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await query(async () => {
                const { accessToken } = loadState('accessToken');
                if (!accessToken) throw { message: 'accessToken none' };

                return await axios.get(`${API_URL}/is_login`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
            });

            dispatch({
                type: UserActionTypes.USER_LOGIN,
            });
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Error',
            });
        }
    };
};
