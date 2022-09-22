import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledBasicInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  height: 100vh;
`;

function BasicInfo() {
  return <StyledBasicInfo>123</StyledBasicInfo>;
}

export default BasicInfo;
