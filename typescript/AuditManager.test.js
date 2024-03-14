"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const AuditManager_1 = require("./AuditManager");
const directoryName = "audits";
(0, vitest_1.describe)('AuditManagerTests', () => {
    const fileSystem = {
        getFiles: vitest_1.vi.fn(),
        readAllLines: vitest_1.vi.fn(),
        writeAllText: vitest_1.vi.fn()
    };
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.restoreAllMocks();
    });
    (0, vitest_1.it)('A_new_file_is_created_when_the_current_file_overflows', () => {
        fileSystem.getFiles.mockReturnValueOnce([`${directoryName}/audit_1.txt`, `${directoryName}/audit_2.txt`]);
        fileSystem.readAllLines
            .mockReturnValueOnce([
            "Peter;2019-04-06 16:30:00",
            "Jane;2019-04-06 16:40:00",
            "Jack;2019-04-06 17:00:00"
        ]);
        let sut = new AuditManager_1.AuditManager(3, directoryName, fileSystem);
        sut.addRecord("Alice", new Date("2019-04-06T18:00:00"));
        (0, vitest_1.expect)(fileSystem.writeAllText).toHaveBeenCalledWith(`${directoryName}/audit_3.txt`, "Alice;2019-04-06 18:00:00");
    });
});
