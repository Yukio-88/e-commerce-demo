import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ProductApiService from '../utils/APIProducts.js';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { findAllInRenderedTree } from 'react-dom/test-utils';

class AddProduct extends Component {

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

    }
    
    
    var thisIsMyTrueImg = '';
    
    this.onSubmit = this.onSubmit.bind(this)
    //this.validate = this.validate.bind(this)
    this.theimage = this.theimage.bind(this)
    this.saveImg = this.saveImg.bind(this)

  }
  saveImg(){

    document.getElementById('file-id').click();
  }
  theimage(){

    var filename = document.getElementById('file-id').files[0].name;
    document.getElementById('file-path').value = filename;
    document.getElementById('file-id').text = filename;
    //alert(filename);
    //alert(document.getElementById('file-path').value);

    this.thisIsMyTrueImg = document.getElementById('file-path').value

    //alert("stampo thisIsMyTrueImg " + this.thisIsMyTrueImg)
  }
  

  componentDidMount() {

    console.log(this.state.id)

    //alert("STAMPO LO STATE ID " + this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
        return
    }

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
              
        //alert("STAMPO LO PRODUCT fetchato " + JSON.stringify(this.state));
  }

  

  /*
  validate(values) {

    let errors = {}
    if (!values.nome) {
      errors.description = 'Enter a name'
    } 
    if (!values.cognome) {
      errors.description = 'Enter a surname'
    }
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
  */

  

  onSubmit(values) {

    //alert("stampo " + JSON.stringify(values))

    let product = null;

    if(this.state.id == -1){

       product = {
        nome: values.nome,
        prezzo: values.prezzo,
        quantita: values.quantita,
        categoria: values.categoria,
        disponibile: this.state.disponibile,
        descrizione: values.descrizione,
        img: this.thisIsMyTrueImg,
      }

      //alert("STAMPO LO USER primo if " + JSON.stringify(user));
    }
    else{

        if(values.quantita == 0){

            this.setState({
                disponibile : false,
            })

        }

        if(values.quantita > 0){

            this.setState({
                disponibile : true,
            })
        }

     product = {
        id: this.state.id,
        nome: values.nome,
        prezzo: values.prezzo,
        quantita: values.quantita,
        categoria: values.categoria,
        disponibile: this.state.disponibile,
        descrizione: values.descrizione,
        img: values.img,
      }

      //alert("STAMPO IL PRODUCT " + JSON.stringify(product));
    } 

    if (this.state.id == -1) {

        //alert("sto per cambiare pagina")

        ProductApiService.addProduct(product)
            .then(() => this.props.history.push('/'))
    } else {

        //alert("stampo id"+this.state.id);
        ProductApiService.editProduct( product)
            .then(() => this.props.history.push('/'))
    }

    console.log(values);
  }

  onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {

      let { nome, prezzo,quantita, descrizione,categoria, disponibile, img, id } = this.state

      //alert("STAMPO UN id " + this.state.id);

      if(this.state.id == -1){

        //alert("sono nel if new user");

        return (

            <div>
             
             
                <div className="container">
                <h3>New Product</h3>
                    <Formik
                        initialValues={{ nome, prezzo, quantita,categoria, disponibile,descrizione, img}}
                        onSubmit={this.onSubmit}
                        //validateOnChange={false}
                        //validateOnBlur={false}
                        //validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">                            
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="nome" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field className="form-control" type="text" name="prezzo" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Quantita</label>
                                        <Field className="form-control" type="text" name="quantita" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Category</label>
                                        <Field className="form-control" type="text" name="categoria" />
                                    </fieldset>
                                    {/*
                                    <fieldset className="form-group">
                                        <label>Disponibilità</label>
                                        <Field className="form-control" type="text" name="disponibile" />
                                    </fieldset>
                                    */}  
                                    <fieldset className="form-group">
                                        <label>Descrizione</label>
                                        <Field className="form-control" type="text" name="descrizione" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label onClick={this.saveImg}>Select Image</label>
                                        <Field className="form-control" id="file-id" style={{display:'none'}} type="file" name="img" onChange={this.theimage}/>
                                        <Field placeholder="non toccare" className="form-control" type="text" name="img" id="file-path" />
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>

                </div>
            </div>
            
        );

      } 
      
      if(this.state.id != -1){

        //alert("Stampo il prodotto " + JSON.stringify(this.state))
        //alert("sono nel if edit user");

        return (
          
          <div>
              <h3>Edit Product</h3>
              <div className="container">

                
                  <Formik
                      initialValues={{ id, nome, prezzo, quantita ,categoria , descrizione, disponibile, img }}
                      onSubmit={this.onSubmit}
                      //validateOnChange={false}
                      //validateOnBlur={false}
                      //validate={this.validate}
                      enableReinitialize={true}
                  >
                      {
                          (props) => (
                              <Form>
                                  <fieldset className="form-group">
                                      <label>Name</label>
                                      <Field className="form-control" type="hidden" name="id" disabled />
                                      <Field className="form-control" type="text" name="nome" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                        <label>Price</label>
                                        <Field className="form-control" type="text" name="prezzo" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Quantità</label>
                                        <Field className="form-control" type="text" name="quantita" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Category</label>
                                        <Field className="form-control" type="text" name="categoria" />
                                    </fieldset>
                                    {/*
                                    <fieldset className="form-group">
                                        <label>Disponibilità</label>
                                        <Field className="form-control" type="text" name="disponibile" />
                                    </fieldset>
                                    */}  
                                    <fieldset className="form-group">
                                        <label>Descrizione</label>
                                        <Field className="form-control" type="text" name="descrizione" />
                                    </fieldset>
                                  <fieldset className="form-group">
                                      <label onClick={this.saveImg}>img</label>
                                      <Field className="form-control" id="file-id" style={{display:'none'}} type="file" name="img2" onChange={this.theimage}/>
                                      <Field className="form-control" type="text" name="img" id="file-path" />
                                  </fieldset>
                                  <button className="btn btn-success" type="submit">Save</button>
                              </Form>
                          )
                      }
                  </Formik>

              </div>
          </div>
      )
      }

    }
}

export default AddProduct