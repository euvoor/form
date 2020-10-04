import _ from 'lodash'

import initState from './initState'
import reducers from './reducers'
import { types } from './Validator'

export default function(fields) {
  return {
    state: initState(fields),
    reducers,
  }
}

export * from './utils/is_disabled'
export * from './utils/is_fields_ok'

export const {
  TYPE_EMAIL,
} = types
