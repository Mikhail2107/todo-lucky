/* eslint-disable consistent-return */
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import './Task.css'

function Task(props) {
  const { task, isSelected, onDeleteTask, onCompleteTask, onEditTask } = props
  const [isPlayPaused, setPlayPaused] = useState({ isPlay: false, isPaused: false })
  const [time, setTimer] = useState({
    seconds: task.seconds,
    minutes: task.minutes,
    hours: task.hours,
    taskTime: null,
  })
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

  const setTaskTime = () => {
    const taskTime = task.hours * 3600 + task.minutes * 60 + +task.seconds
    setTimer((prevState) => ({ ...prevState, taskTime }))
  }

  useEffect(() => {
    setTaskTime()
  }, [])

  useEffect(() => {
    if (!isPlayPaused.isPlay) return
    const timer = setInterval(() => {
      if (time.taskTime === 0) {
        setPlayPaused((prevState) => ({ ...prevState, isPlay: false }))
        onCompleteTask(task.id)
        return clearInterval(timer)
      }
      if (isPlayPaused.isPaused) {
        return clearInterval(timer)
      }
      const newTaskTime = time.taskTime - 1
      const hours = Math.trunc(newTaskTime / 3600)
      const minutes = Math.trunc((newTaskTime % 3600) / 60)
      const seconds = Math.trunc((newTaskTime % 3600) % 60)
      setTimer((prevState) => ({
        ...prevState,
        seconds,
        minutes,
        hours,
        taskTime: newTaskTime,
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [time.hours, time.seconds, time.minutes, isPlayPaused])

  const onClickPlayPause = (e) => {
    if (e.target.id === 'play' && time.seconds === 0 && time.minutes === 0 && +time.hours === 0) {
      return
    }
    if (e.target.id === 'play' && !isPlayPaused.isPlay) {
      setPlayPaused((prevState) => ({ ...prevState, isPlay: !prevState.isPlay, isPaused: prevState.isPlay }))
    }
    if (e.target.id === 'pause' && !isPlayPaused.isPaused && isPlayPaused.isPlay) {
      setPlayPaused((prevState) => ({ ...prevState, isPlay: prevState.isPaused, isPaused: !prevState.isPaused }))
    }
  }

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
                className={isPlayPaused.isPlay ? 'icon icon-play active-play' : 'icon icon-play'}
                onClick={onClickPlayPause}
              />
              <button
                id="pause"
                type="button"
                className={isPlayPaused.isPaused ? 'icon icon-pause active-pause' : 'icon icon-pause'}
                onClick={onClickPlayPause}
              />
            </div>
            <div className="time-text">
              {!time.hours ? '00:' : time.hours < 10 ? `0${time.hours}:` : `${time.hours}:`}
              {time.minutes < 10 ? `0${time.minutes}` : time.minutes}:{formatSeconds(time.seconds)}
            </div>
          </div>
          <span className="created">created {setTimeCreatedAgo(task.whenCreated)}</span>
        </label>
        <button type="button" className="icon icon-edit" onClick={(e) => onEditTask(e, task.id, task)} id={task.id} />
        <button type="button" className="icon icon-destroy" onClick={() => onDeleteTask(task.id)} />
      </div>
    </div>
  )
}

export default Task
