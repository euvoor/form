import Validator, { types } from './Validator.js'
import initState from './initState.js'

test("field is required", async () => {
  let state = initState({ email: {} })
  let validator = new Validator(state)

  validator.field("email")
  expect(state.email.error).toBe(true)

  state.email.validator.required = false
  validator.field("email")
  expect(state.email.error).toBe(false)
})

test("field is of type email", () => {
  let state = initState({
    email: {
      validator: {
        required: false,
        type: types.TYPE_EMAIL,
      }
    }
  })

  let validator = new Validator(state)

  validator.field("email")
  expect(state.email.error).toBe(false)

  state.email.value = "Oussama Elgoumri"
  validator.field("email")
  expect(state.email.error).toBe(true)

  state.email.value = "euvoor@gmail.com"
  validator.field("email")
  expect(state.email.error).toBe(false)
})

test("field of type email is required", async () => {
  let state = initState({
    email: {
      validator: {
        required: true,
        type: types.TYPE_EMAIL,
      }
    }
  })

  let validator = new Validator(state)

  validator.field("email")
  expect(state.email.error).toBe(true)

  state.email.value = "euvoor@gmail.com"
  validator.field("email")
  expect(state.email.error).toBe(false)
})

test("field is 'oneOf' one of the given values", async () => {
  let state = initState({
    agree: {
      validator: {
        required: false,
        oneOf: ["yes", "no"],
      }
    }
  })

  let validator = new Validator(state)

  validator.field("agree")
  expect(state.agree.error).toBe(true)

  state.agree.value = "xxx"
  validator.field("agree")
  expect(state.agree.error).toBe(true)

  state.agree.value = "yes"
  validator.field("agree")
  expect(state.agree.error).toBe(false)
})

test("field has 'oneOfEqual'", async () => {
  let state = initState({
    agree: {
      validator: {
        oneOf: ["yes", "no"],
        oneOfEqual: "yes",
      }
    }
  })

  const validator = new Validator(state)

  state.agree.value = "yes"
  validator.field("agree")
  expect(state.agree.error).toBe(false)

  state.agree.value = "no"
  validator.field("agree")
  expect(state.agree.error).toBe(true)
})

test("try field validator", async () => {
  let state = initState({
    email: {
      validator: {
        type: types.TYPE_EMAIL,
      }
    }
  })

  const validator = new Validator(state)

  validator.try_field("email")
  expect(state.email.error).toBe(false)
})
