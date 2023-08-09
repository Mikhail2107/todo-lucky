import './TasksList.css'
import PropTypes from 'prop-types'

import Task from '../Task'

function TasksList(props) {
  const {
    tasks,
    handleDeleteTask,
    isSelected,
    handleCompleteTask,
    handleSubmit,
    inputTaskValue,
    handleInputChange,
    handleEditTask,
    isEditing,
    targetId,
    handleClick,
  } = props

  TasksList.defaultProps = {
    tasks: [],
    inputTaskValue: '',
    handleInputChange: () => {},
    handleSubmit: () => {},
  }
  TasksList.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    isSelected: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object),
    handleSubmit: PropTypes.func,
    inputTaskValue: PropTypes.string,
    handleInputChange: PropTypes.func,
  }

  const taskClass = (task) => {
    if (task.isCompleted) {
      return 'completed'
    } else if (task.id === Number(targetId) && isEditing && !task.isCompleted && isSelected !== 'Completed') {
      return 'editing'
    } else {
      return ''
    }
  }

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li className={taskClass(task)} key={task.id}>
          <Task
            isEditing={isEditing}
            isSelected={isSelected}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleCompleteTask={handleCompleteTask}
            handleEditTask={handleEditTask}
            handleClick={handleClick}
          />
          <form onSubmit={(e) => handleSubmit(e, task.id)}>
            {isEditing ? (
              <input
                autoFocus={true}
                type="text"
                className="edit"
                value={inputTaskValue}
                onChange={handleInputChange}
              />
            ) : (
              ''
            )}
          </form>
        </li>
      ))}
    </ul>
  )
}

export default TasksList
