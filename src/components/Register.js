import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Container, Form, Icon, Message } from 'semantic-ui-react';
import * as actions from "../actions/item"
import * as sockets from "../actions/socket"
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Regisger extends Component {

  state = {
    adi: '',
    eposta: '',
    sifre: '',
    sifre2: '',
    firma: '',
    telefon: '',
    unvan: '',
    errorMessages: [],
    successMessages: [],
  }

  handleChangeLower = (e, { name, value }) => this.setState({ [name]: value.toLowerCase() });
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { adi, eposta, unvan, sifre, sifre2, firma, telefon } = this.state;
    const { sockets } = this.props;

    let error = false;
    this.setState({ errorMessages: [], successMessages: [] })

    if (sifre !== sifre2) {
      this.setState({ sifre_error: true, errorMessages: [...this.state.errorMessages, 'Şifre eşleşmedi'] })
      error = true;
    } else {
      error = false;
      this.setState({ sifre_error: false })
    }

    if (error) return


    sockets.uye_kayit({
      adi,
      firma,
      unvan,
      eposta,
      telefon,
      sifre,
    });

  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { isLoading, error, msg } = this.props.responce;
    const { successMessages, errorMessages, } = this.state;

    if (isLoading === false && prevProps.responce.isLoading === true) {
      if (error) {
        this.setState({ errorMessages: [...errorMessages, msg]});
      }
      else
        this.setState({ successMessages: [...successMessages, msg]});       
    }
  }

  render() {
    const { adi, eposta, sifre, sifre2, firma, telefon, unvan, successMessages, errorMessages, sifre_error } = this.state;
    const { isLoading, } = this.props.responce;
    return (
      <Container text style={{ marginTop: '3em' }}>
        <Message
          attached
          header='Hesap Oluştur'
          content='Yeni misin? Aşağıdan hesap oluşturabilirsin.'
        />
        <Form error={errorMessages.length > 0} success={successMessages.length > 0} className='attached segment' onSubmit={this.handleSubmit}>
          <Message
            error={true}
            header='Hata Oluştu!'
            list={errorMessages || []}
          />
          <Message
            success={true}
            header='İşlem Başarılı'
            list={successMessages || []}
          />
          <Form.Input label='Ad Soyadınız' required placeholder='Adınız' type='text' name='adi' value={adi} onChange={this.handleChange} />
          <Form.Input label='Firma' required type='type' name='firma' value={firma} onChange={this.handleChangeLower} />
          <Form.Input label='Firma Unvanı' type='type' name='unvan' value={unvan} onChange={this.handleChange} />
          <Form.Input label='E-posta' required placeholder='E-posta' type='email' name='eposta' value={eposta} onChange={this.handleChange} />
          <Form.Input label='Telefon' type='tel' name='telefon' value={telefon} onChange={this.handleChange} />
          <Form.Input label='Şifre' required type='password' name='sifre' value={sifre} onChange={this.handleChange} error={sifre_error} />
          <Form.Input label='Tekrar Şifre' required type='password' name='sifre2' value={sifre2} onChange={this.handleChange} error={sifre_error} />
          <Button primary loading={isLoading} >Hesabımı Oluştur</Button>
        </Form>
        <Message attached='bottom' warning>
          <Icon name='help' />
          Hesabım var mı?&nbsp;<Link to="/giris"> Giriş Yap </Link> &nbsp;
        </Message>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Regisger);