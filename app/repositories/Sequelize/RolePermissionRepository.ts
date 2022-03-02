import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import RolePermissionRepositoryInterface from "../RolePermissionRepositoryInterface";


export class RolePermissionRepository extends BaseRepository implements RolePermissionRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(db.RolePermission);
        this.UserModel = db.RolePermission;
    }

}