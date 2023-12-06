import { useUsersContext } from "./useUsersContext";

import {toast} from 'react-toastify'

export const useLogout = () => {
      const {dispatch} = useUsersContext()
      const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        toast.success('Logout successful')
      }

      return {logout}
}