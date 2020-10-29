import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserApiService from '../utils/APIUsers.js';
import Button from 'react-bootstrap/Button';

class Login extends Component{

    constructor(props){
        super(props);
        
        let loggedIn = false;
        
        this.state ={

          id: 0,
          email: '',
          password: '',
          ruolo: '',
          loggedIn,

          message: null,
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
       


    }
   
    componentDidMount() {

        
      }
      validate(values) {

        let errors = {}
       
        if (!values.email) {
          errors.description = 'Enter an email'
        }
        if (!values.password) {
          errors.description = 'Enter a password'
        }
        if (values.password.length < 5) {
          errors.description = 'Enter at least 5 Characters in Password'
        }
    
        return errors
    
      }

      onSubmit(values) {

        let user = null;
        user = {
          email: values.email,
          password: values.password,

          
        }

          UserApiService.login(user)

          .then(response => {

            if(response != null) {
             this.setState({
                id: response.data.id,
                nome: response.data.nome,
                cognome: response.data.cognome,
                email: response.data.email,
                password: response.data.password,
                conto: response.data.conto,
                img: response.data.img,
                ruolo: response.data.ruolo,
                loggedIn: true,
                
          })
          //alert("STAMPO LO ID " + this.state.id);

          if(this.state.id > 0 && response.data.ruolo == false ){
            
            localStorage.setItem("token",JSON.stringify(response.data))
            //localStorage.setItem("token",JSON.stringify(response.data.ruolo))
            this.props.history.push({
              pathname: "/",
              //admin: response.data.ruolo,
              admin: response.data,
              loggedIn: true,
           
              
              
              
             
            })
           // alert("stampo Token utente "+ JSON.stringify(localStorage));
            return
          }

          if(this.state.id > 0 ){
            
            localStorage.setItem("token",JSON.stringify(response.data))
            this.props.history.push({
              pathname: "/",
              admin: response.data,
              loggedIn: true,
             
             
             
            })
           // alert("stampo Token admin "+ JSON.stringify(localStorage));
          }
        } 
      })

        
        console.log(values);
      }
      onChange = (e) =>
      this.setState({ [e.target.name]: e.target.value });

        render(){
            let {id, email, password,ruolo } = this.state
            return(
              <body>

                          <div>
                          
                          <div className="container">
                              <Formik
                                  initialValues={{ email, password }}
                                  onSubmit={this.onSubmit}
                                  validateOnChange={false}
                                  validateOnBlur={false}
                                  validate={this.validate}
                                  enableReinitialize={true}
                              >
                                  {
                                      (props) => (

                                
                                  <div id= "centroLogin" >
                                    <div col-sm-9 col-md-7 col-lg-5 mx-auto>
                                    <div card card-signin my-5>
                                        <div card-body>
                                        <div className="form-label-group">
                                        
                                         <h2 card-title text-center >Login</h2>
                                          <Form form-signin>
                                                                                     
                                              <fieldset className="form-group">
                                                    <Field type="email" id="inputEmail" class="form-control" name="email" placeholder="Email address" required autofocus/>
                                                    <label for="inputEmail">Email address</label>
                                                
                                              </fieldset>

                                              <fieldset className="form-group">
                                                    <Field type="password" id="inputPassword" class="form-control" name="password" placeholder="Password" required/>
                                                    <label for="inputPassword">Password</label>

                                              </fieldset>
                                               <div className="form-signin">
                                                                                         
                                                  <Button size= "lg" variant = "primary" block text-uppercase type="submit" id = "btLogin">Login</Button>
                                                  <Button  size= "lg"  block text-uppercase type="submit" id = "btn-google" ><i fab fa-google mr-2></i> Sign in with Google</Button>
                                                  <Button  size= "lg" block text-uppercase type="submit" id = "btn-facebook"><i fab fa-facebook-f mr-2></i> Sign in with Facebook</Button>
                                                </div>
                                          </Form>
                                          </div>
                                          </div>
                                        </div>
                                        </div>
                                    </div>
                              
                                      )
                                  }
                              </Formik>

                          </div>
                      </div>

                  </body>




            )

        }



}
export default Login