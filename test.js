import test from 'ava'
import React from 'react'
import { create as render } from 'react-test-renderer'
import { toElement, toObject } from '.'

test('converts object to React element', t => {
  const el = toElement({
    type: 'div',
    props: null,
    children: [
      {
        type: 'h1',
        props: {
          id: 'hi'
        },
        children: [
          'Hello'
        ]
      }
    ]
  })
  const json = render(el).toJSON()
  t.is(json.type, 'div')
  t.deepEqual(json.props, {})
  t.is(json.children.length, 1)
  t.is(json.children[0].type, 'h1')
  t.deepEqual(json.children[0].props, {
    id: 'hi'
  })
  t.is(json.children[0].children[0], 'Hello')
})

test('converts object to React element with scope', t => {
  const scope = {
    Hello: props => <h2 {...props} />
  }
  const el = toElement({
    type: 'div',
    props: null,
    children: [
      {
        type: 'Hello',
        props: {
          id: 'beep'
        },
        children: [ 'Beep' ]
      }
    ]
  }, scope)
  const json = render(el).toJSON()
  t.is(json.type, 'div')
  t.is(el.props.children[0].type, scope.Hello)
})

test('converts React element to object', t => {
  const obj = toObject(
    <header className='beep'>
      <h2 id='2'>Hi</h2>
    </header>
  )
  t.is(obj.type, 'header')
  t.is(obj.props.className, 'beep')
  t.is(obj.children[0].type, 'h2')
  t.is(obj.children[0].props.id, '2')
  t.is(obj.children[0].children[0], 'Hi')
})

test('converts empty element to object', t => {
  const obj = toObject(<div />)
  t.is(obj.type, 'div')
})

test('converts element with components to object', t => {
  const Hello = props => <h1 {...props} style={{ color: 'tomato' }} />
  Hello.displayName = 'Hello'
  const obj = toObject(
    <div>
      <Hello>Hi</Hello>
    </div>
  )
  const [ child ] = obj.children
  t.is(child.type, 'Hello')
  t.is(child.children[0], 'Hi')
})

