'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _ = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_);

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

  ___default['default'].forIn(fields, (value, key) => {
    state[key] = {
      value: "",
      name: key,
      helper_text: "",
      error: false,
      validator: {
        validate_on_change: false,
        validate_on_blur: true,
        required: true,
        type: undefined,
        oneOf: undefined,
        oneOfEqual: undefined,
      },
    };

    state[key] = ___default['default'].merge(state[key], value);
  });

  return state
}

const re_types = {
  RE_TYPE_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const types = {
  TYPE_EMAIL: "RE_TYPE_EMAIL"
};

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

    if (___default['default'].isUndefined(validator.type) === false) {
      fails_in = { ...fails_in, ...this._type(value, validator.type) };
    }

    if (___default['default'].isArray(validator.oneOf)) {
      fails_in = { ...fails_in, ...this._oneOf(value, validator.oneOf) };
    }

    if (___default['default'].isUndefined(validator.oneOfEqual) === false) {
      fails_in = { ...fails_in, ...this._oneOfEqual(value, validator.oneOfEqual) };
    }

    let failed = false;

    ___default['default'].forIn(fails_in, (value, key) => {
      if (value === true) {
        failed = true;
      }
    });

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
      oneOf: ___default['default'].indexOf(one_of, value) === -1,
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
  _type(value, re) {
    if (___default['default'].isEmpty(___default['default'].trim(value))) {
      return { type: false }
    }

    return {
      type: !re_types[re].test(value)
    }
  }

  /**
   * Validate `required` attribute.
   *
   * @param {string} value
   */
  _required(value) {
    return {
      required: ___default['default'].isEmpty(___default['default'].trim(value))
    }
  }
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

const {
  TYPE_EMAIL,
} = types;

exports.TYPE_EMAIL = TYPE_EMAIL;
exports.default = index;
