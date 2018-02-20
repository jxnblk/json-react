
# json-react

Convert objects to React elements and elements to serializable objects

```sh
npm i json-react
```

Convert React element to object

```js
import jsonReact from 'json-react'

const el = (
  <div>
    <h1>Hello</h1>
  </div>
)

const obj = jsonReact.toObject(el)
```

```js
// returns
{
  type: 'div',
  props: null,
  children: [
    {
      type: 'h1',
      props: null,
      children: [
        'Hello'
      ]
    }
  ]
}
```

Convert object to React element

```js
import jsonReact from 'json-react'

const el = jsonReact.toElement({
  type: 'div',
  props: null,
  children: [
    {
      type: 'h1',
      props: null,
      children: [
        'Hello'
      ]
    }
  ]
})
```

```js
// returns
<div>
  <h1>Hello</h1>
</div>
```

Convert object to React element with references to components

```js
import jsonReact from 'json-react'
import MyComponent from './MyComponent'

const el = jsonReact.toElement({
  type: 'MyComponent',
  props: {},
  children: [
    'Hello'
  ]
}, { MyComponent })

// <MyComponent>Hello</MyComponent>
```

## Why?

- Demonstrate how React elements are objects and can be converted to and from JSON
- Components can be serialized by displayName
- Components can be passed as scope to create elements from objects

