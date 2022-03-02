import {BaseRepository} from "./BaseRepository";
import UserRepositoryInterface from "../UserRepositoryInterface";
import user from '../../models/mogoose/user'
import bcrypt from 'bcryptjs'
import logger from "../../../config/logger";

export class UserRepository extends BaseRepository implements UserRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(user);
    }



}