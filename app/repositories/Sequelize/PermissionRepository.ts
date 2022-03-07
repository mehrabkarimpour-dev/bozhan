import {BaseRepository} from "app/repositories/Sequelize/BaseRepository";
import db from '../../models/sequelize';
import PermissionRepositoryInterface from "../PermissionRepositoryInterface";


export class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(db.Permission);
        this.UserModel = db.Permission;
    }

}