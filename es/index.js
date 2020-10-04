import _ from 'lodash';

/**
 * Generate standardized form fields state values.
 *
 * @param {object} fields
 */
function initState(fields) {
  let state = {
    _pending: false,
    _rejected: false,
  };

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
    };

    let pattern = _.get(value, "validator.pattern");

    if (pattern) {
      value.validator.pattern = JSON.stringify({ rgx: pattern.source });
    }

    state[key] = _.merge(state[key], value);
  });

  return state
}

const re_types  = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

let types = {};

_.forIn(re_types, (value, key) => {
  types[key] = key;
});

class Validator {
  constructor(state) {
    this.state = state;
  }

  /**
   * Validate field input.
   *
   * @param {string} field_name
   */
  field(field_name) {
    let failed = this.try_field(field_name);

    if (failed) { this.state[field_name].error = true; }
    else { this.state[field_name].error = false; }
  }

  /**
   * Validate field without setting errors.
   *
   * @param {string} field_name
   */
  try_field(field_name) {
    let validator = this.state[field_name].validator;

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
    };

    if (validator.required === true) {
      fails_in = { ...fails_in, ...this._required(value) };
    }

    if (_.isUndefined(validator.type) === false) {
      fails_in = { ...fails_in, ...this._re_type(validator.type, value) };
    }

    if (_.isArray(validator.oneOf)) {
      fails_in = { ...fails_in, ...this._oneOf(value, validator.oneOf) };
    }

    if (_.isUndefined(validator.oneOfEqual) === false) {
      fails_in = { ...fails_in, ...this._oneOfEqual(value, validator.oneOfEqual) };
    }

    if (_.isNull(validator.pattern) === false) {
      fails_in = { fails_in, ...this._pattern(value, validator.pattern) };
    }

    let failed = false;

    _.forIn(fails_in, (value, key) => {
      if (value === true) {
        failed = true;
      }
    });

    return failed
  }

  /**
   * Validate a value against the given pattern.
   *
   * @param {string} value
   * @param {Regex}  pattern
   * @return bool
   */
  _pattern(value, pattern) {
    const re = new RegExp(JSON.parse(pattern).rgx);

    return {
      pattern: !re.test(value),
    }
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

/**
 * Check if disabled attribute can be set or not.
 *
 * @param {object} fields
 *   list of fields to be validated before setting disabled attribute. field
 *   must be given as returned by initState()
 */
function is_disabled(fields) {
  const validator = new Validator(fields);
  let disabled = false;

  _.forIn(fields, (value, key) => {
    if (validator.try_field(key) === true) {
      disabled = true;
      return false
    }
  });

  return disabled
}

/**
 * Check if given fields have no errors.
 *
 * @param {array} fields
 */
function is_fields_ok(state, fields) {
  for (let i = 0; i < fields.length; i ++) {
    if (state[fields[i]].error) {
      return false
    }
  }

  return true
}

var reducers = {
  /**
   * onChange event.
   *
   * @param {object} state
   * @param {object} action
   */
  handleChange(state, action) {
    const { name, value } = action.payload;
    state[name].value = value;

    if (state[name].error || state[name].validator.validate_on_change) {
      const validator = new Validator(state);
      validator.field(name);
    }
  },

  /**
   * onBlur event.
   *
   * @param {object} state
   * @param {object} action
   */
  handleBlur(state, action) {
    const { name, value } = action.payload;

    if (state[name].validator.validate_on_blur) {
      const validator = new Validator(state);
      validator.field(name);
    }
  },

  /**
   * Validate the given fields only.
   *
   * @param {object} state
   * @param {object} action
   */
  validateOnly(state, action) {
    const validator = new Validator(state);

    for (let i = 0; i < action.payload.length; i ++) {
      validator.field(action.payload[i]);
    }
  }
};

function index(fields) {
  return {
    state: initState(fields),
    reducers,
  }
}

export default index;
export { is_disabled, is_fields_ok, types };
