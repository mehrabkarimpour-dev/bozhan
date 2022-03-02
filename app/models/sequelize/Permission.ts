'use strict';
import {Model} from "sequelize";

interface PermissionAttributes {
    id: number
    key: string
    title: string
}

module.exports = (sequelize: any, DataTypes: any) => {

    class Permission extends Model implements PermissionAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */


        static associate(models: any) {
            Permission.belongsToMany(models.Role, {
                through: "rolePermissions",
                as: "roles",
                foreignKey: "permissionId",
            });

            Permission.belongsToMany(models.User, {
                through: "userPermissions",
                as: "users",
                foreignKey: "permissionId",
            });

        }

        id!: number;
        key!: string;
        title!: string;
    }

    Permission.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            //@ts-ignore
            initialAutoIncrement: true
        },
        key: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: true
        },
        title: {
            allowNull: true,
            type: DataTypes.STRING
        },
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'permissions',
    });
    return Permission;
};