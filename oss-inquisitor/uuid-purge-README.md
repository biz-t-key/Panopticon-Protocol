# 🆔 UUID Pure: The Atomic Identifier

> "We stand on the shoulders of giants. We honor their work by ensuring it lives on in its purest form."

## 🏛️ The Tribute
This module is a surgical extraction and optimization of the **v4 UUID generation** logic from the ubiquitous [uuid](https://github.com/uuidjs/uuid) package.

We offer our respect to **Robert Kieffer** and the **uuid contributors**. Your package has been the backbone of millions of projects. In the modern web era, where `crypto.getRandomValues` is native, we have refined your core "Soul" to eliminate the need for heavy pooling and complex environment checks.

## ⚖️ Why This Exists?
The standard `uuid` package is a multi-version monolith. For projects that ONLY need v4 (randomly generated) IDs, installing the full package is unnecessary. **UUID Pure** provides the same RFC 4122 compliant logic in under 50 lines of code.

## ✨ Refinements
- **Native RNG**: Uses the built-in Web Crypto API (supported in browsers and Node.js 15+).
- **Zero Dependencies**: From a 1.5MB package dependency tree to a single file.
- **Type Rigid**: Built in TypeScript for modern workflows.

## 🚀 Usage
```typescript
import { uuidv4 } from './uuid-pure';

const id = uuidv4();
console.log(id); // "690d25d2-e452-44b9-98be-2cee6153532a"
```

---
*Developed under the Panopticon-Protocol. Sovereignty through Refinement.*
