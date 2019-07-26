import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, } from 'semantic-ui-react';

const LoginForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/logo.png' /> Üye Girişi
      </Header>
      <Form size='large'>
        <Segment stacked>
          <Form.Input fluid icon='user' iconPosition='left' placeholder='E-posta' />
          <Form.Input
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Şifre'
            type='password'
          />

          <Button color='teal' fluid size='large'>
            Giriş
          </Button>
        </Segment>
      </Form>
      <Message style={{textAlign: 'justify'}}>
        <Link to="/"> Şifremi unuttum </Link>            
      </Message>
    </Grid.Column>
  </Grid>
)

export default LoginForm