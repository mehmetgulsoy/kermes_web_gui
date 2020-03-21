import React, { Component } from "react";
import { Icon, Button, Modal, Form, Confirm } from "semantic-ui-react";
import ShowModal from "../ShowModal";
import styles from "./style.module.css";
import classNames from "classnames";
 

let bolgeler = [
  {
    id: 1,
    ad: "Salon"
  },
  {
    id: 2,
    ad: "Erkek"
  },
  {
    id: 3,
    ad: "Bayan"
  },
  {
    id: 4,
    ad: "Aile"
  }
];

let masalar = [
  {
    id: 1,
    bolge: "Salon",
    ad: "masa1",
    garson: "ahmet,mehmet,salih"
  },
  {
    id: 2,
    bolge: "Erkek",
    ad: "masa2",
    garson: "ahmet,mehmet"
  },
  {
    id: 3,
    bolge: "Salon",
    ad: "masa3",
    garson: "ahmet,mehmet"
  }
];

const ModalModal = props => (
  <Modal
    trigger={
      <div>
        <Icon name="add"></Icon>Ekle
      </div>
    }
    size="tiny"
  >
    <Modal.Header>{props.header}</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input required label="Masa Adı" placeholder="Masa Adı..." />
            </Form.Field>
          </Form.Group>
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color="red">Kapat</Button>
      <Button
        positive
        icon="checkmark"
        labelPosition="right"
        content="Kaydet"
      />
    </Modal.Actions>
  </Modal>
);

class Meslic extends Component {
  state = {
    secilen_elemen: "", // aktif masa veya bölge
    secilen_bolge_elem: "", // seçilem bölge elemanın 
    selected_section: "", // bölge veya masa 
    confirm_dlg_open: false,
    sil_fn : null,
    modalOpen: false,
  };

  open_dialog   = () => this.setState({ confirm_dlg_open: true });
  close_dialog  = () => this.setState({ confirm_dlg_open: false });
  handleModalOpen = () => this.setState({ modalOpen: true })
  handleModalClose = () => this.setState({ modalOpen: false })
  handleSectionClick = e => this.setState({ selected_section: e.currentTarget.id });
  
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

  masa_sil = (id) => {
    masalar = masalar.filter(masa => masa.ad !== id);
    this.close_dialog();      
  }

  bolge_sil = (id) => {
    bolgeler = bolgeler.filter(bolge => bolge.ad !== id);
    this.close_dialog();  
  }

  handleSilClick = e => {
    const { secilen_elemen, selected_section } = this.state;
    if  (secilen_elemen === "") {
      alert("Lütfen Silinecek eleman seçiniz!")
      return
    }
    if (selected_section === "masa"){
      this.setState({ sil_fn: () => this.masa_sil(secilen_elemen) });
    }else if (selected_section === "bolge"){
      this.setState({ sil_fn: () => this.bolge_sil(secilen_elemen) });  
    }
    this.open_dialog();
  }

  render() {
    const { secilen_elemen, secilen_bolge_elem, selected_section, sil_fn } = this.state;    
    let selected_section_str = ""
    if (selected_section === "masa"){ 
      selected_section_str = "Masa"    
    }else if ( selected_section === "bolge" ){
      selected_section_str = "Bölge"     
    }          

    return (
      <div>
        <Confirm
          content="Emin misin?"
          onConfirm={sil_fn}
          open={this.state.confirm_dlg_open}
          onCancel={this.close_dialog}          
          cancelButton = "İptal"
          confirmButton = "Tamam"
        />
        <Modal
          size="tiny"
          open = {this.state.modalOpen}
          onClose={this.handleModalClose}
        >
          <Modal.Header>"Deneme"</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field>
                    <Form.Input required label="Masa Adı" placeholder="Masa Adı..." />
                  </Form.Field>
                </Form.Group>
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color="red">Kapat</Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Kaydet"
            />
          </Modal.Actions>
        </Modal>
        <header>
          <div>
            <Icon size="large" name="chess board" />
            <b> Bölge/Masa</b>
          </div>
          <b></b>
          <b></b>
          <div>
            <Icon name="edit" />
            { selected_section_str } Güncelle
          </div>
          <div onClick={this.handleModalOpen}>
            <Icon name="plus" />
            { selected_section_str }  ekle
          </div>
          
          <div onClick={this.handleSilClick}>
            <Icon name="trash alternate" />
            { selected_section_str }  Sil
          </div>
        </header>
        <section
          id="bolge"
          className={
            classNames({
              [styles.bolge]: true,
              [styles.selected_section]: selected_section === "bolge"
            })
          }
          onClick={this.handleSectionClick}
        >
          {
            bolgeler.map(bolge => (             
              <div
                key={bolge.id}
                className={
                  classNames({
                    [styles.selected]: secilen_bolge_elem === bolge.ad,
                    [styles.selected_section]: secilen_elemen === bolge.ad
                  })
                }
                onClick={this.handleBolgeClick}
              >
                {bolge.ad}
              </div>             
            ))
          }
        </section>
        <section
          id="masa"
          className={
            classNames({
              [styles.masa]: true,
              [styles.selected_section]: selected_section === "masa",
              [styles.selected_section]: secilen_elemen === "masa"
            })          
          }
          onClick={this.handleSectionClick}
        >
        {masalar
          .filter(masa => masa.bolge === secilen_bolge_elem)
          .map(masa => (
            <div key={masa.id} onClick={this.handleMasaClick}>
              {masa.ad}
            </div>
          ))
        }
        </section>       
      </div>
    );
  }
}
export default Meslic;
