import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import UserApiService from '../utils/APIUsers.js';
import ProductApiService from '../utils/APIProducts.js';

import { Redirect } from 'react-router-dom';

export class Tablesite extends Component {
    constructor(props){
        super(props);
        // token utenti x sessione
        const token = localStorage.getItem("token")
        this.token = JSON.parse(token)
       
        
        
        

        this.state ={ 
            nome: '',
            cognome: '',
            email: '',
            password: '',
            ruolo:this.props.location.admin,
            message: null,
            users: [],
            users2: [],
            products: []

            
        }
        //alert ("stampa nome tizio "+ this.token['nome'] )

        this.editUserClicked = this.editUserClicked.bind(this)
        this.deleteUserClicked = this.deleteUserClicked.bind(this)

        this.editProductClicked = this.editProductClicked.bind(this)
        this.deleteProductClicked = this.deleteProductClicked.bind(this)
    
      }
      
      
      componentDidMount() {
       
        console.log(this.state.id)
    
        UserApiService.checkListUser()

        .then(res => {

            this.setState({users : res.data},);
              
        });

        ProductApiService.checkListProduct()

        .then(res => {
            
            this.setState({products : res.data},);
             
        });
          
           
      }
    
        editUserClicked(userId) {
        userId=JSON.stringify(userId);
        this.props.history.push(`/add-user/${userId}`)
           
        }

        editProductClicked(productId) {
            productId=JSON.stringify(productId);
            this.props.history.push(`/add-product/${productId}`) 
         }

        deleteUserClicked(userId) {           
            UserApiService.deleteUser(userId)
            this.setState({ users:  this.state.users.filter((user) => user.id != userId ) }); 
        }
        deleteProductClicked(productId) {
            ProductApiService.deleteProduct(productId)
            this.setState({ products:  this.state.products.filter((product) => product.id != productId ) });                   
        }

       
        onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });



        render() {

            if(this.token == true ){

                var i = 0;

            return (

                   
                
                <div className="container">
                    <Table  striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>IMG</th>
                                <th>NAME</th>
                                <th>SURNAME</th>
                                <th>EMAIL</th>
                                <th>PASSWORD</th>
                                <th>BUDGETS</th>
                                <th>RUOLO</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody >
                        {
                        this.state.users.map( user =>
                                    
                                <tr  key={user.id}>
                                    <td><img width='150px' height='150px' src={user.img}></img></td>
                                    <td>{user.nome}</td>
                                    <td>{user.cognome}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>{user.conto}</td>
                                    <td>{user.ruolo}</td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => this.deleteUserClicked(user.id)}> Delete</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-success" onClick={() => this.editUserClicked(user.id)}> Edit</button>
                                    </td>
                                </tr>
                                
                        )
                    }
                            
                        </ tbody >
                    </Table>

                   {/* tabella prodott*/ } 


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
                     {
                     this.state.products.map( product =>
                                 
                             <tr  key={product.id}>
                                 <td><img width='150px' height='150px' src={product.img}></img></td>
                                 <td>{product.nome}</td>
                                 <td>{product.prezzo}</td>
                                 <td>{product.categoria}</td>
                                 <td>{product.quantita}</td>
                                 <td>{product.descrizione}</td>
                                 <td>
                                     <button className="btn btn-success" onClick={() => this.deleteProductClicked(product.id)}> Delete</button>
                                     &nbsp;&nbsp;&nbsp;
                                     <button className="btn btn-success" onClick={() => this.editProductClicked(product.id)}> Edit</button>
                                 </td>
                             </tr>
                             
                     )
                 }
                         
                     </ tbody >
                 </Table>


                </div>

               
            
            )

            }
            else{

                return (<Redirect to="/"/>)
            }
            
                      
        }

   
}

export default Tablesite
