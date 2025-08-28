import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';

import {shuffle, randomChoices} from './random';
import {NonEmptyArray, QuestionPicker, NullQuestionPicker, SimpleSRSQuestionPicker} from './QuestionPicker';

import data from './data.yaml';

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

function Summary(props: SummaryProps) {
  return (
    <div>
      <div>Correct: {props.correct}</div>
      <div>Answered: {props.answered}</div>
    </div>
  )
}

interface Fact {
  prompt: string;
  response: string;
  related: string[];
  mnemonic: string;
}

interface Question {
  fact: Fact;
  responses: string[];
}

interface AppState {
  facts: Record<string,Fact>;
  responses: string[];
  question: Question;
  maxQuestions: number;
  answer?: string;

  numCorrect: number;
  numAnswered: number;
  seenSet: Record<string,{}>;
}

class App extends React.Component<{},AppState> {
  private questionPicker: QuestionPicker;
  private mounted: boolean = false;
  private maxQuestionsKey = 'maxQuestions';
  
  static emptyQuestion = {
    fact: {
      prompt: '',
      response: '',
      related: [],
      mnemonic: '',
    },
    responses: [],
  };

  constructor(props: {}) {
    super(props);
    console.log('new App()');

    this.questionPicker = new NullQuestionPicker();

    const maxQuestions =
      Number(window.localStorage.getItem(this.maxQuestionsKey)) || 30;

    // Initialize state first
    this.state = {
      facts: {},
      responses: [],
      question: App.emptyQuestion,
      maxQuestions: maxQuestions,

      numCorrect: 0,
      numAnswered: 0,
      seenSet: {},
    };

    // Data is already parsed by the YAML plugin
    this.setQuestions(maxQuestions, data.facts);
  }

  componentDidMount() {
    this.mounted = true;
  }

  decMaxQuestions() {
    if (this.state.maxQuestions - 1 < 4) return;
    this.setQuestions(this.state.maxQuestions - 1, this.state.facts);
  }

  incMaxQuestions() {
    if (this.state.maxQuestions + 1 > Object.keys(this.state.facts).length) return;
    this.setQuestions(this.state.maxQuestions + 1, this.state.facts);
  }

  setQuestions(maxQuestions: number, facts: Record<string,Fact>) {
    window.localStorage.setItem(this.maxQuestionsKey, String(maxQuestions));
    const prompts = Object.keys(facts).slice(0, maxQuestions)
    this.questionPicker = new SimpleSRSQuestionPicker(prompts as NonEmptyArray<string>);
    const responses = prompts.map((prompt: string) => facts[prompt].response);
    if (this.mounted) {
      const newState = {
        facts: facts,
        responses: responses,
        question: App.emptyQuestion,
        maxQuestions: maxQuestions,
        seenSet: {},
      };
      this.setState(newState);
    } else {
      // eslint-disable-next-line
      this.state = {
        facts: facts,
        responses: responses,
        question: App.emptyQuestion,
        maxQuestions: maxQuestions,

        numCorrect: this.state.numCorrect,
        numAnswered: this.state.numAnswered,
        seenSet: {},
      };
    }
    this.nextQuestion({});
  }
  
  nextQuestion(seenSet: Record<string,{}>) {
    if (Object.keys(this.state.facts).length === 0) {
      return
    }
    if (!this.questionPicker.isReady()) {
      return;
    }
    const key = this.questionPicker.nextQuestion();
    const fact = this.state.facts[key];
    const responses = [fact.response];
    const otherResponses = this.state.responses.filter((response) => response !== fact.response);
    responses.push(...randomChoices(otherResponses, 3));
    const newSeenSet = _.clone(seenSet);
    newSeenSet[fact.prompt] = {};

    if (this.mounted) {
      this.setState({
        question: {
          fact: fact,
          responses: shuffle(responses),
        },
        answer: undefined,
        seenSet: newSeenSet,
      });
    } else {
      // eslint-disable-next-line
      this.state = {
        facts: this.state.facts,
        responses: this.state.responses,
        question: {
          fact: fact,
          responses: shuffle(responses),
        },
        maxQuestions: this.state.maxQuestions,

        numCorrect: this.state.numCorrect,
        numAnswered: this.state.numAnswered,
        seenSet: newSeenSet,
        answer: undefined,
      };
    }
  }

  handleClick(r: string) {
    if (this.state.answer !== null && this.state.answer !== undefined) return;
    this.setState({
      answer: r,
    });
    const numAnswered = this.state.numAnswered + 1;
    let numCorrect = this.state.numCorrect;
    if (r === this.state.question.fact.response) {
      this.questionPicker.feedback(this.state.question.fact.prompt, true);
      numCorrect++;
    } else {
      this.questionPicker.feedback(this.state.question.fact.prompt, false);
    }
    this.setState({
      numAnswered: numAnswered,
      numCorrect: numCorrect,
    });
  }

  hasAnswered() {
    return this.state.answer !== null && this.state.answer !== undefined;
  }

  isCorrectAnswer(response: string) {
    return response === this.state.question.fact.response;
  }

  isWrongAnswer(response: string) {
    return this.state.answer === response && response !== this.state.question.fact.response;
  }

  renderCard() {
    const buttons = this.state.question.responses.map((response: string, i: number) => {
      if (this.hasAnswered()) {
        if (this.isCorrectAnswer(response)) {
          return (
            <CorrectButton key={i} onClick={() => this.nextQuestion(this.state.seenSet)}>
              {response}
            </CorrectButton>
          );
        } else if (this.isWrongAnswer(response)) {
          return (
            <WrongButton key={i} onClick={() => this.nextQuestion(this.state.seenSet)}>
              {response}
            </WrongButton>
          );
        }
        return (
          <BigButton key={i} onClick={() => this.nextQuestion(this.state.seenSet)}>
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
          {this.state.question.fact.prompt}
        </Prompt>
        {buttons}
      </div>
    );
  }

  renderMnemonic() {
    if (!this.hasAnswered()) return (<Mnemonic />);
    let response = '';
    if (this.isCorrectAnswer(this.state.answer || '')) {
      response = Tada + Tada + Tada + 'Great job!' + Tada + Tada + Tada;
    } else {
      response = 'Try to remember: ' + this.state.question.fact.mnemonic;
    }
    return (
      <Mnemonic>{ response }</Mnemonic>
    );
  }

  render() {
    const numSeen = Object.keys(this.state.seenSet).length;
    const numTotal = Object.keys(this.state.facts).length;
    return (
      <Container>
        <header>
          <Title>
            S.R.S. 日本語
          </Title>
        </header>
        <Summary
          answered={ this.state.numAnswered }
          correct={ this.state.numCorrect }
        />
        <div>
          <span>Seen { numSeen } / </span>
          <button onClick={() => this.decMaxQuestions()}>-</button>
          <span>{ this.state.maxQuestions }</span>
          <button onClick={() => this.incMaxQuestions()}>+</button>
          <span> / { numTotal } total</span>
        </div>
        {this.renderCard()}
        {this.renderMnemonic()}
      </Container>
    );
  }
}

export default App;
