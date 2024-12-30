import express from 'express'
import { default as axios } from 'axios';
import { expectToken } from '../middlewares/expectToken.js'

const router = express.Router();

const url = process.env.CUSTOMERSERVICE_URL;

router.put('/', expectToken, (req, res) => {
  const { name, email, phone, company, notes } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer`,
    method: 'put',
    data: {
      token: req.token,
      name: name,
      email: email,
      phone: phone,
      company: company
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.patch('/:id', expectToken, (req, res) => {
  const { name, email, phone } = req.body;
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/${id}`,
    method: 'patch',
    data: {
      token: req.token,
      name: name,
      email: email,
      phone: phone,
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
    url: `${url}/customer/${id}`,
    method: 'delete',
    data: {
      token: req.token
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
    url: `${url}/customer/${id}`,
    method: 'get',
    data: {
      token: req.token
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.post('/all', expectToken, (req, res) => {
  const { options } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/all`,
    method: 'post',
    data: {
      token: req.token,
      options: options
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.put('/note', expectToken, (req, res) => {
  const { note, customerId } = req.body;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/note`,
    method: 'put',
    data: {
      token: req.token,
      note: note,
      customerId: customerId
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.patch('/note/:id', expectToken, (req, res) => {
  const { note } = req.body;
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/note/${id}`,
    method: 'patch',
    data: {
      token: req.token,
      note: note
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.delete('/note/:id', expectToken, (req, res) => {
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/note/${id}`,
    method: 'delete',
    data: {
      token: req.token
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

router.get('/note/:id', expectToken, (req, res) => {
  const { id } = req.params;

  axios({
    headers: { Accept: 'text/html, application/json, text/plain, */*' },
    proxy: undefined,
    url: `${url}/customer/note/${id}`,
    method: 'get',
    data: {
      token: req.token
    }
  }).then((response) => {
    return res.status(response.status).json(response.data)
  }).catch((error) => {
    return res.status(error.response.status).send(error.response.data)
  });
});

export default router;