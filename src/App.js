import React from 'react';
import TimerDashBoard from './components/TimerDashBoard';
import './App.css';

const App = () => (
  <div id="main" className="main ui">
    <h1 className="ui dividing centered header">Timers</h1>
    <TimerDashBoard />
  </div>
);


export default App;
