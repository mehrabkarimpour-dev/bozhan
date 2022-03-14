class TestExport {

    public name: string = 'TestExport'
    public path: string = `app/export/test/test`

    /**
     * @param data
     */
    public run(...data: Array<object>) {
        // edit data before converting to csv...
        return data
    }

}

export default TestExport