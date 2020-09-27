import React from 'react';
import Card from './Card';
import './Board.css';

class SliderPuzzle extends React.Component {
    static defaultProps = {
        numbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,null]
    }
    constructor(props) {
        super(props);
        this.state = {
            cards: this.generateCards()
        }
    }
    generateCards = () => {
        const cards = this.props.numbers.map((number, index) => {
            return { color: "pink", key: index, number: number, coords: [], faceUp: true}
        })
        return this.makeCardGrid(cards);
    }
    componentDidMount() {
        console.log(this.state.cards)
        this.shuffleCards();
    }
    makeCardGrid = (cards) => {
        const cardsMatrix = []
        for (let i = 0; i < 4; i++) {
            cardsMatrix.push([]);
            for (let j = 0; j < 4; j++) {
                cards[0].coords = [i, j];
                cardsMatrix[i].push(cards[0])
                cards.shift()
            }
        }
        console.log(cardsMatrix);
        return cardsMatrix;
        // this.setState({cards: cardsMatrix})
    }
    checkMove = (card) => {
        for (let row = 0; row < this.state.cards.length; row++) {
            for (let i = 0; i < this.state.cards[row].length; i++) {
                let foundCard = this.state.cards[row][i];
                // console.log(foundCard);
                if (foundCard.number === null) {
                    // console.log(foundCard);
                    // find out if the card passed in is adjacent
                    if (card.coords[0] === row && (i === card.coords[1] + 1 || i === card.coords[1] - 1)) {
                        return true;
                    }
                    if (card.coords[0] === row - 1 && (i === card.coords[1] || i === card.coords[1])) {
                        return true;
                    }
                    if (card.coords[0] === row + 1 && (i === card.coords[1] || i === card.coords[1])) {
                        return true;
                    }
                    return false;
                }
            }
        }
    }
    moveCard = (card) => {
        const checkMove = this.checkMove(card);
        console.log(checkMove);
        if (this.checkMove(card)) {
            const newCardOrder = this.state.cards.map((row) => {
                return row.map(c => {
                    if (c.number === null) {
                        // swap the cards
                        let temp = c.number;
                        c.number = card.number;
                        card.number = temp;
                    }
                    return c;
                })
            })
            console.log(newCardOrder);
            this.setState({cards: newCardOrder});
        } 
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
        this.setState({ cards: arr})
        console.log(this.state.cards);
    }
    shuffleCards = () => {
        for (let i = 0; i < 1000; i++) {
            let randomRow = Math.floor(Math.random() * 4);
            let randomCol = Math.floor(Math.random() * 4);
            let card = this.state.cards[randomRow][randomCol];
            console.log(card);
            this.moveCard(card);
        }
    }
    render() {
        return (
            <div class="Board">
                {this.state.cards && this.state.cards.map((row) => {
                    return row.map((card) => {
                        return <Card handleClick={() => this.moveCard(card)} number={card.number} coords={card.coords} color={card.color} faceUp={card.faceUp}></Card>
                    })     
                })}
            </div>
        )
    }
}

export default SliderPuzzle;