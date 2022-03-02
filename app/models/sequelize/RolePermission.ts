'use strict';
import {Model} from 'sequelize';

interface RolePermissionAttributes {
    roleId: number,
    permissionId: number,
}

module.exports = (sequelize: any, DataTypes: any) => {


    class RolePermission extends Model<RolePermissionAttributes> implements RolePermissionAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */
        roleId!: number
        permissionId!: number

        static associate(models: any) {

        }
    }


    RolePermission.init({
        roleId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        permissionId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'permissions',
                key: 'id'
            }
        },

    }, {
        sequelize,
        modelName: 'RolePermission',
        tableName: 'rolePermissions'
    });


    return RolePermission;
};
