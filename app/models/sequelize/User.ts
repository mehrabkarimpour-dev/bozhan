'use strict';
import {Model} from 'sequelize';
import UserStateEnum from "../../enums/UserStateEnum";


interface UserAttributes {
    id: string
    organizationId: number
    mobile: string
    password: string
    firstName: string
    lastName: string
    token: string
    email: string
    state: string
}

module.exports = (sequelize: any, DataTypes: any) => {


    class User extends Model<UserAttributes> implements UserAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */


        id!: string
        organizationId!: number
        mobile!: string
        password!: string
        firstName!: string
        lastName!: string
        token!: string
        email!: string
        state!: string

        static associate(models: any) {

            User.belongsToMany(models.Role, {
                through: "userRoles",
                as: "roles",
                foreignKey: "userId",
            });

            User.belongsToMany(models.Permission, {
                through: "userPermissions",
                as: "permissions",
                foreignKey: "userId",
            });
        }
    }


    User.init({

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true
                }
            },
            organizationId: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            mobile: {
                allowNull: false,
                type: DataTypes.STRING
            },
            password: {
                allowNull: true,
                type: DataTypes.STRING
            },
            firstName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            lastName: {
                allowNull: true,
                type: DataTypes.STRING
            },
            token: {
                allowNull: true,
                type: DataTypes.TEXT,
                defaultValue: null
            },
            email: {
                allowNull: true,
                type: DataTypes.STRING
            },
            state: {
                allowNull: true,
                type: DataTypes.ENUM(UserStateEnum),
                defaultValue: UserStateEnum[0]
            }
        }
        , {
            indexes: [
                {
                    unique: true,
                    fields: ['mobile']
                }
            ],
            timestamps: true,
            sequelize,
            modelName: 'User',
            tableName: 'users'
        });


    return User;
};