import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Image, Message, Segment, } from 'semantic-ui-react'; 
import * as auth from "../actions/auth"
import * as msg from '../constants/msg'
import * as auth_reducers from "../reducers/auth";
import * as res_reducers from "../reducers/responce";

class LoginForm extends Component {
  state = {
    uye: '',
    sifre: '',
    formErrors: {}
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => {      
    const { uye, sifre } = this.state
    let errors = {}; 
    
    if (!uye) 
      errors.uye = msg.REQUIRED_FIELD_MSG; 
    else if (!uye.includes('@'))
      errors.uye = msg.UYE_FIELD_MSG
    
    if (!sifre) 
      errors.sifre = msg.REQUIRED_FIELD_MSG;

    this.setState({formErrors: errors});
    
    if (Object.entries(errors).length !== 0){
      console.log('hata: ',errors);      
      return;
    }          
    this.props.auth.login({ uye, sifre })       
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.isAuthenticated === true && prevProps.isAuthenticated === false) {
      this.props.push('/')         
    }
  }

  render() {
    const  {formErrors} = this.state;
    const  {res_error, res_msg } = this.props;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/favicon.ico'/> Üye Girişi
          </Header>
          <Form error={res_error} size='large' onSubmit={this.handleSubmit} >
            <Segment stacked>
              <Message
                error
                header='Hata Oluştu!'
                content={res_msg}
                //list={errorMessages || []}
              />
              <Form.Input
                fluid
                required
                icon='user'
                iconPosition='left'
                placeholder='uye@firma'
                pointing='right'
                name='uye'
                error = {formErrors.uye}
                onChange={this.handleChange}
              />
              <Form.Input
                fluid
                required
                icon='lock'
                iconPosition='left'
                placeholder='Şifre'
                type='password'
                name='sifre'
                error = {formErrors.sifre}
                onChange={this.handleChange}
              />
              <Button primary fluid size='large'>
                Giriş
              </Button>
            </Segment>
          </Form>
          <Message style={{ textAlign: 'justify' }}>
            <Link to="/"> Şifremi unuttum </Link>
          </Message>
        </Grid.Column>
      </Grid>
    )
  }

}

const mapStateToProps = state => ({
  isAuthenticated : auth_reducers.getisAuthenticated(state.auth),
  userName : auth_reducers.getUserName(state.auth),
  res_error : res_reducers.getError(state.responce),
  res_msg : res_reducers.getMsg(state.responce),
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  //actions: bindActionCreators(actions, dispatch), 
  auth: bindActionCreators(auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

