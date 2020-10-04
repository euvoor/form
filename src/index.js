import { types } from './Validator'
import initState from './initState'
import is_disabled from './utils/is_disabled'
import is_fields_ok from './utils/is_fields_ok'
import reducers from './reducers'

export default function(fields) {
  return {
    state: initState(fields),
    reducers,
  }
}

export {
  is_disabled,
  is_fields_ok,
}

export const {
  TYPE_EMAIL,
} = types
