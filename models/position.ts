'use strict';

import { Model, DataTypes } from 'sequelize';

interface PositionAttributes {
  id: string,
  name: string,
  salaryMultiplayer: number
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Position extends Model<PositionAttributes> implements PositionAttributes {
    id!: string;
    name!: string;
    salaryMultiplayer!: number;

    static associate(models: any) {
      this.belongsToMany(models.Department, { through: 'departments_positions', foreignKey: 'position_id' })
    }
  }

  Position.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Department name must be at least 20 characters.'
        }
      }
    },
    salaryMultiplayer: {
      type: DataTypes.FLOAT(1.1),
      allowNull: true,
      defaultValue: 0,
      field: 'salary_multiplayer'
    }
  }, {
    sequelize,
    modelName: 'Position'
  });

  //Position.belongsToMany(Department, { through: 'DepartmentsPositions' });

  return Position;
};