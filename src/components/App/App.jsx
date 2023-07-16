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
    inputTaskValue: '',
    toCheck: 'All',
    toEdit: false,
    tasks: [],
  }

  newId = 1

  onFilterOnClick = (e) => this.setState(() => ({ toCheck: e.target.textContent }))

  onAddTask = (value) => {
    const newTask = {
      value,
      id: this.newId++,
      isCompleted: false,
      whenCreated: new Date(),
    }
    const newTasksList = [...this.state.tasks, newTask]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  onDeleteTask = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    const newTasksList = [...this.state.tasks.slice(0, index), ...this.state.tasks.slice(index + 1)]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  onDeleteCompleteTasks = () => {
    const notCompleteTasks = this.state.tasks.filter((task) => !task.isCompleted)
    this.setState((prevState) => ({ ...prevState, tasks: notCompleteTasks }))
  }

  onInputChange = (e) => {
    if (e.target.id === 'newTaskFormInput') {
      return this.setState({ inputValue: e.target.value })
    }
    return this.setState({ inputTaskValue: e.target.value })
  }

  onSubmit = (e, id) => {
    e.preventDefault()
    const value = this.state.inputValue.trim()
    const newValueTask = this.state.inputTaskValue.trim()
    if (e.target.id === 'newTaskForm' && value) {
      this.onAddTask(value)
      this.setState(() => ({ inputValue: '' }))
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
        toEdit: !prevState.toEdit,
      }))
    }
  }

  onCompleteTask = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    const taskWithNewState = {
      ...this.state.tasks[index],
      isCompleted: !this.state.tasks[index].isCompleted,
    }
    const newTasksList = [...this.state.tasks.slice(0, index), taskWithNewState, ...this.state.tasks.slice(index + 1)]
    this.setState((prevState) => ({ ...prevState, tasks: newTasksList }))
  }

  onEditTask = (e, id, task) => {
    if (!this.state.toEdit && !task.isCompleted) {
      this.setState((prevState) => ({
        toEdit: !prevState.toEdit,
        targetId: e.target.id,
      }))
      this.onTaskChange(id)
    }
  }

  onTaskChange = (id) => {
    const index = this.state.tasks.findIndex((task) => task.id === id)
    this.setState((prevState) => ({ ...prevState, inputTaskValue: prevState.tasks[index].value }))
  }

  render() {
    const activeTasks = this.state.tasks.filter((task) => !task.isCompleted).length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm inputValue={this.state.inputValue} onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
        </header>
        <section className="main">
          <TasksList
            tasks={this.state.tasks}
            inputTaskValue={this.state.inputTaskValue}
            toCheck={this.state.toCheck}
            toEdit={this.state.toEdit}
            targetId={this.state.targetId}
            onInputChange={this.onInputChange}
            onSubmit={this.onSubmit}
            onEditTask={this.onEditTask}
            onCompleteTask={this.onCompleteTask}
            onDeleteTask={this.onDeleteTask}
          />
          <Footer
            activeTasks={activeTasks}
            filters={this.filters}
            toCheck={this.state.toCheck}
            onDeleteCompleteTasks={this.onDeleteCompleteTasks}
            onFilterOnClick={this.onFilterOnClick}
          />
        </section>
      </section>
    )
  }
}

export default App
