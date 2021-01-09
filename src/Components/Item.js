import React, { Component } from 'react'

export default class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: this.props.index
        }
    }

    render() {
        return (
            <div className="item">
                <div>
                    <span>Name: {this.props.iname}</span>
                    <span>Price = {this.props.iprice}</span>
                    <button onClick={() => { this.props.add (this.state.index) }} >+</button>
                </div>
            </div>
        )
    }
}