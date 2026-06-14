export const SUPPORTED_ALGORITHMS = [
  "sha-1",
  "sha-256",
  "sha-384",
  "sha-512",
];

export function supportedAlgorithms(): string[] {
  return [...SUPPORTED_ALGORITHMS];
}

function normalizeAlgorithm(algorithm: string): string {
  const alg = algorithm.toLowerCase().replace(/_/g, "-");
  if (!alg.startsWith("sha-")) {
    const algWithDash = alg.replace("sha", "sha-");
    if (SUPPORTED_ALGORITHMS.includes(algWithDash)) {
      return algWithDash;
    }
  }
  return alg;
}

/**
 * Generate a hash string from a Uint8Array or ArrayBuffer.
 */
export async function hashBytes(data: BufferSource, algorithm: string): Promise<string> {
  const normalizedAlg = normalizeAlgorithm(algorithm);
  if (!SUPPORTED_ALGORITHMS.includes(normalizedAlg)) {
    throw new Error(`Unsupported algorithm in browser/shared context: ${algorithm}. Supported: ${SUPPORTED_ALGORITHMS.join(", ")}`);
  }

  const hashBuffer = await globalThis.crypto.subtle.digest(normalizedAlg, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Generate a hash string from text.
 */
export async function hashText(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  return hashBytes(data, algorithm);
}
