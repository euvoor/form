Light weight form validator built specifically for `@reduxjs/toolkit` `createSlice`

# Install

```
npm i @euvoor/form
```

# Usage

in your **slice**

```
import { createSlice } from '@reduxjs/toolkit'
import Form, { TYPE_EMAIL } from '@euvoor/form'

const form = Form({
  email: {
    validator: {
      type: TYPE_EMAIL,
    }
  },
})

const initialState = {
  ...form.state,
}

const slice = default createSlice({
  name: "some.name",
  initialState,
  reducers: {
    ...form.reducers,
  }
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

import { handleChange, handleBlur } from './slice'

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
    <Button disabled={is_disabled({ email })}>save</Button>
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
