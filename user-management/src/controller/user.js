import User from '../models/user.js'
import Role from '../models/role.js'
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
const jwtSecretKey = process.env.JWT_SECRET;

//TODO sanitize returns example: password

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const user = await User.findOne({
            where: { username: username }
        })

        if (!user || !await compare(password, user.password)) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = sign({
            id: user.id,
            username: user.username,
            idRole: user.idRole,
          }, jwtSecretKey, {
            expiresIn: '1h'
        });

        return res.status(200).json({message: 'Login successful', token: token})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const create = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await hash(password, 10);

        const newUser = await User.create({
            username: username,
            password: hashedPassword
        })

        return res.status(201).json({message: 'User created', user: newUser})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const update = async (req, res) => {
    try {
        const { newData } = req.body;
        const { id } = req.params;

        if (!newData || !id) {
            return res.status(404).json({message: 'User not found'});
        }
        
        const userDB = await User.findOne({
            where: { id: id}
        })
        if (!userDB) {
            return res.status(404).json({message: 'User not found'});
        }

        if (newData.role) {
            const roleDB = await Role.findOne({where: { role: newData.role}})
            if (!roleDB) {
                return res.status(404).json({message: 'Role not valid'});
            }
            userDB.idRole = roleDB.id;
        }

        if (newData.username) {
            userDB.username = newData.username;
        }

        const updatedUser = await userDB.save();

        return res.status(201).json({message: 'User updated', user: updatedUser})
    } catch (error) {
        // Username is the only unique field, so assume it is the error for username
        if (error.name == 'SequelizeUniqueConstraintError') {
            return res.status(403).json({message: 'Username already taken'})
        }
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        const userDB = await User.findOne({
            where: { id: id }
        })
        if (!userDB) {
            return res.status(404).json({message: 'User not found'});
        }

        await userDB.destroy();

        return res.status(201).json({message: 'User deleted', user: userDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const userDB = await User.findOne({
            where: { id: id }
        })
        if (!userDB) {
            return res.status(404).json({message: 'User not found'});
        }

        return res.status(200).json({message: 'User found', user: userDB})
    } catch (error) {
        return res.status(500).json({message: 'Internal Error'})
    }
}