export type NumInterval = [number | null,number | null]

export function parseInterval(i: NumInterval) : [number,number] {
  return [i[0] === null ? -Infinity : i[0], i[1] === null ? Infinity : i[1]];
}

export function formatInterval([start,end]: [number,number]) : NumInterval {
  const resStart = isFinite(start) ? start : null;
  const resEnd = isFinite(end) ? end : null;
  return [resStart,resEnd];
}

export function intersects(i1: NumInterval, i2: NumInterval): boolean {
  const [start1, end1] = parseInterval(i1);
  const [start2, end2] = parseInterval(i2);

  return start1 <= end2 && end1 >= start2;
}

// i1 includes i2
export function contains(i1: NumInterval, i2: NumInterval): boolean {
  const [start1, end1] = parseInterval(i1);
  const [start2, end2] = parseInterval(i2);

  return start1 <= start2 && end1>=end2;
}

export function containsPoint(i1: NumInterval, val: number): boolean {
  const [start, end] = parseInterval(i1);
  return start <= val && end>=val;
}

export function union(i1: NumInterval, i2: NumInterval): NumInterval | null {
  if(!intersects(i1,i2))
    return null;

  const [start1,end1] = parseInterval(i1);
  const [start2,end2] = parseInterval(i2);

  const start = Math.min(start1,start2);
  const end = Math.max(end1,end2);
  const res = formatInterval([start,end]);
  return res;
}

export function intersection(i1: NumInterval, i2: NumInterval): NumInterval | null {
  if(!intersects(i1,i2))
    return null;

  const [start1,end1] = parseInterval(i1);
  const [start2,end2] = parseInterval(i2);

  const start = Math.max(start1,start2);
  const end = Math.min(end1,end2);
  const res = formatInterval([start,end]);
  return res;
}

export function mask(i: NumInterval,masks: NumInterval[]): NumInterval[] {
  const res: NumInterval[] = [];
  masks.forEach(m=>{
    const tmp = intersection(i,m);
    if(tmp)
      res.push(tmp);
  })
  return res;
}