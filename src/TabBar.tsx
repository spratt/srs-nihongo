import React from 'react';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #ddd;
  margin: 0 1rem 1rem 1rem;
`;

const Tab = styled.button<{ $active: boolean }>`
  background: ${props => props.$active ? 'palevioletred' : 'white'};
  color: ${props => props.$active ? 'white' : 'palevioletred'};
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$active ? 'palevioletred' : '#ffe4e1'};
  }
  
  &:focus {
    outline: none;
  }
`;

export type TabType = 'hiragana' | 'katakana' | 'kanji';

interface TabBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

function TabBar({ activeTab, onTabChange }: TabBarProps): React.JSX.Element {
  return (
    <TabContainer>
      <Tab 
        $active={activeTab === 'hiragana'} 
        onClick={() => onTabChange('hiragana')}
      >
        Hiragana
      </Tab>
      <Tab 
        $active={activeTab === 'katakana'} 
        onClick={() => onTabChange('katakana')}
      >
        Katakana
      </Tab>
      <Tab 
        $active={activeTab === 'kanji'} 
        onClick={() => onTabChange('kanji')}
      >
        Kanji
      </Tab>
    </TabContainer>
  );
}

export default TabBar;