abstract class Queue {
    public delay: number = 0 // one second
    public removeOnComplete: boolean = true
    public attempts: number = 2

    abstract handle(args: any): any;
}

export default Queue