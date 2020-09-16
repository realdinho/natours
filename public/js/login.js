/*eslint-disable*/
import axios from 'axios';
import { showAlert } from './alert'

const urlBase = 'http://127.0.0.1:3000/api/v1'

export const login = async (email, password) => {
  console.log('LOGIN');
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: `${urlBase}/users/login`,
      data: {
        email,
        password
      }
    });
    console.log(res);

    if(res.data.status === 'success') {
      showAlert('success', 'logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500)
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${urlBase}/users/logout`,
    });

    if (res.data.status = 'success') {
      location.reload();
    }
  } catch (err) {
    console.log(err);
    showAlert('error', 'Error logging out. Please, try again');
  }
}