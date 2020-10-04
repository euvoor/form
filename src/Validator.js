import _ from "lodash"

import { re_types } from "./ReTypes"

export default class Validator {
  constructor(state) {
    this.state = state
  }

  /**
   * Validate field input.
   *
   * @param {string} field_name
   */
  field(field_name) {
    let failed = this.try_field(field_name)

    if (failed) { this.state[field_name].error = true }
    else { this.state[field_name].error = false }
  }

  /**
   * Validate field without setting errors.
   *
   * @param {string} field_name
   */
  try_field(field_name) {
    let validator = this.state[field_name].validator

    return this._fails_in(validator, this.state[field_name].value)
  }

  /**
   * Check if value failed in any given validator.
   *
   * @param {string} validator
   * @param {string} value
   */
  _fails_in(validator, value) {
    let fails_in = {
      oneOf: false,
      oneOfEqual: false,
      type: false,
      required: false
    }

    if (validator.required === true) {
      fails_in = { ...fails_in, ...this._required(value) }
    }

    if (_.isUndefined(validator.type) === false) {
      fails_in = { ...fails_in, ...this._re_type(validator.type, value) }
    }

    if (_.isArray(validator.oneOf)) {
      fails_in = { ...fails_in, ...this._oneOf(value, validator.oneOf) }
    }

    if (_.isUndefined(validator.oneOfEqual) === false) {
      fails_in = { ...fails_in, ...this._oneOfEqual(value, validator.oneOfEqual) }
    }

    let failed = false

    _.forIn(fails_in, (value, key) => {
      if (value === true) {
        failed = true
      }
    })

    return failed
  }

  /**
   * Value must be one of the given values.
   *
   * @param {string} value
   * @param {array} one_of
   */
  _oneOf(value, one_of) {
    return {
      oneOf: _.indexOf(one_of, value) === -1,
    }
  }

  /**
   * Value of oneOf should equal to the given value to pass.
   *
   * @param {string} value
   * @param {string} one_of_equal
   */
  _oneOfEqual(value, one_of_equal) {
    return {
      oneOfEqual: value !== one_of_equal,
    }
  }

  /**
   * Validate the type of the value.
   *
   * @param {string} value
   * @param {string} type
   */
  _re_type(type_name, value) {
    if (_.isEmpty(_.trim(value))) {
      return { type: false }
    }

    return {
      type: !re_types[type_name].test(value)
    }
  }

  /**
   * Validate `required` attribute.
   *
   * @param {string} value
   */
  _required(value) {
    return {
      required: _.isEmpty(_.trim(value))
    }
  }
}
