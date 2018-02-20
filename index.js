import React, {
  createElement,
  Children
} from 'react'

export const toElement = (obj, scope = {}) => {
  if (typeof obj === 'string') return obj
  const children = Array.isArray(obj.children)
    ? obj.children.map(child => toElement(child, scope))
    : obj.children
  const type = scope[obj.type] || obj.type
  const props = obj.props || null
  const el = createElement(type, props, children)
  return el
}

export const getName = type => typeof type === 'function'
  ? type.displayName || type.name || 'Component'
  : type

export const omit = (obj, keys) => {
  const next = {}
  for (let key in obj) {
    if (keys.includes(key)) continue
    next[key] = obj[key]
  }
  return next
}

export const toObject = el => {
  if (typeof el === 'string') return el
  const type = getName(el.type)
  const props = el.props

  if (!props || !props.children) {
    return {
      type,
      props
    }
  }
  const children = Children.toArray(el.props.children)
    .map(child => toObject(child))

  return {
    type,
    props: omit(props, [ 'children' ]),
    children
  }
}
