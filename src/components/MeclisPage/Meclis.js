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
    secilen_bolge: "",
    secilen_masa: ""
  };

  handleBolgeClick = e => {
    this.setState({ secilen_bolge: e.target.innerHTML });
  };

  handleMasaClick = e => {
    this.setState({ secilen_masa: e.target.innerHTML });
  };

  render() {
    const bolgelerbuttons = bolgeler.map(bolge => {
      let className = "";
      if (this.state.secilen_bolge === bolge.ad) {
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
      .filter(masa => masa.bolge === this.state.secilen_bolge)
      .map(masa => (
        <div key={masa.id} onClick={this.handleMasaClick}>
          {masa.ad}
        </div>
      ));

    const btn = <button> Denem</button>;

    return (
      <div>
        <header>
          <Icon size="large" name="chess board" />
          <b> Bölge/Masa</b>

          <ModalModal header={"Masa Ekle"} />
          <div>
            <Icon name="trash alternate" />
            Masa Sil
          </div>
        </header>

        <section className={styles.bolge}>{bolgelerbuttons}</section>
        <section className={styles.masa}>{masalarbuttons}</section>
        <ShowModal btn1={{ color: "yellow", text: "tamam" }} />
      </div>
    );
  }
}
export default Meslic;
