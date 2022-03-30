import {ReadInterface, WriteInterface} from "../BaseRepoitoryInterface";
import logger from "../../../config/logger";


export class BaseRepository implements ReadInterface, WriteInterface {

    public model: any

    public constructor(model: any) {
        this.model = model;
    }

    findOneWith(id: number, relation: string) {
        throw new Error("Method not implemented.");
    }
    allWith(relation: string) {
        throw new Error("Method not implemented.");
    }

     all(): void | object {
        try {
            return this.model.find({})//.lean()
        } catch (e) {
            // @ts-ignore
            logger.error(e)
        }

    }

    create(attributes: object): any {
        let newItem = new this.model(attributes)
        return newItem.save()
    }

    delete(id: number): any {
    }

    find(field: string, value: any): any {
    }

    findOne(id: number): any {
    }

    update(id: number): any {
    }

    bulkCreate(attributes: object): any {
    }

}