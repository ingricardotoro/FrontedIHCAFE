import axios from 'axios';

export const register = (newUser) => {
  return axios
    .post('users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.emZail,
      password: newUser.password,
    })
    .then((response) => {
      console.log('Registered');
    });
};

export const login = (user) => {
  return axios
    .post('https://api.ihcafe.hn/api/users/login', {
      //.post('https://sipa.ihcafe.hn:4000/api/users/login', {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem('usertoken', response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
