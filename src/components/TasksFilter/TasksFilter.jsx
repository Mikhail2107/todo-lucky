import PropTypes from 'prop-types';
import './TasksFilter.css';

function TasksFilter(props) {
  const { onFilterOnClick, toCheck, filterValue } = props;

  TasksFilter.defaultProps = {
    filterValue: {},
    onFilterOnClick: () => {},
  };
  TasksFilter.propTypes = {
    filterValue: PropTypes.objectOf(PropTypes.string),
    onFilterOnClick: PropTypes.func,
    toCheck: PropTypes.string.isRequired,
  };
  return (
    <button type="button" onClick={onFilterOnClick} className={toCheck === filterValue.value ? 'selected' : ''}>
      {filterValue.value}
    </button>
  );
}

export default TasksFilter;
