import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import UserRoleRepositoryInterface from "../UserRoleRepositoryInterface";


export class UserRoleRepository extends BaseRepository implements UserRoleRepositoryInterface {

    public UserRoleModel: any;

    constructor() {
        super(db.UserRole);
        this.UserRoleModel = db.UserRole;
    }

}