import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import RoleRepositoryInterface from "../RoleRepositoryInterface";


export class RoleRepository extends BaseRepository implements RoleRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(db.Role);
        this.UserModel = db.Role;
    }

}