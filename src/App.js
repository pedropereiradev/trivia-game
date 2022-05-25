import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Header from './pages/Header';
import Feedback from './pages/Feedback';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/header" component={ Header } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
