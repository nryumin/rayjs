# rayjs
Library for manipulating numeric segments and rays. 

### Data types

Numberic segments or rays are two number arrays where null is infinity

[1.9,2], [null,5.3] , [-11, null] or [null,null] are valid inputs

### Methods

#### intersects
`intersects([2,5],[3,6])` => `true`  
`intersects([2,5],[9,10])` => `false`

#### includes - checks if first segment includes second
`includes([2,10],[3,6])` => `true`   
`includes([2,null],[3,null])` => `true`  
`includes([2,10],[9,null])` => `false`

#### containsPoint
`containsPoint([1,5],4)` => `true`  
`containsPoint([1,null],4)` => `true`  

#### union
`union([1,5],[2,6])` => `[1,6]`  
`union([1,5],[6,7])` => `null`

#### intersection
`intersection([1,5],[4,6])` => `[4,5]`  
`intersection([1,5],[4,null])` => `[4,5]`  
`intersection([null,5],[4,null])` => `[4,5]`

#### mask - masks first segment with array of other segments
`mask([1,10],[[null,2],[5,6],[9,15]])` => `[[1,2],[5,6],[9,10]]`

