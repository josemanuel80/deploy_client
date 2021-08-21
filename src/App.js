import { Home } from './components/Home.js';
import { List } from './components/List.js';
import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/list" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
