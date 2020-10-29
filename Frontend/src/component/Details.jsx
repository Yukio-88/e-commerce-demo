import React, { Component } from 'react'
import ProductApiService from '../utils/APIProducts.js';

import { 
    Button,
    ButtonGroup,
    Table,  
    
    UncontrolledTooltip 
 } from "reactstrap";

export class Details extends Component {

    constructor(props){
        super(props);

        
        


        this.state ={ 

            id: this.props.match.params.id,
            nome: '',
            prezzo: '',
            categoria:'',
            descrizione:'',
            disponibile: true,
            quantita: 0,
            img: '',
            img2:'',
            message: null,
            prodotto:this.props.location.prodotto,//qui facciamo la funzione per salvare il prodotto per utilizzarlo nella cart
            prodottox: null,
            products: [],
            
            
        }

        this.deleteProductClicked = this.deleteProductClicked.bind(this)
        this.addCartClicked = this.addCartClicked.bind(this)
    
      }
      
      
      componentDidMount() {

        ProductApiService.fetchProductById(this.state.id)

        .then(response => this.setState({
            nome: response.data.nome,
            prezzo: response.data.prezzo,
            quantita: response.data.quantita,
            categoria: response.data.categoria,
            disponibile: response.data.disponibile,
            descrizione: response.data.descrizione,
            img: response.data.img 
        }))
       
       
       
          
           
      }

 

      deleteProductClicked(productId) {
        ProductApiService.deleteProduct(productId)
        this.setState({ products:  this.state.products.filter((product) => product.id != productId ) });                   
      }

      addCartClicked(product){

        //alert("stampo prima di tutto " + JSON.stringify(product));

        ProductApiService.addProduct(product) 

        .then(response => {
            
            //alert("stampo response " + JSON.stringify(response.data))

            this.setState({
            
                nome: response.data.nome,
                prezzo: response.data.prezzo,
                quantita: response.data.quantita,
                categoria: response.data.categoria,
                disponibile: response.data.disponibile,
                descrizione: response.data.descrizione,
                img: response.data.img     
            })

        //alert("stampo il nome prodotto " + JSON.stringify(this.state.nome));

        this.state.prodottox = {

            nome: this.state.nome,
            prezzo: this.state.prezzo,
            quantita: this.state.quantita,
            categoria: this.state.categoria,
            disponibile: this.state.disponibile,
            descrizione: this.state.descrizione,
            img: this.state.img        
        }

        //alert("stampo il prodotto " + JSON.stringify(this.state.prodottox));

        this.state.products.push(this.state.prodottox);

        //alert("stampo products " + JSON.stringify(this.state.products));

        if(localStorage.getItem("cartItems") != null){

            alert("ENTRO QUI?! " + JSON.stringify(localStorage.getItem("cartItems")));

            this.state.products.push(localStorage.getItem("cartItems"));

            alert("stampo products " + JSON.stringify(this.state.products));
        }

        localStorage.setItem("cartItems",JSON.stringify(this.state.products))
            
            this.props.history.push({
                pathname: "/Carrello",
                prodotto :  this.state.prodottox

            })
        })

        

      }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
    
 
    render() {
        return (
           
            <Table  striped bordered hover variant="dark">
                     <thead>
                         <tr>
                             <th>IMG</th>
                             <th>NAME</th>
                             <th>PRICE</th>
                             <th>CATEGORY</th>
                             <th>QUANTITA'</th>
                             <th>DESCRIZIONE</th>
                             <th>ACTION</th>
                         </tr>
                     </thead>
                     <tbody >
                    
                     
                                 
                             <tr  >
                                 <td><img width='350px' height='350px' src={this.state.prodotto.img}></img></td>
                                 <td>{this.state.prodotto.nome}</td>
                                 <td>{this.state.prodotto.prezzo}</td>
                                 <td>{this.state.prodotto.categoria}</td>
                                 <td>    
                                 
                                    <input className="ip" type="button" value="-" onClick={()=>this.props.decrement(this.props.quantita)}/>
                                    <input className="ip" id="tx-w" type="text" value={this.props.quantita}/>
                                    <input className="ip" type="button" value="+" onClick={()=>this.props.increment(this.props.quantita)}/>
                                 
                                 </td>
                                 <td>{this.state.prodotto.descrizione}</td>
                                 <td>
                                     <button className="btn btn-success" onClick={() => this.deleteProductClicked(this.state.prodotto.id)}> Delete</button>
                                     &nbsp;&nbsp;&nbsp;
                                     <button className="btn btn-success" onClick={() => this.addCartClicked(this.state.prodotto)}> Add Cart</button>
                                 </td>
                             </tr>
                             
                     )
              
                         
                     </ tbody >
                 </Table>






        )
    }
    
}


export default Details
