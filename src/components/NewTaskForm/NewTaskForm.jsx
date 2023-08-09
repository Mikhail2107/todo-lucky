import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm(props) {
  const { handleSubmit, handleInputChange, inputValue, minutes, seconds } = props

  NewTaskForm.defaultProps = {
    handleSubmit: () => {},
    handleInputChange: () => {},
    inputValue: '',
  }
  NewTaskForm.propTypes = {
    inputValue: PropTypes.string,
    handleInputChange: PropTypes.func,
    handleSubmit: PropTypes.func,
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit} id="newTaskForm">
      <input
        id="newTaskFormInput"
        onChange={handleInputChange}
        value={inputValue}
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus={true}
        required={true}
      />
      <input
        id="min"
        onChange={handleInputChange}
        value={minutes}
        type="number"
        min="0"
        className="new-todo-form__timer"
        placeholder="Min"
        required={true}
      />
      <input
        id="sec"
        onChange={handleInputChange}
        value={seconds}
        type="number"
        min="0"
        max="60"
        className="new-todo-form__timer"
        placeholder="Sec"
        required={true}
      />
      <button type="submit" onSubmit={handleSubmit} />
    </form>
  )
}

export default NewTaskForm
