import { jest } from '@jest/globals';
import {
  containsPoint,
  formatInterval,
  contains,
  intersection,
  intersects,
  mask,
  NumInterval,
  parseInterval,
  union,
} from './index';

//parse test
{
  const cases = [
    [null, null],
    [1, null],
    [null, 1],
    [1, 2],
    [null, 0],
    [0, null],
    [0, 2],
    [-3, 0],
  ];

  cases.forEach((i) => {
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
    [[null, 2], [3, null], false],
    [[null, 3], [2, null], true],
    [[3, 6], [null, 2], false],
    [[3, 6], [7, null], false],
    [[3, 6], [null, 4], true],
    [[3, 6], [null, 7], true],
    [[3, 6], [4, null], true],
    [[3, 6], [2, null], true],
    [[3, 6], [4, 5], true],
    [[3, 6], [2, 4], true],
    [[3, 6], [2, 3], true],
    [[3, 6], [4, 7], true],
    [[3, 6], [6, 7], true],
    [[3, 6], [1, 2], false],
    [[3, 6], [7, 8], false],
  ];

  cases.forEach(([i1, i2, res]) => {
    test(`Intersection ${JSON.stringify(i1)} and ${JSON.stringify(i2)}`, () => {
      expect(intersects(i1, i2)).toBe(res);
      expect(intersects(i2, i1)).toBe(res);
    });
  });
}

//contains test
{
  const cases = [
    [[null, 2], [3, null], false],
    [[null, 3], [2, null], false],
    [[null, 3], [null, 2], true],
    [[null, 2], [null, 3], false],
    [[2, null], [3, null], true],
    [[3, null], [2, null], false],
    [[3, null], [1, 2], false],
    [[3, null], [1, 4], false],
    [[3, null], [4, 5], true],
    [[null, 6], [1, 2], true],
    [[null, 6], [5, 7], false],
    [[null, 6], [7, 9], false],
    [[4, 8], [5, 6], true],
    [[4, 8], [5, 9], false],
    [[4, 8], [9, 10], false],
    [[4, 8], [1, 5], false],
    [[4, 8], [1, 3], false],
  ];

  cases.forEach(([i1, i2, res]) => {
    test(`Contains ${JSON.stringify(i1)} and ${JSON.stringify(i2)}`, () => {
      expect(contains(i1, i2)).toBe(res);
    });
  });
}

//contains point
{
  const cases = [
    [[4, null], 1, false],
    [[4, null], 4, true],
    [[4, null], 5, true],
    [[null, 4], 1, true],
    [[null, 4], 4, true],
    [[null, 4], 5, false],
    [[1, 4], 0, false],
    [[1, 4], 1, true],
    [[1, 4], 3, true],
    [[1, 4], 4, true],
    [[1, 4], 5, false],
  ];

  cases.forEach(([i, p, res]) => {
    test(`Contains ${JSON.stringify(i)} point ${p}`, () => {
      expect(containsPoint(i, p)).toBe(res);
    });
  });
}

//union test
{
  const cases = [
    [[null, 2], [3, null], null],
    [
      [null, 3],
      [2, null],
      [null, null],
    ],
    [
      [null, 3],
      [3, null],
      [null, null],
    ],
    [[null, 3], [4, 5], null],
    [
      [null, 3],
      [3, 5],
      [null, 5],
    ],
    [
      [null, 3],
      [2, 4],
      [null, 4],
    ],
    [
      [null, 4],
      [2, 3],
      [null, 4],
    ],
    [[5, null], [3, 4], null],
    [
      [5, null],
      [3, 5],
      [3, null],
    ],
    [
      [5, null],
      [3, 6],
      [3, null],
    ],
    [
      [5, null],
      [6, 7],
      [5, null],
    ],
    [[1, 5], [6, 7], null],
    [
      [1, 5],
      [5, 7],
      [1, 7],
    ],
    [
      [1, 5],
      [4, 7],
      [1, 7],
    ],
    [
      [1, 5],
      [3, 4],
      [1, 5],
    ],
    [
      [1, 5],
      [0, 4],
      [0, 5],
    ],
  ];

  cases.forEach(([i1, i2, res]) => {
    test(`Union ${JSON.stringify(i1)} and ${JSON.stringify(i2)}`, () => {
      expect(union(i1, i2)).toEqual(res);
      expect(union(i2, i1)).toEqual(res);
    });
  });
}

//intersection test
{
  const cases = [
    [[null, 2], [3, null], null],
    [
      [null, 3],
      [2, null],
      [2, 3],
    ],
    [
      [null, 3],
      [3, null],
      [3, 3],
    ],
    [[null, 3], [4, 5], null],
    [
      [null, 3],
      [3, 5],
      [3, 3],
    ],
    [
      [null, 3],
      [2, 4],
      [2, 3],
    ],
    [
      [null, 4],
      [2, 3],
      [2, 3],
    ],
    [[5, null], [3, 4], null],
    [
      [5, null],
      [3, 5],
      [5, 5],
    ],
    [
      [5, null],
      [3, 6],
      [5, 6],
    ],
    [
      [5, null],
      [6, 7],
      [6, 7],
    ],
    [[1, 5], [6, 7], null],
    [
      [1, 5],
      [5, 7],
      [5, 5],
    ],
    [
      [1, 5],
      [4, 7],
      [4, 5],
    ],
    [
      [1, 5],
      [3, 4],
      [3, 4],
    ],
    [
      [1, 5],
      [0, 4],
      [1, 4],
    ],
  ];

  cases.forEach(([i1, i2, res]) => {
    test(`Intersection ${JSON.stringify(i1)} and ${JSON.stringify(i2)}`, () => {
      expect(intersection(i1, i2)).toEqual(res);
      expect(intersection(i2, i1)).toEqual(res);
    });
  });
}

//mask test
{
  const i = [5, 20];
  const masks = [
    [1, 3],
    [4, 6],
    [7, 10],
    [18, 21],
    [25, 28],
  ];

  test(`Mask ${JSON.stringify(i)} with ${JSON.stringify(masks)}`, () => {
    const expected = [
      [5, 6],
      [7, 10],
      [18, 20],
    ];
    expect(mask(i, masks)).toEqual(expected);
  });
}

{
  const i = [5, 20];
  const masks = [
    [null, 6],
    [7, 10],
    [18, null],
  ];

  test(`Mask ${JSON.stringify(i)} with ${JSON.stringify(masks)}`, () => {
    const expected = [
      [5, 6],
      [7, 10],
      [18, 20],
    ];
    expect(mask(i, masks)).toEqual(expected);
  });
}
