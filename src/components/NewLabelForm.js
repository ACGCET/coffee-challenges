import React, { Component } from 'react'
import './table.css'
import './search.css'
import './button.css'

import { hexToRgbA, isValidColor, getRandomColor } from '../utils/commonUtils'
export class NewLabelForm extends Component {
    state = {
        label_name: '',
        label_preview: 'Label preview',
        description: '',
        default_color: '#1d76db',
        input_color: '#1d76db',
        isButtonActive: false,
    }

    onLabelNameChange = (e) => {
        console.log(e.target.value)
        this.setState({ label_name: e.target.value !== '' ? e.target.value : '', label_preview: e.target.value !== '' ? e.target.value : 'Label preview' },
            () => {
                if (this.state.label_name !== '' && this.state.input_color !== '') {
                    console.log('entering')
                    this.setState({ isButtonActive: true })
                } else {
                    this.setState({ isButtonActive: false })
                }
            }
        )
    }
    switchColor = () => {
        console.log(getRandomColor())
        this.setState({ default_color: getRandomColor(), input_color: getRandomColor() },
            () => {
                if (this.state.label_name !== '' && this.state.input_color !== '') {
                    console.log('entering')
                    this.setState({ isButtonActive: true })
                } else {
                    this.setState({ isButtonActive: false })
                }
            }
        )
    }
    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value })
    }
    onColorChange = (e) => {
        if (isValidColor(e.target.value)) {
            this.setState({ default_color: e.target.value })
        }
        this.setState({ input_color: e.target.value },
            () => {
                if (this.state.label_name !== '' && this.state.input_color !== '') {
                    this.setState({ isButtonActive: true })
                } else {
                    this.setState({ isButtonActive: false })
                }
            }
        )
    }
    render () {
        const labelsPreviewContainer = {
            padding: '1rem',
            borderRadius: '6px',
            padding: '16px',
            marginBottom: '16px',
            backgroundColor: '#f6f8fa',
            border: '1px solid #e1e4e8',
        }
        const { label_name, label_preview, description, input_color, default_color } = this.state

        return (
            <div style={labelsPreviewContainer}>
                <span className="tag" style={{ backgroundColor: default_color, color: hexToRgbA(default_color) }}>{label_preview}</span>
                <div className="form">
                    <div className="section1">
                        <span className="input-conatiner">
                            <label className="inputLabel">Label name</label>
                            <input
                                type="text" className="searchInput" placeholder="Label name"
                                value={label_name}
                                onChange={this.onLabelNameChange}
                            ></input>
                        </span>
                        <span className="input-conatiner">
                            <label className="inputLabel">Description</label>
                            <input type="text" className="searchInput"
                                onChange={this.onDescriptionChange}
                                placeholder="Description(optional)" value={description}></input>
                        </span>
                        <span className="input-conatiner">
                            <label className="inputLabel">Color</label>
                            <button className="refresh"
                                onClick={this.switchColor}
                                style={{ backgroundColor: default_color, color: hexToRgbA(default_color) }}>
                                <svg class="octicon octicon-sync" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 2.5a5.487 5.487 0 00-4.131 1.869l1.204 1.204A.25.25 0 014.896 6H1.25A.25.25 0 011 5.75V2.104a.25.25 0 01.427-.177l1.38 1.38A7.001 7.001 0 0114.95 7.16a.75.75 0 11-1.49.178A5.501 5.501 0 008 2.5zM1.705 8.005a.75.75 0 01.834.656 5.501 5.501 0 009.592 2.97l-1.204-1.204a.25.25 0 01.177-.427h3.646a.25.25 0 01.25.25v3.646a.25.25 0 01-.427.177l-1.38-1.38A7.001 7.001 0 011.05 8.84a.75.75 0 01.656-.834z"></path></svg>
                            </button> <input className="searchInput2"
                                onChange={this.onColorChange}
                                value={input_color}></input>
                        </span>
                    </div>
                    <div className="section2">
                        <button className="btn input-conatiner" onClick={this.props.toggleNewLabelForm}>Cancel</button>
                        <button className="input-conatiner btn-primary" onClick={() => this.props.createNewLabel(label_name, description, default_color)} disabled={!this.state.isButtonActive}>Create label</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewLabelForm
