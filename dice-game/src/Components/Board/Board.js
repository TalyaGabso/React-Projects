import React, { Component } from 'react'
import Player from '../Player/Player'
import Dice from '../Dice/Dice'
import './Board.css'

export default class Board extends Component {
    state = {
        player1Id: 1,
        p1TotalScore: 0,
        p1CurrentScore: 0,

        player2Id: 2,
        p2TotalScore: 0,
        p2CurrentScore: 0,
        die1: 0,
        die2: 0,
        currentPlayer: 1,
        input: 100,
        isPlaying: true
    }
    randomDice = () => {
        return Math.floor((Math.random() * 6) + 1)
    }
    updateDice = async () => {
        const die1 = this.randomDice();
        const die2 = this.randomDice();
        this.setState({ die1, die2 })
    }
    checkIfDouble = () => {
        return this.state.die1 === this.state.die2
    }

    roleDice = async () => {
        if (this.state.isPlaying) {
            await this.updateDice();
            if (this.state.currentPlayer === 1) {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ p1CurrentScore: 0 })
                }
                else this.setState({ p1CurrentScore: this.state.p1CurrentScore + this.state.die1 + this.state.die2 })
            }
            else {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ p2CurrentScore: 0 })
                }
                else this.setState({ p2CurrentScore: this.state.p2CurrentScore + this.state.die1 + this.state.die2 })
            }
        }
    };

    checkWin = () => {
        if (this.state.p1TotalScore >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ p1TotalScore: 'YOU WON!', isPlaying: false })
            return true
        }
        else if (this.state.p2TotalScore >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ p2TotalScore: 'YOU WON!', isPlaying: false })
            return true
        }
        else return false
    }

    hold = async () => {
        if (this.state.isPlaying) {
            this.setState({ p1CurrentScore: 0, p2CurrentScore: 0 })
            if (this.state.currentPlayer === 1) {
                await this.setState({
                    p1TotalScore: this.state.p1TotalScore + this.state.p1CurrentScore,
                    currentPlayer: 2,
                })
                this.checkWin()
            }
            else {
                await this.setState({
                    p2TotalScore: this.state.p2TotalScore + this.state.p2CurrentScore,
                    currentPlayer: 1,
                })
                this.checkWin()
            }
        }
    }

    newGame = () => {
        this.setState({
            player1Id: 1,
            p1TotalScore: 0,
            p1CurrentScore: 0,
            player1Active: 0,
            player2Id: 2,
            p2TotalScore: 0,
            p2CurrentScore: 0,
            player2Active: 1,
            die1: 0,
            die2: 0,
            currentPlayer: 1,
            input: 100
        })
        window.location.reload();

    }

    playTill = (e) => {
        this.setState({ input: e.target.value })
    }

    isPlayer = () => {
        return this.state.currentPlayer === 1
    }

    isPlayer2 = () => {
        return this.state.currentPlayer != 1
    }

    render() {
        return (
            <div className='board'>
                <div className='buttons'>
                    <button onClick={this.newGame}>+ NEW GAME</button>
                    <div className='dice'>
                        <Dice dice={this.state.die1} />
                        <Dice dice={this.state.die2} />
                    </div>
                    <div className="bottomButtons">
                        <button onClick={this.roleDice}>ROLE DICE</button>
                        <button onClick={this.hold}>HOLD</button>
                        <input name='val' type="number" placeholder="FINEL SCORE" min={2} onChange={this.playTill} />
                    </div>
                </div>
                <Player
                    id={this.state.player1Id}
                    score={this.state.p1TotalScore}
                    current={this.state.p1CurrentScore}
                    isPlayerActive={this.isPlayer()}
                />
                <Player
                    id={this.state.player2Id}
                    score={this.state.p2TotalScore}
                    current={this.state.p2CurrentScore}
                    isPlayerActive={this.isPlayer2()}
                />
            </div>
        )
    }
}