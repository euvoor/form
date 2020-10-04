import initState from "./initState"

test("empty state", () => {
  expect(initState({})).toStrictEqual({
    _pending: false,
    _rejected: false,
  })
})

test("field with a single validator", () => {
  expect(initState({
    name: {
      validator: {
        required: false,
      }
    },
  }))
  .toStrictEqual({
    _pending: false,
    _rejected: false,
    name: {
      value: "",
      name: "name",
      helper_text: "",
      error: false,
      validator: {
        validate_on_change: false,
        validate_on_blur: true,
        required: false,
        pattern: null,
        type: undefined,
        oneOf: undefined,
        oneOfEqual: undefined,
      }
    }
  })
})

test("generate default state", () => {
  expect(initState({
    name: { },
  }))
  .toStrictEqual({
    _pending: false,
    _rejected: false,
    name: {
      value: "",
      name: "name",
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
    }
  })
})

test("override default state values", () => {
  expect(initState({
    name: {
      value: "Oussama Elgoumri",
      name: "fullname",
      helper_text: "Plz entr ur name",
      error: true,
      validator: {
        validate_on_change: true,
        validate_on_blur: false,
        required: false,
        pattern: null,
        type: "text",
        oneOf: ["yes", "no"],
        oneOfEqual: "yes",
      }
    },
  }))
  .toStrictEqual({
    _rejected: false,
    _pending: false,
    name: {
      value: "Oussama Elgoumri",
      name: "fullname",
      helper_text: "Plz entr ur name",
      error: true,
      validator: {
        validate_on_change: true,
        validate_on_blur: false,
        required: false,
        pattern: null,
        type: "text",
        oneOf: ["yes", "no"],
        oneOfEqual: "yes",
      }
    }
  })
})
