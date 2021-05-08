import React, { Component } from 'react'
import './button.css'

export class newLabelButton extends Component {
    render () {
        return (
            <button className="btn-primary" onClick={this.props.toggleNewLabelForm}>New label</button>
        )
    }
}

export default newLabelButton
