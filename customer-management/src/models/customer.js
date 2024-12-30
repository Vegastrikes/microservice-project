import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import Note from './note.js';

class Customer extends Model {
}

Customer.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
        sequelize,
        modelName: 'Customer'
    }
)

// Seeds. TODO Migration config
try {
  setTimeout(async () => {
    const uuid = '3b92d29e-536b-4161-ae34-9b962272542f';
    const customer = await Customer.findOrCreate({where: {name: 'John Doe', email: 'abc@abc.com', phone: '5554443322', company: 'Test Inc.', createdBy: uuid}});

    // Not gonna install lodash and use _.get for just this piece of check (and cant think of a better way right now)
    if (!customer || !customer[0] || !customer[0].dataValues || !customer[0].dataValues.id) {
      throw "There was a problem when creating seed customer"
    }

    await Note.findOrCreate({ where: {customerId: customer[0].dataValues.id, note: 'Really nice company', createdBy: uuid}})
    await Note.findOrCreate({ where: {customerId: customer[0].dataValues.id, note: 'Potential buyer', createdBy: uuid}})
    await Note.findOrCreate({ where: {customerId: customer[0].dataValues.id, note: 'Delays payments', createdBy: uuid}})
}, 2000)
} catch (error) {
  console.log('There was a problem when creating seed customer');
}




export default Customer;