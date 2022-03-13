class TestExport {

    public name: string = 'TestExport'
    public path: string = 'app/export/test/test/test.csv'

    /**
     * @param data
     */
    public run(...data: Array<object>) {
        // in this method you can edit data before converting to csv...
        return data
    }

}

export default TestExport