/**
 * Check if given fields have no errors.
 *
 * @param {array} fields
 */
export default function(state, fields) {
  for (let i = 0; i < fields.length; i ++) {
    if (state[fields[i]].error) {
      return false
    }
  }

  return true
}
