import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Home';
import "./index.css";

const AppRoot: any = () => (
  <main>
    <Home />
  </main>
);

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(<AppRoot />, rootEl);
}

render();
