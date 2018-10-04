import React, { Fragment } from 'react';
import Square from '../square';

class Board extends React.Component {

    constructor(props) {
        super(props);

        this.chunkArray = this.chunkArray.bind(this);
    }

    onSquareClicked(i) {
        this.props.onSquareClicked(i);
    }

    renderSquare(i, text) {
        return (
            <Square index={i} onClick={this.onSquareClicked} onSquareClicked={() => this.onSquareClicked(i)} text={text}
            />
        );
    }

    chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            const myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    }

    render() {
        const { squares } = this.props;
        const chunkedArray = this.chunkArray(squares, 3);
        return (
            <Fragment>
                {chunkedArray.map((chunk, i) => (
                    <div key={i} className="board-row">
                        {chunk.map((text, idx) => (this.renderSquare(idx + (3 * i), text)))}
                    </div>
                ))}
            </Fragment>
        );
    }
}

export default Board;