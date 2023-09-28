import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({todos}) {
  return (
    <ul>
      {todos.map(item => <TodoItem key={item.id} todo={item} />)}
    </ul>
  )
}