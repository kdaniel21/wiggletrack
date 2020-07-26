import axios from 'axios';
import store from '../store/index';

export default async () => {
  try {
    // Get access token
    const tokenRes = await axios.post('/auth/refresh', {});

    if (tokenRes.status !== 200) throw '';

    // Store access token in store so that the next request can send it along
    await store.dispatch('loginUser', tokenRes.data);

    // Get current user data
    const userRes = await axios.get('/users/me');

    // Store user
    await store.dispatch('loginUser', {
      user: userRes.data.data
    });

    // eslint-disable-next-line no-empty
  } catch (err) {
    return false;
  }
};
