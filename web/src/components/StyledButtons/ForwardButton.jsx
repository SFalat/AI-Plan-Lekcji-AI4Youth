import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons';

const StyledForwardButton = styled(Link)`
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

const ForwardButton = props => {
  return (
    <StyledForwardButton to={props.to}>
      <p>Dalej</p>
      <IconChevronRight />
    </StyledForwardButton>
  );
};

export default ForwardButton;
