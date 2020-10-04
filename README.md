Light weight form validator that **DOES NOT STAND IN YOUR WAY** built for `@reduxjs/toolkit`

> Use react-redux the same way you used to, and let @euvoor/form magically
> handles the rest for you. (validation, state updates, events..) the data
> will be available to you when you need it on the state.

# Install

```
npm i @euvoor/form
```

# Usage

The following example is a typical day to day workflow

1. initialize the state.
2. update the ui.
3. submit the data after its validated.

in your **slice**

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Form, { TYPE_EMAIL } from '@euvoor/form'
import axios from 'axios'

const PREFIX = "some.name"

// See below for more options:
const form = Form({
  email: {
    validator: {
      type: TYPE_EMAIL,
    }
  },
})

export const submit = createAsyncThunk(`${PREFIX}/submit`, async (_, { getState }) => (
  // Get email value using: state.email.value
  (await axios.post("/api", { email: getState()["myReducer"].email.value })).data
))

const slice = createSlice({
  name: PREFIX,
  initialState: {
    ...form.state,
  },
  reducers: {
    ...form.reducers,
  },
})

export const { handleChange, handleBlur } = slice.actions
export default slice.reducer
```

in your **jsx**

```jsx
import React from 'react'
import { useSelector } from '@reduxjs/toolkit'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { is_disabled } from '@euvoor/form'

import { handleChange, handleBlur, submit } from './slice'

function MyComponent() {
  const { email } = useSelector(state => state),
    dispatch = useDispatch()

  return (
    <TextField
      value={email.value}
      name={email.name}
      onChange={({ target }) => dispatch(handleChange({ name: target.name, value: target.value }))}
      onBlur={({ target }) => dispatch(handleBlur({ name: target.name, value: target.value }))}
      error={email.error}
      helperText={email.helper_text}
    />

    {/* The save button will be enabled only if the list of given fields passes the validator */}
    <Button
      onClick={() => dispatch(submit())}
      disabled={is_disabled({ email })}
    >
      SAVE
    </Button>
  )
}

export default React.memo(MyComponent)
```

# Options

```javascript
{
  value: "",
  name: "NAME_OF_THE_FIELD",
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
}
```

That's it ;)
