export function rleDecompress(rle) {
  rle = rle.substr(rle.indexOf('\n', rle.indexOf('rule')+1)).replace('\n', '');
  rle = rle.replace('\r', '');

  var piece = {0:{}};
  var num = '';
  var x = 0;
  var y = 0;

  for(const entry in rle) {

    const s = rle[entry];
    if (s === 'b') {
      x = num === '' ? x+1 : x + parseInt(num, 10);
      num = '';

    } else if(s === 'o') {

      var i = num === '' ? 1 : parseInt(num, 10);
      while(i--) {
        piece[y][x + i] = 1;
      }

      x = num === '' ? x+1 : x + parseInt(num, 10);
      num = '';

    } else if(s === '$') {

      y += num === '' ? 1 : parseInt(num, 10);
      x = 0;
      num = '';
      piece[y] = {};

    } else if(s === '!') {
      break;
    } else if(parseInt(s, 10).toString() !== 'NaN'){
      num += s;
    }
  }

  return piece;

}