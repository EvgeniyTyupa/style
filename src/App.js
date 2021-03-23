import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Thankyou from './Components/Thankyou/Thankyou';
import Main from './Pages/Main/Main';

const App = (props) => {
  return(
    <div className='main'>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={()=><Main/>}/>
          <Route path="/signup" render={()=><Main/>}/>
          <Route path="/thankyou" render={()=><Main/>}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
