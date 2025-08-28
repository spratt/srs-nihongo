import React, { useState } from 'react';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0.5rem 0;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #f8f8f8;
  border: none;
  border-bottom: ${props => props.className?.includes('open') ? '1px solid #ddd' : 'none'};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #333;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:focus {
    outline: none;
    background: #e8e8e8;
  }
`;

const AccordionTitle = styled.span`
  font-weight: 500;
`;

const AccordionIcon = styled.span<{ $open: boolean }>`
  transform: rotate(${props => props.$open ? '180deg' : '0deg'});
  transition: transform 0.2s ease;
  font-size: 1.2rem;
`;

const AccordionContent = styled.div<{ $open: boolean }>`
  max-height: ${props => props.$open ? '2000px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AccordionBody = styled.div`
  padding: ${props => props.className?.includes('open') ? '1rem' : '0 1rem'};
`;

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <AccordionContainer>
      <AccordionHeader 
        onClick={toggleOpen}
        className={isOpen ? 'open' : ''}
        type="button"
      >
        <AccordionTitle>{title}</AccordionTitle>
        <AccordionIcon $open={isOpen}>▼</AccordionIcon>
      </AccordionHeader>
      <AccordionContent $open={isOpen}>
        <AccordionBody className={isOpen ? 'open' : ''}>
          {children}
        </AccordionBody>
      </AccordionContent>
    </AccordionContainer>
  );
}

export default Accordion;