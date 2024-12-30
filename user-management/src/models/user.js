import { Sequelize, DataTypes, Model, BelongsTo } from 'sequelize';
import sequelize from '../config/database.js';
import Role from './role.js';
import { hash, compare } from 'bcrypt';

class User extends Model {
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
)

Role.hasMany(User, {as: 'Role', foreignKey: 'idRole'});
User.belongsTo(Role, {
    foreignKey: {
        name: 'idRole',
        allowNull: false,
        defaultValue: 2
    }
});

// Seeds. TODO Migration config
setTimeout(async () => {
    await Role.findOrCreate({where: {role: 'Admin'}});
    await Role.findOrCreate({where: {role: 'User'}});
    await Role.findOrCreate({where: {role: 'Sales Representative'}});

    const uuid = '3b92d29e-536b-4161-ae34-9b962272542f';
    const password = await hash('pass', 10);
    await User.findOrCreate({where: {id: uuid, username: 'Test_Admin', password: password, idRole: 1}});
}, 2000)

export default User;