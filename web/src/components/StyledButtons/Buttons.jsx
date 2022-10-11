import styled from 'styled-components';

const StyledButtons = styled.div`
  display: flex;
  margin-top: 3rem;
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const Buttons = props => {
  return <StyledButtons>{props.children}</StyledButtons>;
};

export default Buttons;
