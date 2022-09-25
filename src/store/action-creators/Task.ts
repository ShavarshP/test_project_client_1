import { Dispatch } from 'redux'
import axios from 'axios'

import { UserAction, UserActionTypes } from 'store/types'
import { loadState } from 'util/LocalStorage'
import { query } from 'util/Api'

const API_URL = process.env.REACT_APP_API

export const addTask = (email: string, name: string, task: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const { data } = await axios.post(`${API_URL}/set_tasks`, {
        email,
        name,
        task,
      })

      dispatch({
        type: UserActionTypes.ADD_DATA,
        payload: data,
      })
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'Error',
      })
    }
  }
}

export const getTask = (
  amount: number,
  page: number,
  sortNameParams: string | null,
  sortEmailParams: string | null,
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const { accessToken } = loadState('accessToken')

      const { data } = await axios.get(
        `${API_URL}/tasks?page=${page}&amount=${amount}${
          sortNameParams ? `&name=${sortNameParams}` : ''
        }${sortEmailParams ? `&email=${sortEmailParams}` : ''}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
      dispatch({
        type: UserActionTypes.TASK_DATA_UPDATE,
        payload: data,
      })
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'Error',
      })
    }
  }
}

export const getCount = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const { data } = await axios.get(`${API_URL}/count`)

      dispatch({
        type: UserActionTypes.TASK_DATA_COUNT,
        payload: data,
      })
    } catch (e) {
      dispatch({
        type: UserActionTypes.FETCH_USER_ERROR,
        payload: 'Error',
      })
    }
  }
}

export const updateUserStatus = (id: string, status: boolean) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await query(async () => {
        const { accessToken } = loadState('accessToken')
        return await axios.put(
          `${API_URL}/update_status/${id}`,
          { status },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
      })

      dispatch({
        type: UserActionTypes.TASK_UPDATE_COUNT,
      })
    } catch (e) {
      alert('You need to login')
      dispatch({
        type: UserActionTypes.USER_LOGOUT,
      })
    }
  }
}

export const editTask = (id: string, task: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await query(async () => {
        const { accessToken } = loadState('accessToken')
        return await axios.put(
          `${API_URL}/update_task/${id}`,
          { task },
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        )
      })

      dispatch({
        type: UserActionTypes.TASK_UPDATE_COUNT,
      })
    } catch (e) {
      alert('You need to login')
      dispatch({
        type: UserActionTypes.USER_LOGOUT,
      })
    }
  }
}

export const deleteData = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await query(async () => {
        const { accessToken } = loadState('accessToken')
        await axios.delete(`${API_URL}/delete/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      })

      dispatch({
        type: UserActionTypes.DELETE_USER_TASK,
      })
    } catch (e) {
      alert('You need to login')
      dispatch({
        type: UserActionTypes.USER_LOGOUT,
      })
    }
  }
}
