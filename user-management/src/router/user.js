import express from 'express'
import { login, create, update, remove, findById } from '../controller/user.js'
import { authorizeToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.put('/', create);
router.patch('/:id', authorizeToken, update);
router.delete('/:id', authorizeToken, remove);
router.get('/:id', authorizeToken, findById);

export default router;