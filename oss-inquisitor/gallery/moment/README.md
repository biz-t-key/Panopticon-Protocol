# Moment Pure: Relative Time
A surgical extraction of the relative time calculation logic from Moment.js.

## Refinement Results
- **Original**: Moment.js (172 KB)
- **Purified**: 2.8 KB
- **Reduction**: 98.4%

## Usage
```typescript
import { fromNow } from './moment-pure';
console.log(fromNow(new Date())); // "a few seconds ago"
```
