import {FileContent} from "./FileContent";
import {FileUpdate} from "./FileUpdate";

export class AuditManager {
    maxEntriesPerFile: number

    constructor(maxEntriesPerFile: number) {
        this.maxEntriesPerFile = maxEntriesPerFile
    }

    addRecord(files: FileContent[], visitorName: string, timeOfVisit: Date): FileUpdate {
        let sorted = this.sortByIndex(files)
        let newRecord = `${visitorName};${this.formatDate(timeOfVisit)}`

        if (sorted.length == 0) {
            return new FileUpdate("audit_1.txt", newRecord)
        }

        let last = sorted[sorted.length - 1]
        let lines = last.file.lines;

        if (lines.length < this.maxEntriesPerFile) {
            lines.push(newRecord)
            let newContent = `\n${lines}`
            return new FileUpdate(last.file.fileName, newContent)
        } else {
            const newIndex = last.index + 1
            const newName = `audit_${newIndex}.txt`
            return new FileUpdate(newName, newRecord)
        }
    }

    sortByIndex(files: FileContent[]): { index: number, file: FileContent }[] {
        return files.sort()
            .map((file: FileContent, index: number) => ({index: index + 1, file: file}))
    }

    formatDate(date: Date): string {
        const year = date.getFullYear()
        const m = date.getMonth() + 1
        const month = this.formatToTwoDigits(m)
        const day = this.formatToTwoDigits(date.getDate())
        const hours = this.formatToTwoDigits(date.getHours())
        const minutes = this.formatToTwoDigits(date.getMinutes())
        const seconds = this.formatToTwoDigits(date.getSeconds())

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    formatToTwoDigits(n: any): string {
        return n === undefined || n < 10 ? `0${n}` : n.toString()
    }
}    
