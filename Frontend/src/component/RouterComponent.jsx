import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import HomePage from "./HomePage.jsx";
import AddUser from "./AddUser.jsx";
import Tablesite from "./Tablesite.jsx";
import Login from "./Login.jsx";
import AddProduct from "./AddProduct.jsx";
import Carrello from "./Carrello.jsx";
import Details from "./Details.jsx";
/*

import AcquistaProdotto from "./AcquistaProdotto.jsx"*/

import React from "react";


const AppRouter = () => {

  
   
    return(
        <div>

            <Router>

                <div>
                
                    <Switch>
                        
                        <Route path="/" exact component={HomePage} />
                        <Route path="/add-user/:id" component={AddUser} />
                        <Route path="/Tablesite" component={Tablesite} />
                        <Route path="/Login" exact component={Login} />
                        <Route path="/add-product/:id" component={AddProduct} />
                        <Route path="/Carrello" component={Carrello} />
                        <Route path="/Details" component={Details} />
                      {
                      /* 
                                              
                        <Route path="/AcquistaProdotto" component={AcquistaProdotto} /> */}
                       
                       
                       
                    </Switch>
                </div>
            </Router>
        </div>
    )
}


export default AppRouter;
