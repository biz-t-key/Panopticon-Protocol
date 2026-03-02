# Lodash Pure: Essential Utilities
Surgical extraction of `get` and `isEmpty` from Lodash.

## Refinement Results
- **Original**: Lodash (531 KB)
- **Purified**: 1.2 KB
- **Reduction**: 99.7%

## Usage
```typescript
import { get, isEmpty } from './lodash-pure';
const val = get(obj, 'a[0].b.c');
const empty = isEmpty({});
```
