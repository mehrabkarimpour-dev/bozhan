import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import UserRepositoryInterface from "../UserRepositoryInterface";


export class UserRepository extends BaseRepository implements UserRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(db.User);
        this.UserModel = db.User;
    }

}