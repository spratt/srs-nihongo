import React from 'react';
import styled from 'styled-components';
import { CharacterRow } from './characterRows';

const SelectorContainer = styled.div`
  /* Removed margin, padding, and border since it's now inside accordion */
`;

const CategorySection = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const RowGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
`;

const RowItem = styled.div<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  border: 1px solid ${props => props.$selected ? 'palevioletred' : '#ddd'};
  border-radius: 4px;
  background-color: ${props => props.$selected ? '#ffe4e1' : 'white'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: palevioletred;
    background-color: ${props => props.$selected ? '#ffd0cc' : '#fff5f5'};
  }
`;

const RowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

const Checkbox = styled.input`
  cursor: pointer;
`;

const RowName = styled.span`
  font-weight: bold;
  font-size: 0.9rem;
`;

const CharacterDisplay = styled.div`
  font-size: 1.2rem;
  color: #333;
  margin-left: 1.5rem;
`;

interface RowSelectorProps {
  rows: CharacterRow[];
  selectedRowIds: string[];
  onRowSelectionChange: (rowIds: string[]) => void;
}

function RowSelector({ rows, selectedRowIds, onRowSelectionChange }: RowSelectorProps): React.JSX.Element {
  console.log('RowSelector rendered with:', { 
    rowsCount: rows.length, 
    selectedRowIds, 
    firstFewRows: rows.slice(0, 3).map(r => ({ id: r.id, name: r.name }))
  });
  
  const handleCheckboxChange = (rowId: string, checked: boolean): void => {
    console.log('RowSelector handleCheckboxChange called:', { rowId, checked, currentSelectedRowIds: selectedRowIds });
    if (checked) {
      const newSelection = [...selectedRowIds, rowId];
      console.log('Adding row, new selection:', newSelection);
      onRowSelectionChange(newSelection);
    } else {
      const newSelection = selectedRowIds.filter(id => id !== rowId);
      console.log('Removing row, new selection:', newSelection);
      onRowSelectionChange(newSelection);
    }
  };

  // Group rows by category
  const rowsByCategory = {
    main: rows.filter(r => r.category === 'main'),
    dakuten: rows.filter(r => r.category === 'dakuten'),
    handakuten: rows.filter(r => r.category === 'handakuten'),
    combination: rows.filter(r => r.category === 'combination'),
  };

  const renderCategory = (title: string, categoryRows: CharacterRow[]): React.JSX.Element | null => {
    if (categoryRows.length === 0) return null;
    
    return (
      <CategorySection key={title}>
        <CategoryTitle>{title}</CategoryTitle>
        <RowGrid>
          {categoryRows.map(row => (
            <RowItem 
              key={row.id} 
              $selected={selectedRowIds.includes(row.id)}
            >
              <RowHeader>
                <Checkbox
                  type="checkbox"
                  checked={selectedRowIds.includes(row.id)}
                  onChange={(e) => handleCheckboxChange(row.id, e.target.checked)}
                />
                <RowName>{row.name}</RowName>
              </RowHeader>
              <CharacterDisplay>
                {row.characters.join(' ')}
              </CharacterDisplay>
            </RowItem>
          ))}
        </RowGrid>
      </CategorySection>
    );
  };

  return (
    <SelectorContainer>
      {renderCategory('Main Characters', rowsByCategory.main)}
      {renderCategory('Dakuten (゛)', rowsByCategory.dakuten)}
      {renderCategory('Han-dakuten (゜)', rowsByCategory.handakuten)}
      {renderCategory('Combinations', rowsByCategory.combination)}
    </SelectorContainer>
  );
}

export default RowSelector;