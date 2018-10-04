import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Game from './components/game';

ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
registerServiceWorker();
