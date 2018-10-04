import React from 'react';
import Board from '../board';
import '../../index.css';

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            player: '1',
            squares: Array(9).fill(null)
        };

        this.onSquareClicked = this.onSquareClicked.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
    }


    onSquareClicked(i) {
        const { squares, player } = this.state;

        if (this.calculateWinner(squares) || squares[i] != null)
            return;

        squares[i] = player === '1' ? 'X' : 'O';

        this.changePlayerTurn();

        const winner = this.calculateWinner(squares);

        this.setState({
            squares,
            winner
        });


    }

    changePlayerTurn() {
        const { player } = this.state;
        this.setState({ player: player === '1' ? '2' : '1' });
    }
    itsATie(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null)
                return false;
        }
        return true;
    }

    clearBoard() {
        const { winner, squares } = this.state;
        if (winner === 'O' || winner === 'X' || this.itsATie(squares))
            this.setState({
                player: winner === 'X' ? '1' : '2',
                winner: null,
                squares: Array(9).fill(null)
            });
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }



    render() {

        const { player, squares, winner } = this.state;
        let button = <div></div>;
        if (winner || this.itsATie(squares)) {
             button = <button className="btn btn-success" onClick={this.clearBoard}>Reiniciar</button>;
             }



        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares} onSquareClicked={this.onSquareClicked}
                    />
                </div>
                <div className="game-info">
                    <div>
                        <div>
                            {winner ? `WINNER: ${winner}` : this.itsATie(squares) ? "IT'S A TIE" : (`NEXT PLAYER: ${player === '1' ? 'X' : 'O'}`)}</div>
                    </div>
                    {button}
                </div>
            </div>
        );
    }
}
export default Game;