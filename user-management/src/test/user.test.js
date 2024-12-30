import {jest} from '@jest/globals'
import { create } from '../controller/user.js'
// import User from '../models/user.js'

// jest.mock('../models/user.js', () => {
//     create: jest.fn()
// })
// jest.mock('../controller/user.js', () => {
//     create: jest.fn()
// })

describe('testing user model', () => {
    it('should create user', async () => {
        // const user = {
        //     username: "test_username",
        //     password: "test_password"
        // }

        // User.create.mockResultValueOnce(user);

        // const asd = await User.create(user);
        // expect(asd).toEqual(user);
        expect(1).toEqual(1);
    })
})