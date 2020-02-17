import React, { Component, Fragment } from "react";
import { Icon, Button, Segment, Modal, Form } from "semantic-ui-react"; 
import styles from "./style.module.css";

const bolgeler = [
  {
    id: 1,    
    ad : "Salon",   
  },
  {
    id: 2,    
    ad : "Erkek",   
  },
  {
    id: 3,    
    ad : "Bayan",   
  },
  {
    id: 4,    
    ad : "Aile",   
  }, 
];

const masalar = [
  {
    id: 1,
    bolge: 'Salon', 
    ad : "masa1",
    garson : "ahmet,mehmet,salih"
  },
  {    
    id: 2,
    bolge: 'Erkek',
    ad : "masa2",
    garson : "ahmet,mehmet"
  },
  {
    id: 3,
    bolge: 'Salon',
    ad : "masa3",
    garson : "ahmet,mehmet"
  }, 
];

const ModalModal= (props) => (
  <Modal trigger={<div><Icon name="add"></Icon>Ekle</div>} size='tiny'>
    <Modal.Header>{props.header}</Modal.Header>
    <Modal.Content>      
      <Modal.Description>    
        <Form >
          <Form.Group widths='equal'>
            <Form.Field>
              <Form.Input required label='Masa Adı' placeholder="Masa Adı..." />
            </Form.Field> 
          </Form.Group>            
        </Form>
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button color='red' >Kapat</Button>
      <Button positive icon='checkmark' labelPosition='right' content="Kaydet"/>
    </Modal.Actions>
  </Modal>  
)


class Meslic extends Component { 
  state = {
    secilen_bolge: '',
    secilen_masa:'',
  } 

  handleBolgeClick = (e) => {
    this.setState({secilen_bolge:e.target.innerHTML});    
  }

  handleMasaClick = (e) => {
    this.setState({secilen_masa:e.target.innerHTML});    
  }

  render() {
    
    const bolgelerbuttons = bolgeler.map((bolge)=>{
      let className = '';
      if (this.state.secilen_bolge === bolge.ad) {
        className = styles.selected;
      }      
      return  <div key = {bolge.id} className={className} onClick={this.handleBolgeClick}>{bolge.ad}</div>
    });
      
    const masalarbuttons = masalar.map( masalar => 
      <div key = {masalar.id} onClick={this.handleMasaClick}>{masalar.ad}</div>
    );
        
    
    return (
      <div className={styles}>
        <header>
          <Icon size="large" name="chess board" />
          <b> Bölge/Masa</b>
        </header>        
 
        <section className={styles.bolge}>          
          {bolgelerbuttons}           
          <ModalModal header={"Bölge Ekleme"}/>
        </section>        
        <section className={styles.masa}>
          {masalarbuttons}
        </section>
      </div>
    );
  }
}

export default Meslic;
