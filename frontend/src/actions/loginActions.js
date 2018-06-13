import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import {SET_CURRENT_USER} from './types';

const api = process.env.REACT_APP_API_URL || process.env.REACT_APP_LOCALHOST_API_URL;

export function setCurrentUser(user) {
  return {type: SET_CURRENT_USER, user};
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => axios
    .post(`${api}/login`, data)
    .then(res => {
      if (res.status === 200) {
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        if (res.data && res.data.user) {
          dispatch(setCurrentUser(jwtDecode(token)));
        }
        return res
      }
      return res
    })
    .catch(err => err);
}

export function signup(data) {
  const saveUser = async() => axios
    .post(`${api}/signup`, data)
    .then(res => res)
  return saveUser
}
