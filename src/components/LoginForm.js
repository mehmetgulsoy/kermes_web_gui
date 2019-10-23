import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';import { Button, Form, Grid, Header, Image, Message, Segment, } from 'semantic-ui-react';
import * as actions from "../actions/item"
import * as auth from "../actions/auth"
import * as msg from '../constants/msg'

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
    .then(this.props.push('/'));
  }

  render() {
    const  {formErrors} = this.state;
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/favicon.ico' /> Üye Girişi
          </Header>
          <Form size='large' onSubmit={this.handleSubmit} >
            <Segment stacked>
              <Message
                error={true}
                header='Hata Oluştu!'
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
  responce: state.responce,
  //isFetching : get
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  actions: bindActionCreators(actions, dispatch), 
  auth: bindActionCreators(auth, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

