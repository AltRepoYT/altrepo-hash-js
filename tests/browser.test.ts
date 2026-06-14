// @vitest-environment jsdom
import { describe, it, expect, beforeAll } from "vitest";
import { hashBlob, hashFile, verifyBlobHash } from "../src/browser";

describe("browser", () => {
  beforeAll(() => {
    // In jsdom WebCrypto isn't perfectly mapped to globalThis.crypto.subtle out of the box in some Node versions,
    // but in modern Node environments globalThis.crypto works directly. We'll map Node's crypto to the global.
    if (typeof globalThis.crypto === "undefined" || !globalThis.crypto.subtle) {
      const crypto = require("crypto");
      Object.defineProperty(globalThis, "crypto", {
        value: crypto.webcrypto
      });
    }
  });

  it("should hash blob and verify securely", async () => {
    const blob = new Blob(["hello browser"]);
    const expected = "ec687a304db07950a92649222c77ef61efae6e968e62dfb6065a4f242246a760";
    expect(await hashBlob(blob, "sha256")).toBe(expected);
    expect(await verifyBlobHash(blob, expected, "sha256")).toBe(true);
  });
  
  it("should hash File object", async () => {
    const file = new File(["hello browser"], "test.txt");
    const expected = "ec687a304db07950a92649222c77ef61efae6e968e62dfb6065a4f242246a760";
    expect(await hashFile(file, "sha256")).toBe(expected);
  });
});
