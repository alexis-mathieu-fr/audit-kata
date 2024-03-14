"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditManager = void 0;
class AuditManager {
    constructor(maxEntriesPerFile, directoryName, fileSystem) {
        this.maxEntriesPerFile = maxEntriesPerFile;
        this.directoryName = directoryName;
        this.fileSystem = fileSystem;
    }
    addRecord(visitorName, timeOfVisit) {
        let filePaths = this.fileSystem.getFiles(this.directoryName);
        let sorted = this.sortByIndex(filePaths);
        let newRecord = `${visitorName};${this.formatDate(timeOfVisit)}`;
        if (sorted.length == 0) {
            let newFile = `${this.directoryName}/audit_1.txt`;
            this.fileSystem.writeAllText(newFile, newRecord);
            return;
        }
        let last = sorted[sorted.length - 1];
        let lines = this.fileSystem.readAllLines(last.path);
        if (lines.length < this.maxEntriesPerFile) {
            lines.push(newRecord);
            let newContent = `\n${lines}`;
            this.fileSystem.writeAllText(last.path, newContent);
        }
        else {
            const newIndex = last.index + 1;
            const newName = `audit_${newIndex}.txt`;
            const newFile = `${this.directoryName}/${newName}`;
            this.fileSystem.writeAllText(newFile, newRecord);
        }
    }
    sortByIndex(filePaths) {
        return filePaths.sort()
            .map((path, index) => ({ index: index + 1, path: path }));
    }
    formatDate(date) {
        const year = date.getFullYear();
        const m = date.getMonth() + 1;
        const month = this.formatToTwoDigits(m);
        const day = this.formatToTwoDigits(date.getDate());
        const hours = this.formatToTwoDigits(date.getHours());
        const minutes = this.formatToTwoDigits(date.getMinutes());
        const seconds = this.formatToTwoDigits(date.getSeconds());
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    formatToTwoDigits(n) {
        return n === undefined || n < 10 ? `0${n}` : n.toString();
    }
}
exports.AuditManager = AuditManager;
