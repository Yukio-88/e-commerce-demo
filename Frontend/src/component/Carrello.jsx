import React, { Component } from 'react';
import ProductApiService from '../utils/APIProducts.js';


import {
    Button,  
    Container, Row, 
    Col, Card, CardImg, 
    CardBody, 
    CardTitle, CardText,
    UncontrolledDropdown,
    DropdownToggle, DropdownMenu,
    DropdownItem,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    UncontrolledCarousels
     
    } from 'reactstrap';
    class Carrello extends Component{
        constructor(props){
            super(props);

            const cartItem = localStorage.getItem("cartItems")
            this.cartItem = JSON.parse(cartItem)

            //alert("stampo la robbaa " + JSON.stringify(cartItem))

            this.state ={
                products: [],
                prodotto:this.props.location.prodotto
               

                
                
                
            }

           
            this.state.products = this.cartItem;

            //alert("stampo cose " + JSON.stringify(this.state.products));
        
          }

        componentDidMount(){

            ProductApiService.fetchProducts()

        .then(res => {
            
            this.setState({products : res.data},);
             
        });
            


        }

        

        
        
      

        onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

        
        render(){
        

            return(
                <body>
                    
                    

                    <section class="jumbotron text-center">
                        <div class="container">
                            <h1 class="jumbotron-heading"> CART</h1>
                        </div>
                    </section>

                    <div class="container mb-4">
                        <div class="row">
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col"> </th>
                                                <th scope="col">Product</th>
                                                <th scope="col" class="text-right">Price</th>
                                                <th scope="col">Category</th>
                                                <th scope="col" class="text-center">Quantity</th>
                                                <th scope="col" class="text-right">Description</th>
                                                <th> </th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        { 
                                              this.state.products.map( product =>
                                              <Row xs="1">  
                                               <td><img width='350px' height='350px' src={this.state.prodotto.img}></img></td>
                                                <td>{this.state.prodotto.nome}</td>
                                                <td>{this.state.prodotto.prezzo}</td>
                                                <td>{this.state.prodotto.categoria}</td>
                                                <td>{this.state.prodotto.quantita}</td>
                                                
                                                <td>{this.state.prodotto.descrizione}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() => this.deleteProductClicked(this.state.prodotto.id)}> Delete</button>
                                                
                                                </td>
                                              
                                              </Row>                                                                                                         
                                              ) //chiudo this state product
                                          }        
                                                
                                        
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col mb-2">
                                <div class="row">
                                    <div class="col-sm-12  col-md-6">
                                        <Button href="/" class="btn  btn-light" size="lg" block>Continue Shopping</Button>
                                    </div>
                                    <div class="col-sm-12 col-md-6 text-right">
                                        <button className="btn btn-lg btn-block btn-success text-uppercase">Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                   
                   

                </body>

            )

        }

    }

    export default Carrello;