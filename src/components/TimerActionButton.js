import React from 'react';

const TimerActionButton = (props) => {
  if (props.timerIsRunning) {
     return (
      <div
        className='ui bottom attached red basic button'
        role='button'
        onClick={props.onStopClick}
      >
        Stop
      </div>
    );
  }
  return (
    <div
      className='ui bottom attached green basic button'
      role='button'
      onClick={props.onStartClick}
    >
      Start
    </div>
  );
};

export default TimerActionButton;