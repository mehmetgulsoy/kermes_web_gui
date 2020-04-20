import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Header,
  Message,
  Segment,
  Icon,
} from "semantic-ui-react";
import * as auth from "../../state/actions";
import * as msg from "../../utils/msg";
import styles from "./login.module.css";

export default function LoginForm(props) {
  const [uye, set_uye] = useState("Mehmet@BTY");
  const [sifre, set_sifre] = useState("31414819674");
  const [formErrors, set_formErrors] = useState({});
  const [isLoading, set_isLoading] = useState(false);
  const [error, set_error] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};
    set_error("");
    set_isLoading(true);
    if (!uye) errors.uye = msg.REQUIRED_FIELD_MSG;
    else if (!uye.includes("@")) errors.uye = msg.UYE_FIELD_MSG;
    if (!sifre) errors.sifre = msg.REQUIRED_FIELD_MSG;
    set_formErrors({ formErrors: errors });

    if (Object.entries(errors).length !== 0) {
      set_isLoading(false);
      return;
    }
    const result = await dispatch(auth.login({ uye, sifre }));
    if (result.error === true) {
      set_error(result.msg);
      set_isLoading(false);
    } else history.push("/dashboard");
  };

  return (
    <div className={styles.loginForm}>
      <Header as="h2">
        <Icon name="coffee" size="big" /> Üye Girişi
      </Header>
      <Form error={error.length > 0} onSubmit={handleSubmit}>
        <Segment stacked>
          <Message error header="Hata Oluştu!" content={error} />
          <Form.Input
            fluid
            required
            icon="user"
            iconPosition="left"
            placeholder="uye@firma"
            pointing="right"
            name="uye"
            value={uye}
            error={formErrors.uye}
            onChange={(e) => set_uye(e.target.value)}
          />
          <Form.Input
            fluid
            required
            icon="lock"
            iconPosition="left"
            placeholder="Şifre"
            type="password"
            name="sifre"
            value={sifre}
            error={formErrors.sifre}
            onChange={(e) => set_sifre(e.target.value)}
          />
          <Button primary fluid size="large" loading={isLoading}>
            Giriş
          </Button>
        </Segment>
      </Form>
      <Message style={{ textAlign: "justify" }}>
        <Link to="/"> Şifremi unuttum</Link>
      </Message>
    </div>
  );
}
