import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Confirm } from "semantic-ui-react";
import { BolgeModal } from "./BolgeModal";
import styles from "./style.module.css";
import classNames from "classnames";
import * as actions from "../../state/actions";

function Meslic(props) {
  const [secilen_elemen, set_secilen_elemen] = useState(""); // aktif masa veya bölge
  const [secilen_bolge_elem, set_secilen_bolge_elem] = useState(""); // seçilem bölge elemanın
  const [selected_section, set_selected_section] = useState(""); // bölge veya masa
  const [confirm_dlg_open, set_confirm_dlg_open] = useState(false);
  const [sil_fn, set_sil_fn] = useState(null);
  const [modalOpen, set_modalOpen] = useState(false);
  const masalar = useSelector((state) => state.static_data.masa);
  const bolgeler = useSelector((state) => state.static_data.bolge);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.masaGetir());
    dispatch(actions.bolgeGetir());
  }, [dispatch]);

  const open_dialog = () => set_confirm_dlg_open(true);
  const close_dialog = () => set_confirm_dlg_open(false);
  const handleModalOpen = () => set_modalOpen(true);
  const handleModalClose = () => set_modalOpen(false);
  const handleSectionClick = (e) => set_selected_section(e.currentTarget.id);

  const handleBolgeClick = (e) => {
    set_secilen_elemen(e.target.innerHTML);
    set_secilen_bolge_elem(e.target.innerHTML);
  };
  const handleMasaClick = (e) => set_secilen_elemen(e.target.innerHTML);

  const masa_sil = (id) => {
    // TODO
    close_dialog();
  };

  const bolge_sil = (id) => {
    // TODO  this.props.static_actions.bolgeSil(id);
    close_dialog();
  };

  const bolge_ekle = (bolge) => {
    // TODO  this.props.static_actions.bolgeEkle(bolge);
    handleModalClose();
  };

  const handleSilClick = (e) => {
    if (secilen_elemen === "") {
      alert("Lütfen Silinecek eleman seçiniz!");
      return;
    }
    if (selected_section === "masa") {
      set_sil_fn(() => masa_sil(secilen_elemen));
    } else if (selected_section === "bolge") {
      set_sil_fn(() => bolge_sil(secilen_elemen));
    }
    open_dialog();
  };

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
        open={confirm_dlg_open}
        onCancel={close_dialog}
        cancelButton="İptal"
        confirmButton="Tamam"
      />
      <BolgeModal
        garsonlar={[]}
        open={modalOpen}
        header="Masa Ekle"
        close_fn={handleModalClose}
        kaydet_fn={bolge_ekle}
      />
      <header className={styles.header}>
        <div className={styles.header_logo}>
          <Icon size="large" name="chess board" />
          <b> Bölge/Masa</b>
        </div>
        <b></b>
        <b></b>
        <div className={styles.header_button}>
          <Icon name="edit" />
          {selected_section_str} Güncelle
        </div>
        <div className={styles.header_button} onClick={handleModalOpen}>
          <Icon name="plus" />
          {selected_section_str} ekle
        </div>

        <div className={styles.header_button} onClick={handleSilClick}>
          <Icon name="trash alternate" />
          {selected_section_str} Sil
        </div>
      </header>

      <section
        id="bolge"
        className={classNames({
          [styles.bolge]: true,
          [styles.selected_section]: selected_section === "bolge",
        })}
        onClick={handleSectionClick}
      >
        {Array.isArray(bolgeler) &&
          bolgeler.map((bolge) => (
            <div
              key={bolge.bolge}
              className={classNames({
                [styles.selected]: secilen_bolge_elem === bolge.bolge,
                [styles.selected_section]: secilen_elemen === bolge.bolge,
              })}
              onClick={handleBolgeClick}
            >
              {bolge.bolge}
            </div>
          ))}
      </section>
      <section
        id="masa"
        className={classNames({
          [styles.masa]: true,
          [styles.selected_section]: selected_section === "masa",
        })}
        onClick={handleSectionClick}
      >
        {Array.isArray(masalar) &&
          masalar
            .filter((masa) => masa.bolge === secilen_bolge_elem)
            .map((masa) => (
              <div key={masa.bolge} onClick={handleMasaClick}>
                {masa.ad}
              </div>
            ))}
      </section>
    </div>
  );
}

export default Meslic;
