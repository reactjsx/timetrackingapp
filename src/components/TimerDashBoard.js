import React from 'react';
import uuid from 'uuid';
import helpers from '../js/helpers';
import EditableTimerList from './EditableTimerList';
import ToggleableTimerForm from './ToggleableTimerForm';

class TimerDashboard extends React.Component {
  state = {
    timers: [
      {
        title: 'Investigate Fast Loss',
        project: 'Mask RCNN',
        id: uuid.v4(),
        elapsed: 0,
        runningSince: null,
      },
      {
        title: 'Investigate RPN Loop',
        project: 'Mask RCNN',
        id: uuid.v4(),
        elapsed: 0,
        runningSince: null,
      },
    ],
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  };

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  };

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t)
    });
  };

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project
          });
        }
        return timer;
      })
    });
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId)
    });
  };

  startTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: Date.now()
          });
        }
        return timer;
      })
    });
  }

  stopTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        const lastElapsed = timer.elapsed + Date.now() - timer.runningSince;
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            elapsed: lastElapsed,
            runningSince: null
          });
        }
        return timer;
      })
    });
  }
  
  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
            isOpen
          />
        </div>
      </div>
    );
  }
}

export default TimerDashboard;