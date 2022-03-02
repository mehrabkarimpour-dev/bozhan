'use strict';
import {Model} from 'sequelize';

interface UserPermissionAttributes {
    userId: string,
    permissionId: string,
}

module.exports = (sequelize: any, DataTypes: any) => {


    class UserPermission extends Model<UserPermissionAttributes> implements UserPermissionAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */
        userId!: string
        permissionId!: string

        static associate(models: any) {

        }
    }


    UserPermission.init({
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'users',
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
        modelName: 'UserPermission',
        tableName: 'userPermissions'
    });


    return UserPermission;
};
