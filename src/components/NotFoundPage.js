
import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from "semantic-ui-react";


const NotFoundPage = () => {
  return (
    <Container textAlign='center'>
      <h4>
        404 Sayfa Bulunamadı.
      </h4>
      <Link to="/"> Anasayfaya </Link>
    </Container>
  );
};

export default NotFoundPage;