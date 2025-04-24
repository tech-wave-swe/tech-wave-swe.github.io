import { describe, expect, it } from "@jest/globals";
import { COLLECTION_TYPE } from "../../../Models/CollectionType";

describe("COLLECTION_TYPE", () => {
  it("should have the correct values", () => {
    expect(COLLECTION_TYPE.file).toBe("file");
    expect(COLLECTION_TYPE.requirements).toBe("requirements");
    expect(COLLECTION_TYPE.chunks).toBe("chunks");
  });
});
