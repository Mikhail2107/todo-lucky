import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm(props) {
  const { onSubmit, onInputChange, inputValue } = props

  NewTaskForm.defaultProps = {
    onSubmit: () => {},
    onInputChange: () => {},
    inputValue: '',
  }
  NewTaskForm.propTypes = {
    inputValue: PropTypes.string,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  return (
    <form onSubmit={onSubmit} id="newTaskForm">
      <input
        id="newTaskFormInput"
        onChange={onInputChange}
        value={inputValue}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  )
}

export default NewTaskForm
