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
      toPause: false,
      toStart: false,
    }
    this.onClickPlayPause = this.onClickPlayPause.bind(this)
    this.onTimerStart = this.onTimerStart.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.toStart !== this.state.toStart) {
      this.onTimerStart()
    }
    if (prevState.toPause !== this.state.toPause) {
      clearInterval(this.timer)
    }

    if (
      prevState.seconds !== this.state.seconds &&
      this.state.hours === 0 &&
      this.state.seconds === 0 &&
      this.state.minutes === 0
    ) {
      this.props.onCompleteTask(this.state.id)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    if (this.state.toPause) {
      clearInterval(this.timer)
    }
  }

  onClickPlayPause = (e) => {
    if (e.target.id === 'play' && !this.state.toStart) {
      this.setState((prevState) => ({ ...prevState, toStart: !prevState.toStart, toPause: prevState.toStart }))
    }
    if (e.target.id === 'pause' && !this.state.toPause && this.state.toStart) {
      this.setState((prevState) => ({ ...prevState, toStart: prevState.toPause, toPause: !prevState.toPause }))
    }
  }

  onTimerStart() {
    this.timer = setInterval(() => {
      if (this.state.hours === 0 && this.state.seconds === 0 && this.state.minutes === 0) {
        clearInterval(this.timer)
        this.setState((prevState) => ({ ...prevState, toStart: false }))
        return
      }
      if (this.state.toPause) {
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
    const { task, onDeleteTask, onCompleteTask, isSelected, onEditTask } = this.props
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
            onChange={() => onCompleteTask(task.id)}
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
                  className={this.state.toStart ? 'icon icon-play active-play' : 'icon icon-play'}
                  onClick={this.onClickPlayPause}
                />
                <button
                  id="pause"
                  type="button"
                  className={this.state.toPause ? 'icon icon-pause active-pause' : 'icon icon-pause'}
                  onClick={this.onClickPlayPause}
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
            onClick={(e) => onEditTask(e, task.id, task)}
            id={task.id}
          />
          <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(task.id)} />
        </div>
      </div>
    )
  }
}

export default Task

Task.defaultProps = {
  task: {},
  onDeleteTask: () => {},
  onCompleteTask: () => {},
  onEditTask: () => {},
}

Task.propTypes = {
  task: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool, PropTypes.object]),
  isSelected: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func,
  onCompleteTask: PropTypes.func,
  onEditTask: PropTypes.func,
}
