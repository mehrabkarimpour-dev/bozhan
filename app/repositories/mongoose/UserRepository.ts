import {BaseRepository} from "./BaseRepository";
import UserRepositoryInterface from "../UserRepositoryInterface";
import user from 'app/models/mongoose/user'


export class UserRepository extends BaseRepository implements UserRepositoryInterface {

    public UserModel: any;

    constructor() {
        super(user);
    }



}