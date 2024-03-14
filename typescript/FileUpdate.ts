export class FileUpdate {
    fileName: string
    newContent: string

    constructor(fileName: string, newContent: string) {
        this.fileName = fileName
        this.newContent = newContent
    }
}