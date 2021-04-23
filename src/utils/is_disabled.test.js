import { initState } from "../initState"
import is_disabled from "./is_disabled"
import types from "../ReTypes"

test("disabled is true by default", async () => {
  let state = initState({
    email: {
      validator: {
        type: types.email,
      },
    },
    agree: {
      validator: {
        oneOf: ["yes", "no"],
        oneOfEqual: "yes"
      },
    },
  })

  {
    let { email, agree } = state
    expect(is_disabled({ email, agree })).toBe(true)
  }

  {
    state.email.value = "euvoor@gmail.com"
    let { email, agree } = state
    expect(is_disabled({ email, agree })).toBe(true)
  }

  {
    state.agree.value = "yes"
    let { email, agree } = state
    expect(is_disabled({ email, agree })).toBe(false)
  }
})

test("disabled if false by default", async () => {
  let state = initState({
    age: {
      validator: {
        required: false,
      }
    }
  })

  let { age } = state
  expect(is_disabled({ age })).toBe(false)
})
