import React, { Component } from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import RouterComponent from './component/RouterComponent.jsx';
import NavBar from './component/NavBar.jsx';
import Copyright from './component/Copyright.jsx';




class App extends Component {

  render() {
    return (

      <div className="flex">
          
          <body>

         <NavBar/>
          
          <div id="pagina" className="container-fluid well">
            <RouterComponent/>

            <div id="footer">   
              <Copyright/>
            </div>
          </div>

          </body>

      </div>
    );
  }
 
}

export default App;
