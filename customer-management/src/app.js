import express from 'express'
import customerRouter from './router/customer.js'

const app = express();
app.use(express.json());
app.use('/customer', customerRouter);

app.get('/', (req, res) => {
  res.send('Hello Customer Service')
})

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Customerservice running on ${port}`);
})