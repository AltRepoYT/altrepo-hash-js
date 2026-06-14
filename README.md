# altrepo-hash

AltRepo Hash is a lightweight Node.js utility library for generating hashes and verifying checksums for text, bytes, and files.

## Features

- **Straightforward API:** Easily generate hashes or verify checksums with a clean, intuitive interface.
- **Zero Dependencies:** Built entirely on top of Node.js's standard `crypto` and `fs` modules, ensuring a lightweight footprint with no external requirements.
- **Secure Verifications:** Utilizes constant-time comparisons (`crypto.timingSafeEqual`) to securely verify file and text hashes.
- **Broad Algorithm Support:** Includes built-in support for all major hashing algorithms including `sha256`, `sha512`, `blake2b512`, `blake2s256`, `md5`, `sha1`, and more.
- **Memory Efficient:** Safely processes large files in chunks via `hashFile` without loading the entire file into memory using standard readable streams.

## Installation

```bash
npm install altrepo-hash
```

## Example API

```typescript
import { hashText, hashFile, verifyFileHash } from "altrepo-hash";

async function run() {
  console.log(hashText("hello", "sha256"));

  console.log(await hashFile("download.zip", "sha256"));

  console.log(
    await verifyFileHash("download.zip", "abc123...", "sha256")
  );
}

run();
```

## Browser Version

`@altrepo/hash` is the JS companion to the [AltRepo Hash browser tool](https://altrepo.net/hash/text-hash-generator.html).

Browse more [AltRepo hash tools](https://altrepo.net/hash/).
