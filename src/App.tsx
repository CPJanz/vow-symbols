import React from "react";
import "./App.css";
import styled from "styled-components";
import Symbols from "./Symbols";
import { randomInt } from "crypto";

const SymbolGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const Symbol = styled.img`
  height: 150px;
  width: 150px;
`;

const getRandomIndex = () => {
  return Math.floor(Math.random() * Symbols.length);
};

type SymbolObject = {
  name: string;
  path: string;
};

type AppProps = {};
type AppState = {
  symbols: Array<SymbolObject>;
  currentSymbolIndex: number;
  correctGuessIndex?: number;
  wrongGuessIndexArray: Array<number>;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      symbols: [...Symbols],
      currentSymbolIndex: getRandomIndex(),
      correctGuessIndex: undefined,
      wrongGuessIndexArray: [],
    };
  }

  chooseSymbol = () => {
    this.setState({
      currentSymbolIndex: getRandomIndex(),
    });
  };

  clickSymbol = (index: number, name: string) => {
    if (this.state.currentSymbolIndex === index) {
      this.setState({ correctGuessIndex: index, wrongGuessIndexArray: [] });
      this.chooseSymbol();
    } else {
      this.setState({
        correctGuessIndex: undefined,
        wrongGuessIndexArray: [...this.state.wrongGuessIndexArray, index],
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>VOW Symbols</h1>
          <p>{Symbols[this.state.currentSymbolIndex].name}</p>
          <SymbolGrid>
            {Symbols.map((symbol, index) => {
              return (
                <Symbol
                  key={index}
                  src={`symbols/${symbol.path}`}
                  alt={symbol.name}
                  style={
                    index === this.state.correctGuessIndex
                      ? { backgroundColor: "green" }
                      : this.state.wrongGuessIndexArray.includes(index)
                      ? { backgroundColor: "red" }
                      : {}
                  }
                  onClick={() => {
                    this.clickSymbol(index, symbol.name);
                  }}
                />
              );
            })}
          </SymbolGrid>
        </header>
      </div>
    );
  }
}

export default App;
