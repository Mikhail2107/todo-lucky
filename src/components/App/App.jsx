import { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TasksList from '../TasksList'
import Footer from '../Footer'
import './App.css'

class App extends Component {
  filters = [
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

  state = {
    targetId: '',
    inputValue: '',
    hoursValue: '',
    minutesValue: '',
    secondsValue: '',
    inputTaskValue: '',
    isSelected: 'All',
    isEditing: false,
    tasks: [],
  }

  newId = 1

  onFilterOnClick = (e) => this.setState(() => ({ isSelected: e.target.textContent }))

  handleAddTask = (value) => {
    const minutes = +this.state.minutesValue
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
      id: this.newId++,
      isCompleted: false,
      whenCreated: new Date(),
      seconds: this.state.secondsValue,
      minutes: newMinutes,
      hours: newHours,
      toStart: false,
      toPause: false,
    }
    const newTasksList = [...this.state.tasks, newTask]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  handleDeleteTask = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    const newTasksList = [...this.state.tasks.slice(0, index), ...this.state.tasks.slice(index + 1)]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  handleDeleteCompleteTasks = () => {
    const notCompleteTasks = this.state.tasks.filter((task) => !task.isCompleted)
    this.setState((prevState) => ({ ...prevState, tasks: notCompleteTasks }))
  }

  handleInputChange = (e) => {
    if (e.target.id === 'newTaskFormInput') {
      this.setState({ inputValue: e.target.value })
    }
    if (e.target.id === 'min') {
      this.setState({ minutesValue: e.target.value })
    }
    if (e.target.id === 'sec') {
      this.setState({ secondsValue: e.target.value })
    }
    this.setState({ inputTaskValue: e.target.value })
  }

  handleSubmit = (e, id) => {
    e.preventDefault()
    const value = this.state.inputValue.trim()
    const newValueTask = this.state.inputTaskValue.trim()
    if (e.target.id === 'newTaskForm') {
      this.handleAddTask(value)
      this.setState((prevState) => ({
        ...prevState,
        inputValue: '',
        hoursValue: '',
        minutesValue: '',
        secondsValue: '',
      }))
    } else if (e.target.id !== 'newTaskForm' && newValueTask) {
      const index = this.state.tasks.findIndex((task) => task.id === id)
      const taskWithNewValue = {
        ...this.state.tasks[index],
        value: newValueTask,
      }
      const newTaskList = [...this.state.tasks.slice(0, index), taskWithNewValue, ...this.state.tasks.slice(index + 1)]
      this.setState((prevState) => ({
        ...prevState,
        tasks: newTaskList,
        inputTaskValue: '',
        targetId: '',
        isEditing: !prevState.isEditing,
      }))
    }
  }

  handleCompleteTask = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    const taskWithNewState = {
      ...this.state.tasks[index],
      isCompleted: !this.state.tasks[index].isCompleted,
    }
    const newTasksList = [...this.state.tasks.slice(0, index), taskWithNewState, ...this.state.tasks.slice(index + 1)]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  handleEditTask = (e, id, task) => {
    if (!this.state.isEditing && !task.isCompleted) {
      this.setState((prevState) => ({
        isEditing: !prevState.isEditing,
        targetId: e.target.id,
      }))
      this.handleTaskChange(id)
    }
  }

  handleTaskChange = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    this.setState((prevState) => ({ ...prevState, inputTaskValue: prevState.tasks[index].value }))
  }

  render() {
    const activeTasks = this.state.tasks.filter((task) => !task.isCompleted).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm
            inputValue={this.state.inputValue}
            minutes={this.state.minutesValue}
            seconds={this.state.secondsValue}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
          />
        </header>
        <section className="main">
          <TasksList
            tasks={this.state.tasks}
            inputTaskValue={this.state.inputTaskValue}
            isSelected={this.state.isSelected}
            isEditing={this.state.isEditing}
            targetId={this.state.targetId}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            handleEditTask={this.handleEditTask}
            handleCompleteTask={this.handleCompleteTask}
            handleDeleteTask={this.handleDeleteTask}
            handleClick={this.handleClickPlayPause}
          />
          <Footer
            activeTasks={activeTasks}
            filters={this.filters}
            isSelected={this.state.isSelected}
            handleDeleteCompleteTasks={this.handleDeleteCompleteTasks}
            handleFilterOnClick={this.handleFilterOnClick}
          />
        </section>
      </section>
    )
  }
}

export default App
