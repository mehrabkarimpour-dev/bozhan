export interface RunObserverInterface {
    runObserver(observer: any, type: string): any;
}

export interface ReadInterface {

    find(field: string, value: any): any;

    findOne(id: number): any;

    findOneWith(id: number, value: any, relation: string): any;

    all(): any

    allWith(relation: string): any
}


export interface WriteInterface {

    create(attributes: object): any;

    bulkCreate(attributes: object): any;

    update(content: any, conditions: any): any;

    delete(value: any): any;
}