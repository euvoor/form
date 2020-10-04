import Validator from './Validator'

export default {
  /**
   * onChange event.
   *
   * @param {object} state
   * @param {object} action
   */
  handleChange(state, action) {
    const { name, value } = action.payload
    state[name].value = value

    if (state[name].error || state[name].validator.validate_on_change) {
      const validator = new Validator(state)
      validator.field(name)
    }
  },

  /**
   * onBlur event.
   *
   * @param {object} state
   * @param {object} action
   */
  handleBlur(state, action) {
    const { name, value } = action.payload

    if (state[name].validator.validate_on_blur) {
      const validator = new Validator(state)
      validator.field(name)
    }
  },

  /**
   * Validate the given fields only.
   *
   * @param {object} state
   * @param {object} action
   */
  validateOnly(state, action) {
    const validator = new Validator(state)

    for (let i = 0; i < action.payload.length; i ++) {
      validator.field(action.payload[i])
    }
  }
}
