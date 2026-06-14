import { describe, it, expect } from "vitest";
import { hashText, hashBytes, supportedAlgorithms } from "../src/shared";

describe("shared (WebCrypto)", () => {
  it("should have expected algorithms", () => {
    const algs = supportedAlgorithms();
    expect(algs).toContain("sha-256");
  });

  it("should hash text via WebCrypto", async () => {
    const expected = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824";
    expect(await hashText("hello", "sha256")).toBe(expected);
  });
});
