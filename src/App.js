
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  state ={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
       <Navbar/>
       <LoadingBar 
       color='#f11946'
       progress={this.state.progress}/>
       <Switch>
       <Route  exact strict path="/business"><News   setProgress={this.setProgress} apiKey={this.apikey} key="business" pageSize={9} country="us" category="business"/> </Route>
       <Route  exact strict path="/"><News   setProgress={this.setProgress} apiKey={this.apikey} key="general"   pageSize={9} country="us" category="general"/> </Route>
       <Route  exact strict path="/entertainment"><News   setProgress={this.setProgress} apiKey={this.apikey} key="entertainment"   pageSize={9} country="us" category="entertainment"/> </Route>
       <Route  exact strict path="/health"><News   setProgress={this.setProgress} apiKey={this.apikey} key="health"   pageSize={6} country="us" category="health"/> </Route>
       <Route  exact strict path="/science"><News   setProgress={this.setProgress} apiKey={this.apikey} key="science"  pageSize={9} country="us" category="science"/> </Route>
       <Route  exact strict path="/sport"><News   setProgress={this.setProgress} apiKey={this.apikey} key="sport"   pageSize={9} country="us" category="sport"/> </Route>
       <Route  exact strict path="/technology"><News   setProgress={this.setProgress} apiKey={this.apikey} key="technology"   pageSize={9} country="us" category="technology"/> </Route>
       </Switch>
        </Router>
      </div>
    )
  }
}




