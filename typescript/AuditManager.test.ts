import {afterEach, describe, expect, it, vi} from 'vitest'
import {AuditManager} from "./AuditManager";

const directoryName = "audits";

describe('AuditManagerTests', () => {
    const fileSystem = {
        getFiles: vi.fn(),
        readAllLines: vi.fn(),
        writeAllText: vi.fn()
    }

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('A_new_file_is_created_when_the_current_file_overflows', () => {

        fileSystem.getFiles.mockReturnValueOnce([`${directoryName}/audit_1.txt`, `${directoryName}/audit_2.txt`])

        fileSystem.readAllLines
            .mockReturnValueOnce([
                "Peter;2019-04-06 16:30:00",
                "Jane;2019-04-06 16:40:00",
                "Jack;2019-04-06 17:00:00"])

        let sut = new AuditManager(3, directoryName, fileSystem)

        sut.addRecord("Alice", new Date("2019-04-06T18:00:00"))

        expect(fileSystem.writeAllText).toHaveBeenCalledWith(`${directoryName}/audit_3.txt`, "Alice;2019-04-06 18:00:00")
    })
})

