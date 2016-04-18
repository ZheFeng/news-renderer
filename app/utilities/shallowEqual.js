
function allKeyDataSame(objA, objB, keys) {
  // Test for A's keys different from B.
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!hasOwnProperty.call(objB, key) || objA[key] !== objB[key]) {
      return false;
    }
  }
  return true;
}
function allKeySame(objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return allKeyDataSame(objA, objB, keysA);
}

/**
 * shallowEqual - compare to value same or not, only do shallow compare for obj
 *
 * @param  {obj} objA first value
 * @param  {obj} objB second value
 * @return {bool}      equal or not
 */
export default function shallowEqual(objA, objB) {
  return objA === objB || allKeySame(objA, objB);
}
