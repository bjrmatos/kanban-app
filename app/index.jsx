
import 'array.prototype.findindex';
import './main.css';

import React from 'react';
import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

main();

function main() {
  const app = document.createElement('div');

  persist(alt, storage, 'app');

  document.body.appendChild(app);

  React.render(<App />, app);
}
