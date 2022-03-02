'use strict';
import {Model} from "sequelize";

interface LogAttributes {
    id: number,
    logableType: string,
    logableId: number,
    userId: number,
    type: string,
    description: string

}

module.exports = (sequelize: any, DataTypes: any) => {
    class Log extends Model<LogAttributes> implements LogAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */

        id!: number
        logableType!: string
        logableId!: number
        userId!: number
        type!: string
        description!: string

        static associate(models: any) {

        }
    }

    Log.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        logableType: {
            allowNull: true,
            type: DataTypes.STRING
        },
        logableId: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            allowNull: true,
            type: DataTypes.BOOLEAN,
        },
        type: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Log',
        tableName: 'logs'
    })
    return Log;
};