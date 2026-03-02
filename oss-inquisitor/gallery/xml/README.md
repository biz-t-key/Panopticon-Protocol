# XML Pure: Minimalist Parser
A lightweight, zero-dependency XML to JSON parser.

## Refinement Results
- **Original**: xml2js (240 KB tree)
- **Purified**: 1.1 KB
- **Reduction**: 99.5%

## Usage
```typescript
import { parseXml } from './xml-pure';
const data = parseXml('<root>...</root>');
```
