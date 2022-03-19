export default abstract class ResponseAbstract {

    public type: string | undefined

    abstract converter(): any

}