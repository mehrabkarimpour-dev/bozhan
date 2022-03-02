import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import UserPermissionRepositoryInterface from "../UserPermissionRepositoryInterface";


export class UserPermissionRepository extends BaseRepository implements UserPermissionRepositoryInterface {

    public UserPermissionModel: any;

    constructor() {
        super(db.UserPermission);
        this.UserPermissionModel = db.UserPermission;
    }

}