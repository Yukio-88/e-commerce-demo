import React, { Component } from 'react'
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
    UncontrolledCarousel  
 } from "reactstrap";
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

const carouselItems = [
    {
      src:"./assets/img/moog.jpg" ,
      
      altText: "Slide 1",
      caption: ""
    },
    {
      src:"./assets/img/moog2.jpg",
      altText: "Slide 2",
      caption: ""
    },
    {
      src:"./assets/img/moog3.jpg",
      altText: "Slide 3",
      caption: ""
    }
  ];
  

     
 



export class HomePage extends Component {

    constructor(props){
        super(props);

        const token = localStorage.getItem("token")
        this.token = JSON.parse(token)
        
        
        let loggedIn= true
        if(token==null){
            loggedIn=false
    
        }
        
        this.state ={
            nome: '',
            cognome: '',
            email: '',
            password: '',
            message: null,
            users: [],
            products: [],
            loggedIn
        }
        var category = '';
        this.filterProduct = this.filterProduct.bind(this)
        this.buyProductClicked = this.buyProductClicked.bind(this)
    
      }
    
    
      filterProduct(n){
    
        if ( n == 1 ){
    
            this.category = '';
        } 
    
        if ( n == 2 ){
    
            this.category = '';
        } 
    
        if ( n == 3 ){
    
            this.category = '';
        } 
    
        if ( n == 4 ){
    
            this.category = '';
        } 
    
        ProductApiService.fetchProductsByCategory(this.category)
    
        .then(res => {
        
            this.setState({products : res.data},);
    
           
    
        });
    
    
      }
      buyProductClicked(productId){
          
        ProductApiService.fetchProductById(productId) 
       
        .then(res => {

            //this.props.history.push('/Details', { res : productId });this.props.history.push('/my-path', { myParam: paramToPass });
            this.props.history.push({
                pathname: "/Details",
                prodotto :  res.data

            })
        })
            


      }
     
    componentDidMount(){

        ProductApiService.checkListProduct()

        .then(res => {
        
            this.setState({products : res.data},);
    
        });

        /*
            if(this.state.loggedIn === false){
                return (<Redirect to="/"/>)
            }
        */
    }

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });
    
    render() {

        return (
            <div>

            <Row id = "carosello"xs="1">
                <Col className="col-md-8 ">      
                    <Row>
                        <>{/*carosello*/}
                        <UncontrolledCarousel    items={carouselItems }  />
                        </>
                    </Row>
                </Col>
           </Row>
    
          <div className="col-md-12">{/*div contenente menu e card*/}
  
            
  
                  <div className="col-md-12">
                      <Row>
                          
                              <div className="MenuItem col-md-2"> {/*div menu*/}
                                  <Container >{/*apro container delle colonne*/}
                                      <Row xs="1">
  
                                              <Col id="dropMenu">{/*colonna contenente il menu*/}
                                                  <h5 class="my-6">SYNTH</h5>
                                                  <div class="list-group">{/*apro div list-group*/}
                                                      <a href="#" class="list-group-item">
                                                          <UncontrolledDropdown nav>
                                                              <DropdownToggle caret color="default" nav>
                                                                 Moog
                                                              </DropdownToggle>
                                                              <DropdownMenu className="dropdown-with-icons">
                                                                  <DropdownItem href="">
                                                                      Story
                                                                  </DropdownItem>
                                                                  <DropdownItem>
                                                                  Presentation Page
                                                                  </DropdownItem>
                                                                  <DropdownItem  onClick={() => this.filterProducts(1)}>
                                                                  Visualizza Synth
                                                                  </DropdownItem>                                             
                                                              </DropdownMenu>
                                                          </UncontrolledDropdown>
                                                      </a>
                                                      <a href="#" class="list-group-item">
                                                          <UncontrolledDropdown nav>
                                                              <DropdownToggle caret color="default" nav>
                                                                  Korg
                                                              </DropdownToggle>
                                                              <DropdownMenu className="dropdown-with-icons">
                                                                  <DropdownItem>
                                                                      Story
                                                                  </DropdownItem>
                                                                  <DropdownItem>
                                                                      Presentation Page
                                                                  </DropdownItem>
                                                                  <DropdownItem  onClick={() => this.filterProducts(2)}>
                                                                  Visualizza Synth
                                                                  </DropdownItem> 
                                                                                                          
                                                              </DropdownMenu>
                                                          </UncontrolledDropdown>
                                                      </a>
                                                      <a href="#" class="list-group-item">
                                                          <UncontrolledDropdown nav>
                                                              <DropdownToggle caret color="default" nav>
                                                                  Access
                                                              </DropdownToggle>
                                                              <DropdownMenu className="dropdown-with-icons">
                                                                  <DropdownItem href="">
                                                                      Story
                                                                  </DropdownItem>
                                                                  <DropdownItem>
                                                                  Presentation Page
                                                                  </DropdownItem>
                                                                  <DropdownItem  onClick={() => this.filterProducts(3)}>
                                                                  Visualizza Synth
                                                                  </DropdownItem>                                
                                                              </DropdownMenu>
                                                          </UncontrolledDropdown>
                                                      </a>
                                                      <a href="#" class="list-group-item">
                                                          <UncontrolledDropdown nav>
                                                              <DropdownToggle caret color="default" nav>
                                                                  Clavia Nord
                                                              </DropdownToggle>
                                                              <DropdownMenu className="dropdown-with-icons">
                                                                  <DropdownItem>
                                                                      Story
                                                                  </DropdownItem>
                                                                  <DropdownItem>
                                                                  Presentation Page
                                                                  </DropdownItem>
                                                                  <DropdownItem  onClick={() => this.filterProducts(4)}>
                                                                  Visualizza Synth
                                                                  </DropdownItem>                                      
                                                              </DropdownMenu>
                                                          </UncontrolledDropdown>
                                                      </a>
                                                      
                                                  </div>{/*chiudo div list-group*/}
  
                                              </Col>{/* chiudo colonna contenente il menu*/}
  
                                             
  
                                      </Row>{/* chiudo colonne row */}
  
                                  </Container>{/*chiudo container del dropMenu*/}
                          
                              </div>{/* chiudo div MenuItem */}
                          
                          
                          
                              <div className="col-md-10">
                                  <Container className="MenuItem col-md-10">{/*apro container delle card */}
                                      <Row id="carte-prodotti" xs="3">
  
                      
                                          { 
                                              this.state.products.map( product =>
                                              <Row xs="1">  
                                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;         
                                                  <Col>{/*colonna card*/}
                                                      <Card className="text-center"  style={{width: '20rem'}}>
                                                      <CardImg  height='250px' top src={product.img} alt={product.nome}/>
                                                          <CardBody>
                                                              <CardTitle id="ProvaLogin"><h2>{product.nome}</h2></CardTitle>
                                                              <CardText>{product.prezzo}$</CardText>
                                                              <CardText>Available: {product.quantita}</CardText>
                                                              <Button color="primary" onClick={() => this.buyProductClicked(product.id)}>Buy Item</Button>
                                                            
                                                          </CardBody>
                                                      </Card>
                                                  </Col>{/*chiudo card*/}
                                              </Row>                                                                                                         
                                              ) //chiudo this state product
                                          }
                                                              
                                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                      </Row>{/*chiudo row delle card*/} 
                              </Container>{/*chiudo container delle card*/}
                          </div>
                          
                      </Row>
                  </div>                     
              </div> {/* chiudo div contenente carosello e card*/}
             
         
  
        
           
          </div>   
                               

                 

          
 
            
        )
    }
}

export default HomePage
