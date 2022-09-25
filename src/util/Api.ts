import axios from 'axios'
import { saveState } from './LocalStorage'

const API_URL = process.env.REACT_APP_API

export const query = async (
  myQuery: () => Promise<unknown>,
): Promise<unknown> => {
  try {
    return await myQuery()
  } catch (error: any) {
    if (error?.message === 'Request failed with status code 401') {
      try {
        const { data } = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        })

        await saveState('accessToken', {
          accessToken: data.accessToken,
        })
        return await myQuery()
      } catch (e) {
        saveState('accessToken', { accessToken: '' })
        throw e
      }
    }

    throw error
  }
}
