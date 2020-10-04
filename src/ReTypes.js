import _ from "lodash"

export const re_types  = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
}

let types = {}

_.forIn(re_types, (value, key) => {
  types[key] = key
})

export default types

