import styled from 'styled-components';
import { IconChevronRight } from '@tabler/icons';

const StyledConfirmButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #14b1ae;
  color: #fff;
  font-size: 1rem;
  font-family: inherit;
  padding: 0.75rem 1rem;
  text-decoration: none;
  border-radius: 0.5rem;
  cursor: pointer;
  min-width: 7rem;
  :hover {
    opacity: 0.9;
  }
`;

const ConfirmButton = props => {
  return (
    <StyledConfirmButton onClick={props.clickHandler}>
      <p>Dalej</p>
      <IconChevronRight />
    </StyledConfirmButton>
  );
};

export default ConfirmButton;
