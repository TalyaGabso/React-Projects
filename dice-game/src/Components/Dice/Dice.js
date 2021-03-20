import React, { Component } from 'react'
import './Dice.css'

export default class Dice extends Component {
    render() {
        return (
            <div className = {`die die${this.props.dice}`}>
            </div>
        )
    }
}
