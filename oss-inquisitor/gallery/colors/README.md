# Colors Pure: Terminal Aesthetics
Native ANSI escape codes for terminal coloring.

## Refinement Results
- **Original**: chalk (120 KB tree)
- **Purified**: 0.5 KB
- **Reduction**: 99.6%

## Usage
```typescript
import { green, bold } from './colors-pure';
console.log(bold(green('System Operational')));
```
