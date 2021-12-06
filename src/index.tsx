import React from 'react';
import ReactDOM from 'react-dom';

const AppRoot: any = () => (
  <main>
    <div>
      "Hello"
    </div>
  </main>
);

const rootEl = document.getElementById('root');

const render = () => {
  ReactDOM.render(<AppRoot />, rootEl);
}

render();
