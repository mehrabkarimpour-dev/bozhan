import {BaseRepository} from "./BaseRepository";
import db from '../../models/sequelize';
import UserRepositoryInterface from "../UserRepositoryInterface";
import UserObserver from "../../observers/UserObserver";


export class UserRepository extends BaseRepository implements UserRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(db.User, UserObserver);
        this.UserModel = db.User;
    }

}