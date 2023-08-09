import './TasksList.css'
import PropTypes from 'prop-types'

import Task from '../Task'

function TasksList(props) {
  const {
    tasks,
    onDeleteTask,
    isSelected,
    onCompleteTask,
    onSubmit,
    inputTaskValue,
    onInputChange,
    onEditTask,
    isEditing,
    targetId,
    onClick,
  } = props

  TasksList.defaultProps = {
    tasks: [],
    inputTaskValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
  }
  TasksList.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    isSelected: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func,
    inputTaskValue: PropTypes.string,
    onInputChange: PropTypes.func,
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
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
            onClick={onClick}
          />
          <form onSubmit={(e) => onSubmit(e, task.id)}>
            {isEditing ? (
              <input autoFocus={true} type="text" className="edit" value={inputTaskValue} onChange={onInputChange} />
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
