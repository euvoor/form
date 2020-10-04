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
  )
}

export default React.memo(MyComponent)
```

That's it ;)
