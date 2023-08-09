import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

class Task extends Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      id: props.task.id,
      hours: +props.task.hours,
      minutes: +props.task.minutes,
      seconds: +props.task.seconds,
      isPaused: false,
      isPlay: false,
    }
    this.handleClickPlayPause = this.handleClickPlayPause.bind(this)
    this.handleTimerPlay = this.handleTimerPlay.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlay !== this.state.isPlay) {
      this.handleTimerPlay()
    }
    if (prevState.isPaused !== this.state.isPaused) {
      clearInterval(this.timer)
    }

    if (
      prevState.seconds !== this.state.seconds &&
      this.state.hours === 0 &&
      this.state.seconds === 0 &&
      this.state.minutes === 0
    ) {
      this.props.handleCompleteTask(this.state.id)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    if (this.state.isPaused) {
      clearInterval(this.timer)
    }
  }

  handleClickPlayPause = (e) => {
    if (e.target.id === 'play' && !this.state.isPlay) {
      this.setState((prevState) => ({ ...prevState, isPlay: !prevState.isPlay, isPaused: prevState.isPlay }))
    }
    if (e.target.id === 'pause' && !this.state.isPaused && this.state.isPlay) {
      this.setState((prevState) => ({ ...prevState, isPlay: prevState.isPaused, isPaused: !prevState.isPaused }))
    }
  }

  handleTimerPlay() {
    this.timer = setInterval(() => {
      if (this.state.hours === 0 && this.state.seconds === 0 && this.state.minutes === 0) {
        clearInterval(this.timer)
        this.setState((prevState) => ({ ...prevState, isPlay: false }))
        return
      }
      if (this.state.isPaused) {
        clearInterval(this.timer)
        return
      }
      if (this.state.seconds !== 0) {
        this.setState((prevState) => ({ ...prevState, seconds: prevState.seconds - 1 }))
      } else {
        this.setState((prevState) => ({ ...prevState, seconds: 59 }))
      }
      if (this.state.minutes && this.state.seconds === 0) {
        this.setState((prevState) => ({ ...prevState, minutes: prevState.minutes - 1 }))
      }
      if (this.state.hours && this.state.minutes === 0 && this.state.seconds === 0) {
        this.setState((prevState) => ({ ...prevState, hours: prevState.hours - 1, minutes: 59 }))
      }
    }, 1000)
  }

  render() {
    const { task, handleDeleteTask, handleCompleteTask, isSelected, handleEditTask } = this.props
    const { hours, minutes, seconds } = this.state
    const setTimeCreatedAgo = (date) => formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })
    const taskClass = () => {
      if (!task.isCompleted && isSelected === 'Completed') {
        return 'edit'
      } else if (task.isCompleted && isSelected === 'Active') {
        return 'edit'
      } else {
        return 'view'
      }
    }
    const formatSeconds = (sec) => {
      if (sec && sec < 10) {
        return `0${sec}`
      }
      if (!+sec) {
        return String(sec).replace(/^0+/g, '00')
      }
      return String(sec).replace(/^0+/g, '')
    }

    return (
      <div>
        <div className={taskClass()}>
          <input
            className="toggle"
            type="checkbox"
            onChange={() => handleCompleteTask(task.id)}
            id={task.id}
            checked={task.isCompleted}
          />
          <label htmlFor={task.id}>
            <span className="description">{task.value}</span>
            <div className="container-timer">
              <div className="container-timer-buttons">
                <button
                  id="play"
                  type="button"
                  className={this.state.isPlay ? 'icon icon-play active-play' : 'icon icon-play'}
                  onClick={this.handleClickPlayPause}
                />
                <button
                  id="pause"
                  type="button"
                  className={this.state.isPaused ? 'icon icon-pause active-pause' : 'icon icon-pause'}
                  onClick={this.handleClickPlayPause}
                />
              </div>
              <div className="time-text">
                {!hours ? '00:' : hours < 10 ? `0${hours}:` : `${hours}:`}
                {minutes < 10 ? `0${minutes}` : minutes}:{formatSeconds(seconds)}
              </div>
            </div>
            <span className="created">created {setTimeCreatedAgo(task.whenCreated)}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={(e) => handleEditTask(e, task.id, task)}
            id={task.id}
          />
          <button type="button" className="icon icon-destroy" onClick={() => handleDeleteTask(task.id)} />
        </div>
      </div>
    )
  }
}

export default Task

Task.defaultProps = {
  task: {},
  handleDeleteTask: () => {},
  handleCompleteTask: () => {},
  handleEditTask: () => {},
}

Task.propTypes = {
  task: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
  isSelected: PropTypes.string.isRequired,
  handleDeleteTask: PropTypes.func,
  handleCompleteTask: PropTypes.func,
  handleEditTask: PropTypes.func,
}
