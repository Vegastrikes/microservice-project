import express from 'express'
import userRouter from './router/user.js'

const app = express();
app.use(express.json());
app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('Hello User Service')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Userservice running on ${port}`);
})