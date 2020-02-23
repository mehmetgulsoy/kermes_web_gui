import React, { Component, Fragment } from "react";
import { Icon, Button, Segment, Modal, Form } from "semantic-ui-react";
import ShowModal from "../ShowModal";
import styles from "./style.module.css";

const bolgeler = [
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

const masalar = [
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
    secilen_elemen: "",
    selected_section: ""
  };

  handleBolgeClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML,
      selected_section: "bole"
    });
  };

  handleMasaClick = e => {
    this.setState({
      secilen_elemen: e.target.innerHTML,
      selected_section: "masa"
    });
  };

  handleSectionClick = e => {
    this.setState({ selected_section: e.currentTarget.id });
  };

  render() {
    const bolgelerbuttons = bolgeler.map(bolge => {
      let className = "";
      if (this.state.secilen_elemen === bolge.ad) {
        className = styles.selected;
      }
      return (
        <div
          key={bolge.id}
          className={className}
          onClick={this.handleBolgeClick}
        >
          {bolge.ad}
        </div>
      );
    });

    const masalarbuttons = masalar
      .filter(masa => masa.bolge === this.state.secilen_elemen)
      .map(masa => (
        <div key={masa.id} onClick={this.handleMasaClick}>
          {masa.ad}
        </div>
      ));

    const btn = <button> Denem</button>;
    let classNameBolge = styles.bolge;
    if (this.state.selected_section === "bolge")
      classNameBolge += " " + styles.selected_section;

    let classNameMasa = styles.masa;
    if (this.state.selected_section === "masa")
      classNameMasa += " " + styles.selected_section;

    return (
      <div>
        <header>
          <Icon size="large" name="chess board" />
          <b> Bölge/Masa</b>
          <b></b>
          <div>
            <Icon name="trash alternate" />
            Masa Güncelle
          </div>
          <ModalModal header={"Masa Ekle"} />
          <div>
            <Icon name="trash alternate" />
            Masa Sil
          </div>
        </header>

        <section
          id="bolge"
          className={classNameBolge}
          onClick={this.handleSectionClick}
        >
          {bolgelerbuttons}
        </section>
        <section
          id="masa"
          className={classNameMasa}
          onClick={this.handleSectionClick}
        >
          {masalarbuttons}
        </section>
        <ShowModal btn1={{ color: "yellow", text: "tamam" }} />
      </div>
    );
  }
}
export default Meslic;
