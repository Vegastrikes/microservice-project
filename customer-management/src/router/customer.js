import express from 'express'
import {
  create as createCustomer,
  update as updateCustomer,
  remove as removeCustomer,
  findById as findByIdCustomer,
  find as findCustomer
} from '../controller/customer.js'
import {
  create as createNote,
  update as updateNote,
  remove as removeNote,
  findById as findByIdNote
} from '../controller/note.js'
import { authorizeToken } from '../middleware/auth.js';

const router = express.Router();

router.put('/', authorizeToken, createCustomer);
router.patch('/:id', authorizeToken, updateCustomer);
router.delete('/:id', authorizeToken, removeCustomer);
router.get('/:id', authorizeToken, findByIdCustomer);

router.post('/all', authorizeToken, findCustomer);

router.put('/note', authorizeToken, createNote);
router.patch('/note/:id', authorizeToken, updateNote);
router.delete('/note/:id', authorizeToken, removeNote);
router.get('/note/:id', authorizeToken, findByIdNote);

export default router;