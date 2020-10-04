import { types } from '../Validator.js'
import reducers from '../reducers'
import is_fields_ok from './is_fields_ok.js'
import initState from '../initState.js'

test("check if the given fields ok", async () => {
  let state = initState({
    email: {
      validator: {
        type: types.TYPE_EMAIL,
      }
    },
    agree: {
      validator: {
        oneOf: ["yes", "no"],
        oneOfEqual: "yes",
      }
    }
  })

  const fields = ["email", "agree"]

  reducers.validateOnly(state, { payload: fields })
  expect(is_fields_ok(state, fields)).toBe(false)

  state.email.value = "euvoor@gmail.com"
  state.agree.value = "yes"
  reducers.validateOnly(state, { payload: fields })
  expect(is_fields_ok(state, fields)).toBe(true)
})
