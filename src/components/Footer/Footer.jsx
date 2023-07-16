import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

function Footer(props) {
  const { filters, toCheck, onFilterOnClick, activeTasks, onDeleteCompleteTasks } = props

  Footer.defaultProps = {
    filters: [],
    onDeleteCompleteTasks: () => {},
  }
  Footer.propTypes = {
    filters: PropTypes.arrayOf(PropTypes.object),
    onDeleteCompleteTasks: PropTypes.func,
  }

  return (
    <footer className="footer">
      <span className="todo-count">{activeTasks} items left</span>
      <ul className="filters">
        {filters.map((filter) => {
          const { id, ...filterValue } = filter
          return (
            <li key={id}>
              <TasksFilter onFilterOnClick={onFilterOnClick} filterValue={filterValue} toCheck={toCheck} />
            </li>
          )
        })}
      </ul>
      <button type="button" className="clear-completed" onClick={onDeleteCompleteTasks}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
