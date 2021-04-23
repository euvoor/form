import _ from "lodash"

/**
 * Initialize single field state.
 */
export function initFieldState(key, props) {
  let result = {
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

  let pattern = _.get(props, "validator.pattern")

  if (pattern) {
    props.validator.pattern = JSON.stringify({ rgx: pattern.source })
  }

  return _.merge(result, props)
}

/**
 * Generate standardized form fields state values.
 *
 * @param {object} fields
 */
export function initState(fields) {
  let state = { }

  _.forIn(fields, (props, key) => {
    state[key] = initFieldState(key, props)
  })

  return state
}
