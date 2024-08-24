import { useState } from 'react'
import './App.css'
import { CssBaseline } from '@mui/material'
import TodoList from './TodoList';

function App(){
  return (
    <>
      <h1>To-do's</h1>
      <TodoList/>
    </>
  );
}

export default App
