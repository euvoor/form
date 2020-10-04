import _ from 'lodash'

import Validator from '../Validator'

/**
 * Check if disabled attribute can be set or not.
 *
 * @param {object} fields
 *   list of fields to be validated before setting disabled attribute. field
 *   must be given as returned by initState()
 */
export default function(fields) {
  const validator = new Validator(fields)
  let disabled = false

  _.forIn(fields, (value, key) => {
    if (validator.try_field(key) === true) {
      disabled = true
      return false
    }
  })

  return disabled
}
