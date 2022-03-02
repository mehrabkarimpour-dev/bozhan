'use strict';
import {Model, UUIDV4} from 'sequelize';

interface RoleAttributes {
    id: string,
    title: string,
    key: string,
}

module.exports = (sequelize: any, DataTypes: any) => {


    class Role extends Model<RoleAttributes> implements RoleAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */

        id!: string
        title!: string
        key!: string

        static associate(models: any) {
            Role.belongsToMany(models.User, {
                through: "userRoles",
                as: "users",
                foreignKey: "roleId",
            });


            Role.belongsToMany(models.Permission, {
                through: "rolePermissions",
                as: "permissions",
                foreignKey: "roleId",
            });
        }
    }


    Role.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true
            }
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        key: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Role',
        tableName: 'roles'
    });


    return Role;
};
