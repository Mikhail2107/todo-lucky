import { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import Footer from '../Footer'
import './App.css'

let newId = 0

function App() {
  const filters = [
    {
      value: 'All',
      id: 1,
    },
    {
      value: 'Active',
      id: 2,
    },
    {
      value: 'Completed',
      id: 3,
    },
  ]

  const [isSelected, setSelected] = useState({ value: 'All' })
  const [tasks, setTasks] = useState({ value: [] })
  const [time, setTime] = useState({ hoursValue: '', minutesValue: '', secondsValue: '' })
  const [input, setInputValue] = useState({ value: '', taskValue: '' })
  const [isEditing, editTask] = useState({ edit: false, targetId: '' })

  const onFilterOnClick = (e) => setSelected((prevState) => ({ ...prevState, value: e.target.textContent }))

  const onAddTask = (value) => {
    newId++
    const minutes = +time.minutesValue
    let newMinutes
    let newHours
    if (minutes > 60) {
      newMinutes = minutes % 60
      newHours = Math.trunc(minutes / 60)
    } else {
      newMinutes = minutes
      newHours = ''
    }
    const newTask = {
      value,
      id: newId,
      isCompleted: false,
      whenCreated: new Date(),
      seconds: time.secondsValue,
      minutes: newMinutes,
      hours: newHours,
    }
    const newTasksList = [...tasks.value, newTask]
    setTasks(() => ({ value: newTasksList }))
  }

  const onDeleteTask = (id) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    const newTasksList = [...tasks.value.slice(0, index), ...tasks.value.slice(index + 1)]
    setTasks((prevState) => ({ ...prevState, value: newTasksList }))
  }

  const onDeleteCompleteTasks = () => {
    const notCompleteTasks = tasks.value.filter((task) => !task.isCompleted)
    setTasks((prevState) => ({ ...prevState, value: notCompleteTasks }))
  }

  const onInputChange = (e) => {
    if (e.target.id === 'newTaskFormInput') {
      setInputValue((prevState) => ({ ...prevState, value: e.target.value }))
    }
    if (e.target.id === 'min') {
      setTime((prevState) => ({ ...prevState, minutesValue: e.target.value }))
    }
    if (e.target.id === 'sec') {
      setTime((prevState) => ({ ...prevState, secondsValue: e.target.value }))
    }
    setInputValue((prevState) => ({ ...prevState, taskValue: e.target.value }))
  }

  const onSubmit = (e, id) => {
    e.preventDefault()
    const value = input.value.trim()
    const newValueTask = input.taskValue.trim()
    if (e.target.id === 'newTaskForm') {
      onAddTask(value)
      setTime((prevState) => ({ ...prevState, hoursValue: '', minutesValue: '', secondsValue: '' }))
      setInputValue((prevState) => ({ ...prevState, value: '' }))
    } else if (e.target.id !== 'newTaskForm' && newValueTask) {
      const index = tasks.value.findIndex((task) => task.id === id)
      const taskWithNewValue = {
        ...tasks.value[index],
        value: newValueTask,
      }
      const newTaskList = [...tasks.value.slice(0, index), taskWithNewValue, ...tasks.value.slice(index + 1)]
      setTasks((prevState) => ({ ...prevState, value: newTaskList }))
      setInputValue((prevState) => ({ ...prevState, taskValue: '' }))
      editTask(() => ({
        edit: !isEditing.edit,
        targetId: '',
      }))
    }
  }

  const onCompleteTask = (id) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    const taskWithNewState = {
      ...tasks.value[index],
      isCompleted: !tasks.value[index].isCompleted,
    }
    const newTasksList = [...tasks.value.slice(0, index), taskWithNewState, ...tasks.value.slice(index + 1)]
    setTasks((prevState) => ({ ...prevState, value: newTasksList }))
  }

  const onTaskChange = (id) => {
    const index = tasks.value.findIndex((task) => task.id === id)
    setInputValue((prevState) => ({ ...prevState, taskValue: tasks.value[index].value }))
  }

  const onEditTask = (e, id, task) => {
    if (!isEditing.edit && !task.isCompleted) {
      editTask((prevState) => ({
        edit: !prevState.isEditing,
        targetId: e.target.id,
      }))
      onTaskChange(id)
    }
  }

  const activeTasks = tasks.value.filter((task) => !task.isCompleted).length

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm
          inputValue={input.value}
          minutes={time.minutesValue}
          seconds={time.secondsValue}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
        />
      </header>
      <section className="main">
        <TasksList
          tasks={tasks.value}
          inputTaskValue={input.taskValue}
          isSelected={isSelected.value}
          isEditing={isEditing.edit}
          targetId={isEditing.targetId}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onEditTask={onEditTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
        <Footer
          activeTasks={activeTasks}
          filters={filters}
          isSelected={isSelected.value}
          onDeleteCompleteTasks={onDeleteCompleteTasks}
          onFilterOnClick={onFilterOnClick}
        />
      </section>
    </section>
  )
}

export default App
