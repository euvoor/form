import { initState } from "../initState"
import is_fields_ok from "./is_fields_ok"
import reducers from "../reducers"
import types from "../ReTypes"

test("check if the given fields ok", async () => {
  let state = initState({
    email: {
      validator: {
        type: types.email,
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
