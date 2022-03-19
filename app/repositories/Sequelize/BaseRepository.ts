import {ReadInterface, RunObserverInterface, WriteInterface} from "../BaseRepoitoryInterface";
import logger from "../../../config/logger";
import modelObServerAble from "../../../vendor/core/observer/database/modelObServerAble";


export abstract class BaseRepository extends modelObServerAble implements ReadInterface, WriteInterface, RunObserverInterface {


    public model: any
    public observer: any

    protected constructor(model: any, observer: any = null) {
        super(model);
        this.model = model
        this.observer = observer
    }

    public runObserver(observer: any, type: string) {

    }

    public find(field: string, value: any) {
        try {
            let user = this.model.findOne({where: {[field]: value}})
            this.attach(this.observer)
            return user
        } catch (e) {
            logger.error({e})
            return null;
        }
    }

    public delete = (value: any) => {
        return this.model.destroy({
            where: {
                id: value
            }
        })
    }

    public deleteBy = (field: string, value: any) => {
        return this.model.destroy({
            where: {
                [field]: value
            }
        })
    }

    deleteByObg(object: object): any {
        return this.model.destroy({
            where: object
        })
    }


    public create = (attributes: any) => {
        return this.model.create(attributes)
    }

    public bulkCreate(attributes: object): any {
        return this.model.bulkCreate(attributes);
    }

    public update = (content: any, conditions: any) => {
        return this.model.update(content, conditions)
    }

    public all = () => {
        return this.model.findAll({})
    }

    allWith(relation: string): any {
        return this.model.findAll({
            include: relation
        })
    }

    public findOne = (id: number) => {

    }

    findOneWith(field: number, value: any, relation: string): any {
        return this.model.findOne({
            where: {[field]: value},
            include: relation
        })
    }
}