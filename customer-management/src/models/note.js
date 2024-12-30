import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class Note extends Model {
}

Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      }
    },
    {
        sequelize,
        modelName: 'Note'
    }
)

export default Note;