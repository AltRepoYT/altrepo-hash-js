import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { hashFile, verifyFileHash } from "../src/node";

describe("node", () => {
  it("should hash file and verify securely", async () => {
    const tmpPath = path.join(__dirname, "temp-test-file.txt");
    fs.writeFileSync(tmpPath, "hello file");
    
    try {
      const expected = "f3877e8a3d98f809d9f844060fbea2864a4b66980a22ff22297014d0c168db2e";
      expect(await hashFile(tmpPath, "sha256")).toBe(expected);
      expect(await verifyFileHash(tmpPath, expected, "sha256")).toBe(true);
      expect(await verifyFileHash(tmpPath, "badhash000000000000000000000000000000000000000000000000000000000", "sha256")).toBe(false);
    } finally {
      fs.unlinkSync(tmpPath);
    }
  });
});
