import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

function Task(props) {
  const { task, onDeleteTask, onCompleteTask, toCheck, onEditTask } = props
  const setTimeCreatedAgo = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })

  Task.defaultProps = {
    task: {},
    onDeleteTask: () => {},
    onCompleteTask: () => {},
    onEditTask: () => {},
  }
  Task.propTypes = {
    task: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
    toCheck: PropTypes.string.isRequired,
    onDeleteTask: PropTypes.func,
    onCompleteTask: PropTypes.func,
    onEditTask: PropTypes.func,
  }

  const taskClass = () => {
    if (!task.isCompleted && toCheck === 'Completed') {
      return 'edit'
    } else if (task.isCompleted && toCheck === 'Active') {
      return 'edit'
    } else {
      return 'view'
    }
  }

  return (
    <div>
      <div className={taskClass()}>
        <input className="toggle" type="checkbox" onClick={() => onCompleteTask(task.id)} id={task.id} />
        <label htmlFor={task.id}>
          <span className="description">{task.value}</span>
          <span className="created">created {setTimeCreatedAgo(task.whenCreated)}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={(e) => onEditTask(e, task.id, task)} id={task.id} />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  )
}

export default Task
