import _ from "lodash"

/**
 * Generate standardized form fields state values.
 *
 * @param {object} fields
 */
export default function initState(fields) {
  let state = {
    _pending: false,
    _rejected: false,
  }

  _.forIn(fields, (value, key) => {
    state[key] = {
      value: "",
      name: key,
      helper_text: "",
      error: false,
      validator: {
        validate_on_change: false,
        validate_on_blur: true,
        required: true,
        pattern: null,
        type: undefined,
        oneOf: undefined,
        oneOfEqual: undefined,
      },
    }

    state[key] = _.merge(state[key], value)
  })

  return state
}
