import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
// import Test from './components/Test';
import User from './components/User';
import Pokemon from './components/Pokemon';
// import Game1 from './components/Game1';
import Game1 from './components/Game1';
import Login from './components/Login';
import Signup from './components/Signup';


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route path='/test' component={Test} /> */}
          <Route path='/user/:username' component={User} />
          <Route path='/pokemon' component={Pokemon} />
          <Route path='/game' component={Game1} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
