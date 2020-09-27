import React from 'react';
import './Card.css';

class Card extends React.Component {
    render() {
        const backgroundColor = this.props.faceUp ? this.props.color : "black";
        return (
            <div onClick={this.props.handleClick} className="Card" style={{"backgroundColor" : backgroundColor}}>{this.props.number}</div>
        )
    }
}

export default Card;

