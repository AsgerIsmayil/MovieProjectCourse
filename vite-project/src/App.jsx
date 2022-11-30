import React from 'react';
import { Switch,
  Route, } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './App.css';
import './common.css';

class App extends React.Component {
  render() {
    return (
      <div className="app">
       <Switch>
       <Route exact path="/">
          <MainPage/>
        </Route>
        <Route  path="/list/:id">
          <ListPage/>
        </Route>
        
       </Switch>
     

       
       
       
      </div>
    );
  }
}

export default App;