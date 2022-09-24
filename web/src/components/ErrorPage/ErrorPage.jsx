import React from 'react';
import { useRouteError } from 'react-router-dom';
import styled from 'styled-components';

const StyledErrorPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

function ErrorPage() {
  const error = useRouteError();

  return (
    <StyledErrorPage>
      <h1>Ups!</h1>
      <p>Wystąpił błąd.</p>
      <p>
        {error.status || ''} {error.statusText || error.message}
      </p>
      <p>{error.data}</p>
    </StyledErrorPage>
  );
}

export default ErrorPage;
