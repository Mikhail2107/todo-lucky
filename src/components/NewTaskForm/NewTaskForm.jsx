import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm(props) {
  const { onSubmit, onInputChange, inputValue, minutes, seconds } = props

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
    <form className="new-todo-form" onSubmit={onSubmit} id="newTaskForm">
      <input
        id="newTaskFormInput"
        onChange={onInputChange}
        value={inputValue}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        required={true}
      />
      <input
        id="min"
        onChange={onInputChange}
        value={minutes}
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Min"
        required={true}
      />
      <input
        id="sec"
        onChange={onInputChange}
        value={seconds}
        type="number"
        min="0"
        max="60"
        className="new-todo-form__timer"
        placeholder="Sec"
        required={true}
      />
      <button type="submit" onSubmit={onSubmit} />
    </form>
  )
}

export default NewTaskForm
