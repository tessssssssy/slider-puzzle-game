import React from "react";
import Card from "./Card";
import './Board.css';

// generate 16 cards with 8 colors
class Board extends React.Component {
    static defaultProps = {
        colors: 
        [
          "red",
          "green",
          "blue",
          "yellow",
          "purple",
          "magenta",
          "pink",
          "turquoise",
          "red",
          "green",
          "blue",
          "yellow",
          "purple",
          "magenta",
          "pink",
          "turquoise"
    ]};
    constructor(props) {
        super(props);
        this.state = {
            cardsInPlay: 0, // if two not the same - flip them back add 1 to guesses
            guesses: 0,
            guessedColor: null,
            resolvedCards: 0,
            cards: this.generateCards()
        }
    }
    generateCards = () => {
        const cards = this.props.colors.map((color, index) => {
            return { color: color, key: index, resolved: false, faceUp: false }
        })
        return cards;
        // console.log(cards);
        // this.setState({cards: cards});
        // console.log(this.state.cards);
    }
    componentDidMount() {
        this.shuffleArray(this.state.cards);
    }
    shuffleArray = (arr) => {
        let indexes = arr.map((item, index) => index); // [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        while (indexes.length > 0) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            console.log(randomIndex);
            // swap arr[0] and arr[randomIndex];
            let temp = arr[randomIndex];
            arr[randomIndex] = arr[0];
            arr[0] = temp;
            indexes.splice(randomIndex, 1);
        }
    }
    handleClick = (card) => {
        // set cardsInPlay ++
        console.log(this.state.cards);
        console.log(this.props.colors);
        this.setState(prevState => {
            return { cardsInPlay: prevState.cardsInPlay + 1}
         }, () =>  {
             console.log(this.state.cardsInPlay);
             const updatedCards = this.state.cards.map((c) => {
                console.log(c.key);
                if (c.key === card.key) {
                    c.faceUp = true;
                }
                return c;
            })
            this.setState({cards: updatedCards})
             if (this.state.cardsInPlay === 1) {
                 this.setState({guessedColor: card.color}, () => console.log(this.state.guessedColor))
             }
             if (this.state.cardsInPlay === 2) {
                 if (card.color === this.state.guessedColor) {
                     this.setState((prevState) => {
                         return { resolvedCards: prevState.resolvedCards + 1}
                        }, () => {
                            console.log(this.state.resolvedCards);
                        })
                    // flip cards back - after timeout
                    // if cards dont match - set both cards to faceUp == false
                    // if cards match - set both cards to resolved
                    
                 } else {
                     // flip cards back to black - after timeout
                     // increment guesses
                     console.log("else block")
                     const resetCards = this.state.cards.map((c) => {
                         if (c.color === this.state.guessedColor || c.key === card.key) {
                             setTimeout(() => {
                                c.faceUp = false;
                                this.setState({cards: resetCards})
                             }, 1000)
                         }
                         return c;
                     })
                 }
                 this.setState({cardsInPlay: 0})
             }
         })
        // if cardsInPlay > 1 guesses ++
        // if cardsInPlay == 1 - set guessedColor to card.color
        // if 
    }
  render() {
    return (
      <div className="Board">
        {this.state.cards && this.state.cards.map((card) => {
          return <Card handleClick={() => this.handleClick(card)} color={card.color} faceUp={card.faceUp} key={card.key} resolved={card.resolved}/>;
        })}
      </div>
    );
  }
}

export default Board;
