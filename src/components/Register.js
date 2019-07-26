import React from 'react'; 
import { Link } from "react-router-dom";
import { Button, Container, Form, Icon, Message } from 'semantic-ui-react';

const Regisger = () => (
  <Container style={{ margin: 20, maxWidth: 450 }}>
    <Message
      attached
      header='Hesap Oluştur'
      content='Yeni misin? Aşağıdan hesap oluşturabilirsin.'
    />
    <Form className='attached fluid segment'>
      <Form.Group widths='equal'>
        <Form.Input fluid label='Adınız' placeholder='Adınız' type='text' />
        <Form.Input fluid label='Soyadınız' placeholder='Soyadınız' type='text' />
      </Form.Group>
      <Form.Input label='E-posta' placeholder='E-posta' type='email' />
      <Form.Input label='Şifre' type='password' />
      <Form.Checkbox inline label='I agree to the terms and conditions' />
      <Button primary>Hesabımı Oluştur</Button>
    </Form>
    <Message attached='bottom' warning>
      <Icon name='help' />
      Hesabım var mı?&nbsp;<Link to="/giris"> Giriş Yap </Link> &nbsp;        
    </Message>
  </Container>
)

export default Regisger;