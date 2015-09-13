/**
 * Return a unique identifier with the given `len`.
 *
 *     utils.uid(10);
 *     // => "FDaS435D2z"
 *
 * @param {Number} len
 * @return {String}
 * @api private
 */


let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let charlen = chars.length;

let lite_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  lite_charlen = chars.length;

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.uid = function (len) {
  let buf = [];


  for (var i = 0; i < len; ++i) {
    buf.push(chars[getRandomInt(0, charlen - 1)]);
  }

  return buf.join('');
};

exports.uidLight = function (len) {
  let buf = [];


  for (var i = 0; i < len; ++i) {
    buf.push(lite_chars[getRandomInt(0, lite_charlen - 1)]);
  }

  return buf.join('');
};


