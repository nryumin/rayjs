import {jest} from '@jest/globals';
import {formatInterval, intersection, intersects, NumInterval, parseInterval} from "./index.ts";

//parse test
{
  const cases = [
    [null,null],
    [1,null],
    [null,1],
    [1,2],
    [null,0],
    [0,null],
    [0,2],
    [-3,0]
  ]

  cases.forEach((i)=>{
    test(`Parse/format [${i[0]},${i[1]}]`, () => {
      const parsed = parseInterval(i);
      const returned = formatInterval(parsed);
      expect(returned).toEqual(i);
    });
  });
}

//intersect test
{
  const cases = [
    [[null,2],[3,null],false],
    [[null,3],[2,null],true],
    [[3,6],[null,2],false],
    [[3,6],[7,null],false],
    [[3,6],[null,4],true],
    [[3,6],[null,7],true],
    [[3,6],[4,null],true],
    [[3,6],[2,null],true],
    [[3,6],[4,5],true],
    [[3,6],[2,4],true],
    [[3,6],[2,3],true],
    [[3,6],[4,7],true],
    [[3,6],[6,7],true],
    [[3,6],[1,2],false],
    [[3,6],[7,8],false],
  ]

  cases.forEach(([i1,i2,res])=>{
    test(`Intersection ${JSON.stringify(i1)} and ${JSON.stringify(i2)}`, () => {
      expect(intersects(i1,i2)).toBe(res);
      expect(intersects(i2,i1)).toBe(res);
    });
  });
}