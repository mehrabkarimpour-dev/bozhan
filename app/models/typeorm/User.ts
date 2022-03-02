import {Entity, Column, PrimaryColumn} from "typeorm";


@Entity()
class User {

    @Column()
    id: number | undefined;


    @Column()
    name: string | undefined;
}

export default User