export function rleDecompress(rle: string): { [key: number]: { [key: number]: number } } {
  const ruleIndex = rle.indexOf('rule');
  const newlineIndex = rle.indexOf('\n', ruleIndex + 1);
  rle = rle.substring(newlineIndex).replace(/\n|\r/g, '');

  const piece: { [key: number]: { [key: number]: number } } = { 0: {} };
  let num = '';
  let x = 0;
  let y = 0;

  const rleArray = Array.from(rle);

  for (const entry in rleArray) {
    const s = rleArray[entry];
    if (s === 'b') {
      x = num === '' ? x + 1 : x + parseInt(num, 10);
      num = '';

    } else if (s === 'o') {
      let i = num === '' ? 1 : parseInt(num, 10);
      while (i--) {
        piece[y][x + i] = 1;
      }

      x = num === '' ? x + 1 : x + parseInt(num, 10);
      num = '';

    } else if (s === '$') {
      y += num === '' ? 1 : parseInt(num, 10);
      x = 0;
      num = '';
      piece[y] = {};

    } else if (s === '!') {
      break;
    } else if (!isNaN(parseInt(s, 10))) {
      num += s;
    }
  }

  return piece;
}
