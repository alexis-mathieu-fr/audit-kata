import {FileContent} from "./FileContent";

export class AuditManager {
    maxEntriesPerFile: number
    directoryName: string
    filesContent: FileContent[]

    constructor(maxEntriesPerFile: number, directoryName: string, filesContent: FileContent[]) {
        this.maxEntriesPerFile = maxEntriesPerFile
        this.directoryName = directoryName
        this.filesContent = filesContent
    }

    addRecord(visitorName: string, timeOfVisit: Date) {
        //let filePaths = this.fileSystem.getFiles(this.directoryName)
        let sorted = this.sortByIndex(this.filesContent)
        let newRecord = `${visitorName};${this.formatDate(timeOfVisit)}`

        if (sorted.length == 0) {
            let newFile = `${this.directoryName}/audit_1.txt`
            this.fileSystem.writeAllText(newFile, newRecord)
            return
        }

        let last = sorted[sorted.length - 1]
        let lines = this.fileSystem.readAllLines(last.fileContent)

        if (lines.length < this.maxEntriesPerFile) {
            lines.push(newRecord)
            let newContent = `\n${lines}`
            this.fileSystem.writeAllText(last.fileContent, newContent)
        } else {
            const newIndex = last.index + 1
            const newName = `audit_${newIndex}.txt`
            const newFile = `${this.directoryName}/${newName}`
            this.fileSystem.writeAllText(newFile, newRecord)
        }
    }

    sortByIndex(fileContents: FileContent[]): { index: number, fileContent: FileContent }[] {
        return fileContents.toSorted()
            .map((fileContent, index) => ({index: index + 1, fileContent}))
    }

    formatDate(date: Date): string {
        const year = date.getFullYear()
        const m = date.getMonth() + 1
        const month = this.formatToTwoDigits(m)
        const day = this.formatToTwoDigits(date.getDate())
        const hours = this.formatToTwoDigits(date.getHours())
        const minutes = this.formatToTwoDigits(date.getMinutes())
        const seconds = this.formatToTwoDigits(date.getSeconds())

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    formatToTwoDigits(n: any): string {
        return n === undefined || n < 10 ? `0${n}` : n.toString()
    }
}