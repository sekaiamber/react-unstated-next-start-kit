import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './layout/main';
import Header from './layout/header';
import Index from './components/index';
import Todo from './components/todo';
import Store from './models';

function MyRouter(props) {
  return (
    <Router {...props}>
      <Store>
        <div id="app">
          <Header />
          <Main>
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/todo" exact component={Todo} />
            </Switch>
          </Main>
        </div>
      </Store>
    </Router>
  );
}

export default MyRouter;
