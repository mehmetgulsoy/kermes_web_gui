import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, } from 'semantic-ui-react';
import * as actions from "../actions/item"
import * as sockets from "../actions/socket"
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class LoginForm extends Component {

  state = {
    uye : '',
    sifre: '',
    errorMessages: [],
    successMessages: [],
  }

  handleChange = (e, { name, value}) => this.setState({[name]: value});
  handleSubmit = () => {
    return
  }

  render() {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            <Image src='/favicon.ico' /> Üye Girişi
          </Header>
          <Form size='large' onSubmit={this.handleSubmit} >
            <Segment stacked>
              <Form.Input 
                fluid
                required 
                icon='user' 
                iconPosition='left' 
                placeholder='uye@firma'
                name='uye'
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
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  actions: bindActionCreators(actions, dispatch),
  sockets: bindActionCreators(sockets, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

