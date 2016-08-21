```javascript
var assert = require('assert')
var bifurcate = require('boolean-json-bifurcate')

assert.deepEqual(
  bifurcate({and: ['p', 'q']}),
  {and: ['p', 'q']}
)

assert.deepEqual(
  bifurcate({and: ['p', 'q', 'r', 's']}),
  {and: ['p', {and: ['q', {and: ['r', 's']}]}]}
)

assert.deepEqual(
  bifurcate({or: ['p', 'q', 'r', 's']}),
  {or: ['p', {or: ['q', {or: ['r', 's']}]}]}
)

assert.deepEqual(
  bifurcate({not: {or: [{not: 'p'}, 'q', 'r']}}),
  {not: {or: [{not: 'p'}, {or: ['q', 'r']}]}}
)
```
