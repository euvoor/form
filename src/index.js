import { initState, initFieldState } from "./initState"
import is_disabled from "./utils/is_disabled"
import is_fields_ok from "./utils/is_fields_ok"
import reducers from "./reducers"
import types from "./ReTypes"

export default function(fields) {
  return {
    state: initState(fields),
    reducers,
  }
}

export {
  types,
  is_disabled,
  is_fields_ok,
  initState,
  initFieldState,
}
