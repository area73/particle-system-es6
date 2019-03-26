import slice from './slice.js';

/**
 * Returns all but the last element of the given list or string.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category List
 * @sig [a] -> [a]
 * @sig String -> String
 * @param {*} list
 * @return {*}
 * @see R.last, R.head, R.tail
 * @example
 *
 *      R._init([1, 2, 3]);  //=> [1, 2]
 *      R._init([1, 2]);     //=> [1]
 *      R._init([1]);        //=> []
 *      R._init([]);         //=> []
 *
 *      R._init('abc');  //=> 'ab'
 *      R._init('ab');   //=> 'a'
 *      R._init('a');    //=> ''
 *      R._init('');     //=> ''
 */
var init = /*#__PURE__*/slice(0, -1);
export default init;
