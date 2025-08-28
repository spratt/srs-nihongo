import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';

import {shuffle, randomChoices} from './random';
import {NonEmptyArray, QuestionPicker, NullQuestionPicker, SimpleSRSQuestionPicker} from './QuestionPicker';
import TabBar, { TabType } from './TabBar';
import RowSelector from './RowSelector';
import { hiraganaRows, katakanaRows, getCharactersFromRows } from './characterRows';

import dataKanji from './data.yaml';
import dataHiragana from './data_hiragana.yaml';
import dataKatakana from './data_katakana.yaml';

interface Fact {
  prompt: string;
  response: string;
  related: string[];
  mnemonic: string;
}

const Tada = String.fromCodePoint(127881);

const Container = styled.div`
  @media screen and (min-width: 48rem) {
  width: 48rem;
  margin: 0 auto;
  }
`;

const Title = styled.h1`
  padding-left: 1rem;
  font-size: 1.5em;
  color: palevioletred;
`;

const BigButton = styled.button`
  font-size: 2rem;
  width: 100%;
`;

const CorrectButton = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: lightgreen;
`;

const WrongButton = styled.button`
  font-size: 2rem;
  width: 100%;
  background-color: orangered;
`;

const Prompt = styled.h2``;

const Mnemonic = styled.h3``;

interface SummaryProps {
  answered: number;
  correct: number;
}

function Summary(props: SummaryProps): React.JSX.Element {
  return (
    <div>
      <div>Correct: {props.correct}</div>
      <div>Answered: {props.answered}</div>
    </div>
  )
}

interface Question {
  fact: Fact;
  responses: string[];
}

interface TabState {
  facts: Record<string,Fact>;
  responses: string[];
  question: Question;
  maxQuestions: number;
  selectedRows?: string[]; // For hiragana/katakana row selection
  answer?: string | undefined;
  numCorrect: number;
  numAnswered: number;
  seenSet: Record<string, object>;
}

interface AppState {
  activeTab: TabType;
  hiragana: TabState;
  katakana: TabState;
  kanji: TabState;
}

class App extends React.Component<object, AppState> {
  private questionPickers: Record<TabType, QuestionPicker>;
  private mounted: boolean = false;
  
  static emptyQuestion = {
    fact: {
      prompt: '',
      response: '',
      related: [],
      mnemonic: '',
    },
    responses: [],
  };

  constructor(props: object) {
    super(props);
    console.log('new App()');

    this.questionPickers = {
      hiragana: new NullQuestionPicker(),
      katakana: new NullQuestionPicker(),
      kanji: new NullQuestionPicker(),
    };

    // Load saved max questions for kanji, with backward compatibility
    const maxQuestionsKanji = Number(window.localStorage.getItem('maxQuestions_kanji')) ||
                              Number(window.localStorage.getItem('maxQuestions')) || 30;
    
    // Load saved row selections for hiragana/katakana
    const savedHiraganaRows = window.localStorage.getItem('selectedRows_hiragana');
    const selectedHiraganaRows = savedHiraganaRows ? JSON.parse(savedHiraganaRows) : ['vowels'];
    
    const savedKatakanaRows = window.localStorage.getItem('selectedRows_katakana');
    const selectedKatakanaRows = savedKatakanaRows ? JSON.parse(savedKatakanaRows) : ['vowels'];

    // Initialize empty tab states
    const emptyTabState: TabState = {
      facts: {},
      responses: [],
      question: App.emptyQuestion,
      maxQuestions: 20,
      numCorrect: 0,
      numAnswered: 0,
      seenSet: {},
    };

    // Initialize state with all tabs
    this.state = {
      activeTab: 'hiragana',
      hiragana: { ...emptyTabState, selectedRows: selectedHiraganaRows, maxQuestions: 0 },
      katakana: { ...emptyTabState, selectedRows: selectedKatakanaRows, maxQuestions: 0 },
      kanji: { ...emptyTabState, maxQuestions: maxQuestionsKanji },
    };

    // Initialize data for each tab
    this.initializeTabWithRows('hiragana', dataHiragana.facts, selectedHiraganaRows);
    this.initializeTabWithRows('katakana', dataKatakana.facts, selectedKatakanaRows);
    this.initializeTab('kanji', dataKanji.facts, maxQuestionsKanji);
  }

  override componentDidMount(): void {
    this.mounted = true;
  }

  initializeTabWithRows(tab: 'hiragana' | 'katakana', facts: Record<string, Fact>, selectedRows: string[]): void {
    const rows = tab === 'hiragana' ? hiraganaRows : katakanaRows;
    const selectedCharacters = getCharactersFromRows(rows, selectedRows);
    const prompts = selectedCharacters.filter(char => facts[char] !== undefined);
    
    if (prompts.length > 0) {
      this.questionPickers[tab] = new SimpleSRSQuestionPicker(prompts as NonEmptyArray<string>);
      const responses = prompts.map((prompt: string) => {
        const fact = facts[prompt];
        if (fact === undefined) {
          throw new Error(`Fact not found for prompt: ${prompt}`);
        }
        return fact.response;
      });
      
      const tabState: TabState = {
        facts: facts,
        responses: responses,
        question: App.emptyQuestion,
        maxQuestions: prompts.length,
        selectedRows: selectedRows,
        numCorrect: 0,
        numAnswered: 0,
        seenSet: {},
      };
      
      if (this.mounted) {
        this.setState((prevState) => ({
          ...prevState,
          [tab]: tabState
        }));
      } else {
        // eslint-disable-next-line
        (this.state as any)[tab] = tabState;
      }
      
      if (tab === this.state.activeTab) {
        this.nextQuestionForTab(tab, {});
      }
    }
  }

  initializeTab(tab: TabType, facts: Record<string, Fact>, maxQuestions: number): void {
    const prompts = Object.keys(facts).slice(0, maxQuestions);
    if (prompts.length > 0) {
      this.questionPickers[tab] = new SimpleSRSQuestionPicker(prompts as NonEmptyArray<string>);
      const responses = prompts.map((prompt: string) => {
        const fact = facts[prompt];
        if (fact === undefined) {
          throw new Error(`Fact not found for prompt: ${prompt}`);
        }
        return fact.response;
      });
      
      const tabState: TabState = {
        facts: facts,
        responses: responses,
        question: App.emptyQuestion,
        maxQuestions: maxQuestions,
        numCorrect: 0,
        numAnswered: 0,
        seenSet: {},
      };
      
      if (this.mounted) {
        this.setState((prevState) => ({
          ...prevState,
          [tab]: tabState
        }));
      } else {
        // eslint-disable-next-line
        (this.state as any)[tab] = tabState;
      }
      
      if (tab === this.state.activeTab) {
        this.nextQuestionForTab(tab, {});
      }
    }
  }

  handleRowSelectionChange = (selectedRows: string[]): void => {
    const tab = this.state.activeTab;
    if (tab === 'kanji') return; // Row selection only for hiragana/katakana
    
    // Save to localStorage
    window.localStorage.setItem(`selectedRows_${tab}`, JSON.stringify(selectedRows));
    
    // Re-initialize with new selection
    const facts = tab === 'hiragana' ? dataHiragana.facts : dataKatakana.facts;
    this.initializeTabWithRows(tab as 'hiragana' | 'katakana', facts, selectedRows);
  }

  decMaxQuestions(): void {
    if (this.state.activeTab !== 'kanji') return; // Only for kanji
    const currentTab = this.state[this.state.activeTab];
    if (currentTab.maxQuestions - 1 < 4) return;
    this.setQuestions(currentTab.maxQuestions - 1, currentTab.facts);
  }

  incMaxQuestions(): void {
    if (this.state.activeTab !== 'kanji') return; // Only for kanji
    const currentTab = this.state[this.state.activeTab];
    if (currentTab.maxQuestions + 1 > Object.keys(currentTab.facts).length) return;
    this.setQuestions(currentTab.maxQuestions + 1, currentTab.facts);
  }

  setQuestions(maxQuestions: number, facts: Record<string,Fact>): void {
    const tab = this.state.activeTab;
    window.localStorage.setItem(`maxQuestions_${tab}`, String(maxQuestions));
    const prompts = Object.keys(facts).slice(0, maxQuestions)
    if (prompts.length > 0) {
      this.questionPickers[tab] = new SimpleSRSQuestionPicker(prompts as NonEmptyArray<string>);
    }
    const responses = prompts.map((prompt: string) => {
      const fact = facts[prompt];
      if (fact === undefined) {
        throw new Error(`Fact not found for prompt: ${prompt}`);
      }
      return fact.response;
    });
    const currentTab = this.state[tab];
    
    // Keep only the seen items that are still in the new range
    const newSeenSet: Record<string, object> = {};
    for (const key of Object.keys(currentTab.seenSet)) {
      if (prompts.includes(key)) {
        newSeenSet[key] = currentTab.seenSet[key] ?? {};
      }
    }
    
    const newTabState: TabState = {
      facts: facts,
      responses: responses,
      question: currentTab.question,
      maxQuestions: maxQuestions,
      numCorrect: currentTab.numCorrect,
      numAnswered: currentTab.numAnswered,
      seenSet: newSeenSet,
      answer: currentTab.answer,
    };
    
    if (this.mounted) {
      this.setState((prevState) => ({
        ...prevState,
        [tab]: newTabState
      }), () => {
        // Generate a new question only if we don't have one
        if (newTabState.question === App.emptyQuestion || newTabState.question.fact.prompt === '') {
          this.nextQuestionForTab(tab, newSeenSet);
        }
      });
    } else {
      // eslint-disable-next-line
      (this.state as any)[tab] = newTabState;
      this.nextQuestionForTab(tab, newSeenSet);
    }
  }
  
  nextQuestion(seenSet: Record<string, object>): void {
    this.nextQuestionForTab(this.state.activeTab, seenSet);
  }

  nextQuestionForTab(tab: TabType, seenSet: Record<string, object>): void {
    const tabState = this.state[tab];
    if (Object.keys(tabState.facts).length === 0) {
      return
    }
    if (!this.questionPickers[tab].isReady()) {
      return;
    }
    const key = this.questionPickers[tab].nextQuestion();
    const fact = tabState.facts[key];
    if (fact === undefined) {
      throw new Error(`Fact not found for key: ${key}`);
    }
    const responses = [fact.response];
    const otherResponses = tabState.responses.filter((response) => response !== fact.response);
    responses.push(...randomChoices(otherResponses, 3));
    const newSeenSet = _.clone(seenSet);
    newSeenSet[fact.prompt] = Object.create(null) as object;

    const newTabState: TabState = {
      ...tabState,
      question: {
        fact: fact,
        responses: shuffle(responses),
      },
      answer: undefined,
      seenSet: newSeenSet,
    };

    if (this.mounted) {
      this.setState((prevState) => ({
        ...prevState,
        [tab]: newTabState
      }));
    } else {
      // eslint-disable-next-line
      (this.state as any)[tab] = newTabState;
    }
  }

  handleClick(r: string): void {
    const tab = this.state.activeTab;
    const tabState = this.state[tab];
    if (tabState.answer !== null && tabState.answer !== undefined) return;
    
    const numAnswered = tabState.numAnswered + 1;
    let numCorrect = tabState.numCorrect;
    if (r === tabState.question.fact.response) {
      this.questionPickers[tab].feedback(tabState.question.fact.prompt, true);
      numCorrect++;
    } else {
      this.questionPickers[tab].feedback(tabState.question.fact.prompt, false);
    }
    
    this.setState((prevState) => ({
      ...prevState,
      [tab]: {
        ...tabState,
        answer: r,
        numAnswered: numAnswered,
        numCorrect: numCorrect,
      }
    }));
  }

  hasAnswered(): boolean {
    const tabState = this.state[this.state.activeTab];
    return tabState.answer !== null && tabState.answer !== undefined;
  }

  isCorrectAnswer(response: string): boolean {
    const tabState = this.state[this.state.activeTab];
    return response === tabState.question.fact.response;
  }

  isWrongAnswer(response: string): boolean {
    const tabState = this.state[this.state.activeTab];
    return tabState.answer === response && response !== tabState.question.fact.response;
  }

  renderCard(): React.JSX.Element {
    const tabState = this.state[this.state.activeTab];
    const buttons = tabState.question.responses.map((response: string, i: number) => {
      if (this.hasAnswered()) {
        if (this.isCorrectAnswer(response)) {
          return (
            <CorrectButton key={i} onClick={() => this.nextQuestion(tabState.seenSet)}>
              {response}
            </CorrectButton>
          );
        } else if (this.isWrongAnswer(response)) {
          return (
            <WrongButton key={i} onClick={() => this.nextQuestion(tabState.seenSet)}>
              {response}
            </WrongButton>
          );
        }
        return (
          <BigButton key={i} onClick={() => this.nextQuestion(tabState.seenSet)}>
            {response}
          </BigButton>
        );
      } else {
        return (
          <BigButton key={i} onClick={() => this.handleClick(response)}>
            {response}
          </BigButton>
        );
      }
    });
    return (
      <div>
        <Prompt>
          {tabState.question.fact.prompt}
        </Prompt>
        {buttons}
      </div>
    );
  }

  renderMnemonic(): React.JSX.Element {
    const tabState = this.state[this.state.activeTab];
    if (!this.hasAnswered()) return (<Mnemonic />);
    let response = '';
    if (this.isCorrectAnswer(tabState.answer ?? '')) {
      response = Tada + Tada + Tada + 'Great job!' + Tada + Tada + Tada;
    } else {
      response = 'Try to remember: ' + tabState.question.fact.mnemonic;
    }
    return (
      <Mnemonic>{ response }</Mnemonic>
    );
  }

  handleTabChange = (tab: TabType): void => {
    this.setState({ activeTab: tab });
    // If this tab has no current question, generate one
    const tabState = this.state[tab];
    if (tabState.question === App.emptyQuestion || tabState.question.fact.prompt === '') {
      this.nextQuestionForTab(tab, tabState.seenSet);
    }
  }

  override render(): React.JSX.Element {
    const tabState = this.state[this.state.activeTab];
    const numSeen = Object.keys(tabState.seenSet).length;
    const numTotal = Object.keys(tabState.facts).length;
    return (
      <Container>
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        <TabBar
          activeTab={this.state.activeTab}
          onTabChange={this.handleTabChange}
        />
        <Summary
          answered={ tabState.numAnswered }
          correct={ tabState.numCorrect }
        />
        {this.state.activeTab === 'kanji' ? (
          <div>
            <span>Seen { numSeen } / </span>
            <button onClick={() => this.decMaxQuestions()}>-</button>
            <span>{ tabState.maxQuestions }</span>
            <button onClick={() => this.incMaxQuestions()}>+</button>
            <span> / { numTotal } total</span>
          </div>
        ) : (
          <div>
            <div>Seen: { numSeen }</div>
            <RowSelector
              rows={this.state.activeTab === 'hiragana' ? hiraganaRows : katakanaRows}
              selectedRowIds={tabState.selectedRows ?? []}
              onRowSelectionChange={this.handleRowSelectionChange}
            />
          </div>
        )}
        {this.renderCard()}
        {this.renderMnemonic()}
      </Container>
    );
  }
}

export default App;
