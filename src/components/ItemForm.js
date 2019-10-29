import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Container, Divider, Form, Message, Segment } from "semantic-ui-react";
import * as actions from "../actions/item"
import * as item_reducers from "../reducers/item";
import { getIsFetching, getError, getMsg } from "../reducers/responce";


class ItemForm extends Component {
  state = {
    adi: '',
    takip: false,
    aktif: false,
    aciklama: '',
    eldeki: 0,
    taksim: '',
    formErrors: {},
    isSubmitted: false,
    fiyat: 0,
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleAddition = (e, { value }) => {
    this.props.actions.katagori_ekle(value)
 //   this.setState(prevState => ({
 //     options: [{ key: value, text: value, value }, ...prevState.options],
 //   }));
    console.log(this.state.options);

  };
  toggle = (e, { name, checked }) => this.setState({ [name]: checked });

  handleSubmit = () => {
    this.setState({ isSubmitted: true });
    const { adi, aciklama, takip, eldeki, taksim, fiyat, aktif } = this.state;
    this.props.actions.saveMenuItem({
      adi,
      aciklama,
      takip,
      eldeki,
      taksim,
      fiyat,
      aktif,
    });
  };

  componentDidMount(prevProps, prevState, snapshot) {
    this.props.actions.fethKatagori()
  }

  render() {
    const { adi, aciklama, takip, eldeki, taksim, fiyat, aktif, isSubmitted, } = this.state;
    const { isLoading, msg, error } = this.props;
    let msgError = isSubmitted && error;
    let msgSuc = isSubmitted && !error;
    let isSubmitting = isSubmitted && isLoading;
    
    return (
      <Container text>
        <Divider hidden />
        <Message
          attached
          header='Menü Tanımlama'
          content='Menüye yeni kalem ekleyebilir ve/veya güncelleme yapabilirsiniz!'
        />
        <Segment attached>
          <Form error={msgError} success={msgSuc} onSubmit={this.handleSubmit}>
            <Message
              error
              icon='warning'
              header='Hata Oluştu!'
              content={msg}
            />
            <Message
              success
              icon='thumbs up outline'
              header='İşlem Başarılı'
              content={msg}
            />
            <Form.Input
              required
              placeholder='Adi'
              name='adi'
              value={adi}
              label='Adi'
              onChange={this.handleChange}
            />
            <Form.Dropdown
              options={this.props.options && this.props.options.map((val, ind) => ({
                key: ind, text: val, value: val
              }))}
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
            <Form.Checkbox
              placeholder='Menüden kaldır'
              name='aktif'
              checked={aktif}
              label='Menüden kaldır'
              onChange={this.toggle}
            />

            <Button type='submit' disabled={adi === '' || taksim === ''} loading={isSubmitting} >
              <span role='img' aria-label="xzxz" >👍</span> Kaydet
            </Button>
          </Form>
        </Segment>
      </Container>
    );
  };
};

const mapStateToProps = state => ({
  isLoading: getIsFetching(state.responce),
  options: item_reducers.getMenuKatagori(state.item),
  error: getError(state.responce),
  msg: getMsg(state.responce),
});

const mapDispatchToProps = dispatch => ({
  push: (path) => dispatch(push(path)),
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);