import express from 'express'
import { default as axios } from 'axios';
import { expectToken } from '../middlewares/expectToken.js'

const router = express.Router();

const url = process.env.USERSERVICE_URL;

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/user/login`,
    method: 'post',
    data: {
      username: username,
      password: password
    }
  }).then((response) => {
    return res.status(response.status).json({token: response.data.token});
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.put('/', (req, res) => {
  const { username, password } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/user`,
    method: 'put',
    data: {
      username: username,
      password: password
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.patch('/:id', expectToken, (req, res) => {
  const { id } = req.params;
  const { username, role } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/user/${id}`,
    method: 'patch',
    data: {
      token: req.token,
      newData: {
        username: username,
        role: role
      }
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.delete('/:id', expectToken, (req, res) => {
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/user/${id}`,
    method: 'delete',
    data: {
      token: req.token,
      id: id
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.get('/:id', expectToken, (req, res) => {
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/user/${id}`,
    method: 'get',
    data: {
      token: req.token,
      id: id
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

export default router;