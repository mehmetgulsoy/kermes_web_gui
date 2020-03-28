import React, { Component } from "react";
import {
  Icon,
  Button,
  Modal,
  Form,
  Confirm,
  Dropdown
} from "semantic-ui-react";
import styles from "./style.module.css";
import classNames from "classnames";
import * as data from "../data";

let masalar = data.masalar;
let bolgeler = data.bolgeler;
let garsonlar = data.garsonlar;

class BolgeModal extends Component {
  state = {};
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  handleSubmit = () => console.log(this.state);

  render() {
    const { open, header, close_fn, kaydet_fn } = this.props;
    const { masa_adi } = this.state;
    return (
      <Modal open={open} size="tiny" closeOnEscape={true} onClose={close_fn}>
        <Modal.Header>{header}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Form.Field>
                <Form.Input
                  required
                  label="Masa Adı"
                  placeholder="Masa Adı..."
                  onChange={this.handleChange}
                  name="masa_adi"
                />
              </Form.Field>
              <Form.Field>
                <label>Garson</label>
                <Dropdown
                  label="Garson"
                  placeholder="Garson Seçiniz..."
                  multiple
                  search
                  selection
                  noResultsMessage="Kayıt bulunamadı"
                  options={garsonlar}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  required
                  type="number"
                  label="Masa Adeti"
                  placeholder="Masa Adeti..."
                  onChange={this.handleChange}
                  name="masa_adeti"
                />
              </Form.Field>
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={close_fn} color="red">
            Kapat
          </Button>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Kaydet"
            onClick={() => kaydet_fn(masa_adi)}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

class Meslic extends Component {
  state = {
    secilen_elemen: "", // aktif masa veya bölge
    secilen_bolge_elem: "", // seçilem bölge elemanın
    selected_section: "", // bölge veya masa
    confirm_dlg_open: false,
    sil_fn: null,
    modalOpen: false
  };

  open_dialog = () => this.setState({ confirm_dlg_open: true });
  close_dialog = () => this.setState({ confirm_dlg_open: false });
  handleModalOpen = () => this.setState({ modalOpen: true });
  handleModalClose = () => this.setState({ modalOpen: false });
  handleSectionClick = e =>
    this.setState({ selected_section: e.currentTarget.id });

  handleBolgeClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML,
      secilen_bolge_elem: e.target.innerHTML
    });
  };

  handleMasaClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML
    });
  };

  masa_sil = id => {
    masalar = masalar.filter(masa => masa.ad !== id);
    this.close_dialog();
  };

  bolge_sil = id => {
    const blg = bolgeler.filter(bolge => bolge.ad !== id);
    bolgeler = blg;
    this.close_dialog();
  };

  bolge_ekle = bolge => {
    bolgeler.push({ id: bolgeler.length + 2, ad: bolge });
    this.handleModalClose();
  };

  handleSilClick = e => {
    const { secilen_elemen, selected_section } = this.state;
    if (secilen_elemen === "") {
      alert("Lütfen Silinecek eleman seçiniz!");
      return;
    }
    if (selected_section === "masa") {
      this.setState({ sil_fn: () => this.masa_sil(secilen_elemen) });
    } else if (selected_section === "bolge") {
      this.setState({ sil_fn: () => this.bolge_sil(secilen_elemen) });
    }
    this.open_dialog();
  };

  render() {
    const {
      secilen_elemen,
      secilen_bolge_elem,
      selected_section,
      sil_fn
    } = this.state;
    const { modalOpen } = this.state;

    let selected_section_str = "";
    if (selected_section === "masa") {
      selected_section_str = "Masa";
    } else if (selected_section === "bolge") {
      selected_section_str = "Bölge";
    }

    return (
      <div>
        <Confirm
          content="Emin misin?"
          onConfirm={sil_fn}
          open={this.state.confirm_dlg_open}
          onCancel={this.close_dialog}
          cancelButton="İptal"
          confirmButton="Tamam"
        />
        <BolgeModal
          open={modalOpen}
          header="Masa Ekle"
          close_fn={this.handleModalClose}
          kaydet_fn={this.bolge_ekle}
        />
        <header className={styles.header}>
          <div>
            <Icon size="large" name="chess board" />
            <b> Bölge/Masa</b>
          </div>
          <b></b>
          <b></b>
          <div>
            <Icon name="edit" />
            {selected_section_str} Güncelle
          </div>
          <div onClick={this.handleModalOpen}>
            <Icon name="plus" />
            {selected_section_str} ekle
          </div>

          <div onClick={this.handleSilClick}>
            <Icon name="trash alternate" />
            {selected_section_str} Sil
          </div>
        </header>
        <section
          id="bolge"
          className={classNames({
            [styles.bolge]: true,
            [styles.selected_section]: selected_section === "bolge"
          })}
          onClick={this.handleSectionClick}
        >
          {bolgeler.map(bolge => (
            <div
              key={bolge.id}
              className={classNames({
                [styles.selected]: secilen_bolge_elem === bolge.ad,
                [styles.selected_section]: secilen_elemen === bolge.ad
              })}
              onClick={this.handleBolgeClick}
            >
              {bolge.ad}
            </div>
          ))}
        </section>
        <section
          id="masa"
          className={classNames({
            [styles.masa]: true,
            [styles.selected_section]: selected_section === "masa"
          })}
          onClick={this.handleSectionClick}
        >
          {masalar
            .filter(masa => masa.bolge === secilen_bolge_elem)
            .map(masa => (
              <div key={masa.id} onClick={this.handleMasaClick}>
                {masa.ad}
              </div>
            ))}
        </section>
      </div>
    );
  }
}
export default Meslic;
