export class FileContent {
    fileName: string
    lines: string[]

    constructor(fileName: string, lines: string[]) {
        this.fileName = fileName
        this.lines = lines
    }
}