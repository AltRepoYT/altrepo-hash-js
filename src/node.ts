import * as crypto from "crypto";
import * as fs from "fs";

export async function hashFile(filePath: string, algorithm: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Allow node formats like 'sha256'
      const alg = algorithm.toLowerCase().replace("_", "-").replace("sha-", "sha");
      const hasher = crypto.createHash(alg);
      const stream = fs.createReadStream(filePath);
      
      stream.on("error", (err) => reject(err));
      stream.on("data", (chunk) => hasher.update(chunk));
      stream.on("end", () => resolve(hasher.digest("hex")));
    } catch (err) {
      reject(err);
    }
  });
}

function secureCompare(actualHex: string, expectedHex: string): boolean {
  const actualBuffer = Buffer.from(actualHex, "hex");
  const expectedBuffer = Buffer.from(expectedHex.toLowerCase(), "hex");
  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function verifyFileHash(filePath: string, expectedHash: string, algorithm: string): Promise<boolean> {
  const actualHash = await hashFile(filePath, algorithm);
  return secureCompare(actualHash, expectedHash);
}
