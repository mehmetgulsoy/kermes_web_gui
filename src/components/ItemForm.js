import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Message, Segment } from "semantic-ui-react";
import * as actions from "../actions/item"
import * as sockets from "../actions/socket"

const options = [
  { key: 'ÇORBALAR', text: 'ÇORBALAR', value: 'ÇORBALAR' },
  { key: 'ARA SICAKLAR', text: 'ARA SICAKLAR', value: 'ARA SICAKLAR' },
  { key: 'İKRAMLARIMIZ', text: 'İKRAMLARIMIZ', value: 'İKRAMLARIMIZ' },
  { key: 'SALATALAR', text: 'SALATALAR', value: 'SALATALAR' },
  { key: 'DÖNERLER', text: 'DÖNERLER', value: 'DÖNERLER' },
  { key: 'KEBAPLAR', text: 'KEBAPLAR', value: 'KEBAPLAR' },
  { key: 'PİDELER', text: 'PİDELER', value: 'PİDELER' },
  { key: 'TATLILAR', text: 'TATLILAR', value: 'TATLILAR' },
  { key: 'İÇECEKLER', text: 'İÇECEKLER', value: 'İÇECEKLER' },
];

class ItemForm extends Component {
  state = { adi: '', takip: false, aciklama: '', eldeki: 0, options, taksim: '', error_message: '', fiyat: 0, }

  handleChange = (e, { name, value }) => this.setState({ [name]: value.toUpperCase() });
  handleAddition = (e, { value }) => {
    value = value.toUpperCase();
    this.setState(prevState => ({
      options: [{ key: value, text: value, value }, ...prevState.options],
    }));
  };
  toggle = (e, { name, checked }) => this.setState({ [name]: checked });

  handleSubmit = () => {
    const { adi, aciklama, takip, eldeki, taksim, fiyat } = this.state;    
    this.props.actions.saveItem({
      adi,
      aciklama,
      takip,
      eldeki,
      taksim,
      fiyat
    });
    this.props.sockets.disconnect();
  };

  componentDidMount(prevProps, prevState, snapshot) {
    this.props.sockets.connect();
  }

  render() {
    const { adi, aciklama, takip, eldeki, taksim, error_message, fiyat, } = this.state;
    const { isLoading, } = this.props;
    return (
      <Container text>
        <Divider hidden />
        <Message
          attached
          header='Menü Tanımlama'
          content='Menüye yeni kalem ekleyebilir ve/veya güncelleme yapabilirsiniz!'
        />
        <Segment attached>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              required
              placeholder='Adi'
              name='adi'
              value={adi}
              label='Adi'
              onChange={this.handleChange}
            />
            <Form.Dropdown
              options={this.state.options}
              placeholder='Kategori'
              required
              search
              selection
              clearable
              allowAdditions
              additionLabel='Ekle '
              label='Kategori'
              name='taksim'
              noResultsMessage='Kayıt bulunamadı.'
              value={taksim}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
            <Form.TextArea
              placeholder='Açıklama'
              name='aciklama'
              value={aciklama}
              label='Açıklama'
              onChange={this.handleChange}
            />

            <Form.Input
              type='number'
              required
              min={0}
              step={0.1}
              placeholder='Fiyat'
              icon='lira sign'
              name='fiyat'
              value={fiyat}
              label='Fiyat'
              onChange={this.handleChange}
            />
            <Form.Checkbox
              placeholder='Stok takip'
              name='takip'
              checked={takip}
              label='Stok takip yap'
              onChange={this.toggle}
            />
            <Form.Input
              type='number'
              min={0}
              placeholder='Stok Takip'
              name='eldeki'
              value={eldeki}
              label='Stok Miktari'
              onChange={this.handleChange}
              disabled={!takip}
            />   
            <Button type='submit' disabled={adi === '' || taksim === ''} loading={isLoading} > 
              <span role='img' aria-label="xzxz" >👍</span> Kaydet
            </Button>
          </Form>
        </Segment>
        <Message
          error
          hidden={error_message === ''}
          attached
          icon='warning'
          header='Hata Oluştu'
          content={error_message}
        />
      </Container>
    );
  };
};

const mapStateToProps = state => ({
  isLoading: state.item.isLoading,
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  actions: bindActionCreators(actions, dispatch),
  sockets: bindActionCreators(sockets, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);