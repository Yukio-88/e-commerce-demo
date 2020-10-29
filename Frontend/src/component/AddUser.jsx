import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import UserApiService from '../utils/APIUsers.js';
import $ from 'jquery';

class AddUser extends Component {

  constructor(props){
    super(props);
    this.state ={
        id: this.props.match.params.id,
        nome: '',
        cognome: '',
        email: '',
        password: '',
        conto: '',
        img: '',
        img2:'',
        message: null,
       
    }
    var thisIsMyTrueImg = '';
    
    this.onSubmit = this.onSubmit.bind(this)
    this.validate = this.validate.bind(this)
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

    $("#ProvaLogin").hide();

    console.log(this.state.id)

    // eslint-disable-next-line
    if (this.state.id == -1) {
        return
    }

    UserApiService.fetchUserById(this.state.id)
  
        .then(response => this.setState({
            nome: response.data.nome,
            cognome: response.data.cognome,
            email: response.data.email,
            password: response.data.password,
            conto: response.data.conto,
            img: response.data.img 
        }))
              
        //alert("STAMPO LO USER fetchato " + JSON.stringify(this.state));
  }

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

  onSubmit(values) {

    alert("stampo ")

    let user = null;

    if(this.state.id == -1){

       user = {
        nome: values.nome,
        cognome: values.cognome,
        email: values.email,
        password: values.password,
        conto: values.conto,
        img: this.thisIsMyTrueImg,
      }

      //alert("STAMPO LO USER primo if " + JSON.stringify(user));
    }
    else{

      user = {
        id: this.state.id,
        nome: values.nome,
        cognome: values.cognome,
        email: values.email,
        password: values.password,
        conto: values.conto,
        img: values.img,
      }

      //alert("STAMPO LO USER secondo if " + JSON.stringify(user));
    } 

    if (this.state.id == -1) {
        UserApiService.addUser(user)
            .then(() => this.props.history.push('/'))
    } else {
        alert("stampo id"+this.state.id);
        UserApiService.editUser( user)
            .then(() => this.props.history.push('/'))
    }

    console.log(values);
  }

  onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        
      let { nome, cognome, email, password, conto, img, id } = this.state

      //alert("STAMPO UN id " + this.state.id);

      if(this.state.id == -1){

        //alert("sono nel if new user");

        return (
          
    
      
            <div>
           
                <div className="container">
                <h3>Sign Up</h3>
                    <Formik
                        initialValues={{ nome, cognome, email, password, conto, img}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
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
                                        <label >Surname</label>
                                        <Field className="form-control" type="text" name="cognome" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="email" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Password</label>
                                        <Field className="form-control" type="text" name="password" />
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

        //alert("sono nel if edit user");

        return (
          
          <div>
              <h3>Edit User</h3>
              <div className="container">
                  <Formik
                      initialValues={{ id, nome, cognome, email, password, conto, img }}
                      onSubmit={this.onSubmit}
                      validateOnChange={false}
                      validateOnBlur={false}
                      validate={this.validate}
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
                                      <label>Surname</label>
                                      <Field className="form-control" type="text" name="cognome" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Email</label>
                                      <Field className="form-control" type="text" name="email" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Password</label>
                                      <Field className="form-control" type="text" name="password" />
                                  </fieldset>
                                  <fieldset className="form-group">
                                      <label>Balance</label>
                                      <Field className="form-control" type="text" name="conto" />
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

export default AddUser