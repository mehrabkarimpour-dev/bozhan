'use strict';
import {Model} from 'sequelize';

interface UserRoleAttributes {
    userId: number,
    roleId: number,
}

module.exports = (sequelize: any, DataTypes: any) => {


    class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `database/index` file will call this method automatically.
         */

        userId!: number
        roleId!: number

        static associate(models: any) {

        }
    }


    UserRole.init({
        roleId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            }
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
    }, {
        sequelize,
        modelName: 'UserRole',
        tableName: 'userRoles'
    });

    return UserRole;
};
