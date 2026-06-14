import { hashBytes } from "./shared";

export async function hashBlob(blob: Blob, algorithm: string): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  return hashBytes(arrayBuffer, algorithm);
}

export async function hashFile(file: File, algorithm: string): Promise<string> {
  return hashBlob(file, algorithm);
}

// Simple constant-time comparison for browser
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; ++i) {
    mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
  }
  return mismatch === 0;
}

export async function verifyBlobHash(blob: Blob, expectedHash: string, algorithm: string): Promise<boolean> {
  const actualHash = await hashBlob(blob, algorithm);
  return secureCompare(actualHash, expectedHash.toLowerCase());
}
