import React, { Component } from 'react'
import './Player.css'

export default class Player extends Component {

    render() {
        return (
            <div className={`player player${this.props.id}`}>
                <h1 style={{ color: this.props.isPlayerActive ? 'red' : 'black' }}>PLAYER {this.props.id} </h1>
                <h1>{this.props.score}</h1>
                <div className="currentPlayer" style={{ color: this.props.isPlayerActive ? 'black' : 'transparent' }}>
                    <h1>CURRENT</h1>
                    <h2>{this.props.current}</h2>
                </div>
            </div>
        )
    }
}

