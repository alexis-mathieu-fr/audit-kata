import {expect, test} from 'vitest'
import {AuditManager} from "./AuditManager";
import {FileContent} from "./FileContent";
import {FileUpdate} from "./FileUpdate";

test('A_new_file_is_created_when_the_current_file_overflows', () => {
    const existingFiles = [
        new FileContent("audit_1.txt", []),
        new FileContent("audit_2.txt", [
            "Peter;2019-04-06 16:30:00",
            "Jane;2019-04-06 16:40:00",
            "Jack;2019-04-06 17:00:00"])]

    const sut = new AuditManager(3)

    const result = sut.addRecord(existingFiles, "Alice", new Date("2019-04-06T18:00:00"))

    expect(result).toEqual(new FileUpdate(`audit_3.txt`, "Alice;2019-04-06 18:00:00"))
})

