import React, { Component } from 'react'
import $ from 'jquery';

import { Image } from 'react-bootstrap';

import{Button,  Badge,

    DropdownToggle, DropdownMenu,
    DropdownItem,
    UncontrolledButtonDropdown,
    UncontrolledDropdown,
   
  
    
    } from 'reactstrap';


export class NavBar extends Component {

    constructor(props){
        super(props);   
        const token = localStorage.getItem("token")
        this.token = JSON.parse(token)
      
        //alert("stampo token constructor " + this.token)

        this.logoutClicked = this.logoutClicked.bind(this)
    
      }
    
      logoutClicked() {

        //alert("SIAMO NEL LOGOUT")

        if(this.token != null){
            
            localStorage.removeItem("token")
            
        }
                    
         
        }  

    componentDidMount(){

        //qui nel component creo le varie jquery dei pulsanti visibili solo al login,variano i pulsanti visibili in base al ruolo
        
        $("#adminButton").hide();
        $("#adminTable").hide();
        $("#adminFace").hide();
        $("#userFace").hide();
        $("#logoAdmin").hide();
        if(this.token != null){
        if(this.token['nome'] == "admin" ){

            $("#adminButton").show();
            $("#adminTable").show();
            $("#adminFace").show();
            $("#logoAdmin").show();
            

        }
    }
    
        if(this.token == null){
           
            $("#logoutButton").hide();
            $("#userFace").hide();

        }
        if(this.token != null){
        if(this.token['nome'] != "admin" ){
           
            
            $("#userFace").show();

        }
    }
       

    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark  fixed-top" >
                        <div className="container">
                        <a className="navbar-brand" href="#">Ecommerce</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a id="home" className="nav-link" href="/">Home
                                <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Contact</a>
                            </li>
                            <li className="nav-item">
                            <Button href="/add-user/-1" color="primary" >Sign Up</Button>
                            </li>
                            <li id="adminButton"className="nav-item">
                            <Button color="primary" href="/add-product/-1">Add Product</Button>
                            </li>
                            <li id="adminTable"className="nav-item">
                            <Button color="primary" href="/Tablesite">Table</Button>
                            </li>
                            <li className="nav-item">
                            <Button href="/Login/" color="primary" >Login</Button>
                            </li>
                            <li className="nav-item">
                            <Button id="logoutButton" color="primary" onClick={this.logoutClicked} href="/">Logout</Button>
                            </li>
                            <li className="nav-item">
                            <Button href="/Carrello/" color="primary" >Cart</Button>
                            </li>
                            <li>
                            <Image id="logoAdmin" src="./assets/img/moogLogo2.png" className="img-responsive"  roundedCircle/>
                            </li>

                            <li className="nav-item"id ="adminFace"  >
                            <UncontrolledDropdown  nav>
                            
                                 <DropdownToggle caret color="default" nav>
                                     Admin
                                </DropdownToggle>
                                    <DropdownMenu className="dropdown-with-icons">
                                        <DropdownItem href="">
                                            Story
                                        </DropdownItem>
                                                                                                              
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>
                            <li className="nav-item" id="userFace">
                            <UncontrolledDropdown nav>
                                 <DropdownToggle caret color="default" nav>
                                        User
                                </DropdownToggle>
                                    <DropdownMenu className="dropdown-with-icons">
                                        <DropdownItem href="">
                                            Story
                                        </DropdownItem>
                                                                                                              
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </li>


                            </ul>
                        </div>
                        </div>
                    </nav>
                
            </div>
        )
    }
}

export default NavBar
