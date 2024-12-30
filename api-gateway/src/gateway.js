import express from 'express'
import userRouter from './router/user.js'
import customerRouter from './router/customer.js'

const app = express()
app.use(express.json());
app.use('/user', userRouter);
app.use('/customer', customerRouter);


// const { sign, verify } = jwt;
// const jwtSecretKey = process.env.JTW_SECRET;

// // Middleware for bearer token authentication
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   const bearer = authHeader.split(' ')[0];

//   if (!token || !bearer || bearer !== 'Bearer') {
//     return res.status(401).send({message: 'Missing token'});
//   }

//   verify(token, jwtSecretKey, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({message: 'Invalid token'});
//     }

//     // Add the decoded information to the request object
//     req.user = decoded;
//     next();
//   });
// }

app.get('/', (req, res) => {
  res.send('Hello API Gateway')
})

// /*LOGIN*/
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   await axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/login',
//     method: 'post',
//     data: {
//       username: username,
//       password: password
//     }
//   }).then((response) => {
//     const token = sign({
//       id: response.data.id,
//       //role
//     }, jwtSecretKey, {
//       expiresIn: '1h'
//     });
//     return res.status(response.status).json({token: token});
//   }).catch((error) => {
//     return res.status(error.response.status).json(error.response.data.message);
//   });
// })

// /*USER*/
// app.put('/user', (req, res) => {
//   const { username, password } = req.body;

//   axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/user',
//     method: 'put',
//     data: {
//       username: username,
//       password: password
//     }
//   }).then((response) => {
//     return res.status(response.status).json(response.data)
//   }).catch((error) => {
//     return res.status(error.response.status).send(error.response.data)
//   });
// })
// app.patch('/user', authenticateToken, (req, res) => {
//   const user = req.user;
//   const { role } = req.body;

//   axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/user',
//     method: 'patch',
//     data: {
//       user: user,
//       update: {
//         role: role
//       }
//     }
//   }).then((response) => {
//     return res.status(response.status).json({message: response.data.message});
//   }).catch((error) => {
//     return res.status(error.response.status).json({message: error.response.data.message});
//   });
// })
// app.delete('/user', authenticateToken, (req, res) => {
//   const user = req.user;

//   axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/user',
//     method: 'delete',
//     data: {
//       user: user
//     }
//   }).then((response) => {
//     return res.status(response.status).json({message: response.data.message});
//   }).catch((error) => {
//     return res.status(error.response.status).json({message: error.response.data.message});
//   });
// })

// /*ROLES*/
// app.put('/roles', authenticateToken, (req, res) => {
//   const user = req.user;
//   const { role } = req.body;

//   axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/roles',
//     method: 'put',
//     data: {
//       user: user,
//       role: role
//     }
//   }).then((response) => {
//     return res.status(response.status).json(response.data)
//   }).catch((error) => {
//     return res.status(error.response.status).send(error.response.data)
//   });
// })
// app.get('/roles', authenticateToken, (req, res) => {
//   axios({
//     headers: { Accept: 'text/html, application/json, text/plain, */*' },
//     proxy: undefined,
//     url: 'http://localhost:4000/roles',
//     method: 'get',
//   }).then((response) => {
//     return res.status(response.status).json(response.data)
//   }).catch((error) => {
//     return res.status(error.response.status).send(error.response.data)
//   });
// })

app.listen(4000, () => {
  console.log('API Gateway listens on 3000');
})