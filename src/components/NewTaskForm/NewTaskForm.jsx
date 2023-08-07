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
      <input id="min"
            className="new-todo-form__timer" 
            type="text" 
            autoFocus 
            placeholder="MIN" />
      <input id="sec"
            className="new-todo-form__timer" 
            type="text" 
            autoFocus 
            placeholder="SEC" />
    </form>
  )
}

export default NewTaskForm
