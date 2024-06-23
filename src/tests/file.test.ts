import { formatFileInTreeStructure } from "../file/file.service";
import { filesTreeStructureFinal, filesMockData } from "./mockData/files.mock";

describe("Testing file functions", () => {
  test("should create tree folder structure", () => {
    expect(formatFileInTreeStructure(filesMockData)).toStrictEqual(
      filesTreeStructureFinal
    );
  });
});
