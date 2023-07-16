import './TasksList.css'
import PropTypes from 'prop-types'

import Task from '../Task'

function TasksList(props) {
  const {
    tasks,
    onDeleteTask,
    toCheck,
    onCompleteTask,
    onSubmit,
    inputTaskValue,
    onInputChange,
    onEditTask,
    toEdit,
    targetId,
  } = props

  TasksList.defaultProps = {
    tasks: [],
    inputTaskValue: '',
    onInputChange: () => {},
    onSubmit: () => {},
  }
  TasksList.propTypes = {
    toEdit: PropTypes.bool.isRequired,
    toCheck: PropTypes.string.isRequired,
    targetId: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func,
    inputTaskValue: PropTypes.string,
    onInputChange: PropTypes.func,
  }

  const taskClass = (task) => {
    if (task.isCompleted) {
      return 'completed'
    } else if (task.id === Number(targetId) && toEdit && !task.isCompleted && toCheck !== 'Completed') {
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
            toEdit={toEdit}
            toCheck={toCheck}
            task={task}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
          />
          <form onSubmit={(e) => onSubmit(e, task.id)}>
            {toEdit ? (
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
