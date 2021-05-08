import React, { Component } from 'react'
import './table.css';
import SearchBar from './searchbar'
import NewLabelButton from './NewLabelButton'
import NewLabelForm from './NewLabelForm';
import { hexToRgbA } from '../utils/commonUtils'
import EditLabelForm from './editLabelForm';

const defaultSuggestedLables = [
    {
        id: 1,
        label_name: 'bug',
        lebel_note: "Something isn't working",
        open_issues_or_prs: 1,
        default_color: '#d73a4a',
    },
    {
        id: 2,
        label_name: 'documentation',
        lebel_note: "Improvements or additions to documentation",
        open_issues_or_prs: 0,
        default_color: '#0075ca',
    },
    {
        id: 3,
        label_name: 'duplicate',
        lebel_note: "This issue or pull request already exists",
        open_issues_or_prs: 0,
        default_color: '#cfd3d7',
    }, {
        id: 4,
        label_name: 'enhancement',
        lebel_note: "New feature or request",
        open_issues_or_prs: 0,
        default_color: '#a2eeef',
    },
    {
        id: 5,
        label_name: 'help wanted',
        lebel_note: "Extra attention is needed",
        open_issues_or_prs: 1,
        default_color: '#008672',
    },
    {
        id: 6,
        label_name: 'good first issue',
        lebel_note: "Good for newcomers",
        open_issues_or_prs: 2,
        default_color: '#7057ff',
    },
]
export class table extends Component {
    state = {
        labelsList: defaultSuggestedLables,
        labelsAfterFiltering: defaultSuggestedLables,
        isNewLabelFormVisible: false,
        isfilterApplied: false,
        searchValue: '',
    }
    componentDidMount () {
        let labels = localStorage.getItem('labels')
        if (labels) {
            this.setState({ labelsAfterFiltering: JSON.parse(labels) })
        } else {
            localStorage.setItem('labels', JSON.stringify(this.state.labelsList))
        }
    }

    setSearchValue = (value) => {
        this.setState({ searchValue: value })
    }

    toggleNewLabelForm = () => {
        this.setState({ isNewLabelFormVisible: !this.state.isNewLabelFormVisible })
    }

    createNewLabel = (labelName, description, color) => {
        let newLabelObj = {
            id: this.state.labelsList.length + 1,
            label_name: labelName,
            lebel_note: description,
            open_issues_or_prs: 0,
            default_color: color,
        }
        let labelsArray = this.state.labelsAfterFiltering
        labelsArray.unshift(newLabelObj)
        this.toggleNewLabelForm()
        // store also to local storage
        localStorage.setItem('labels', JSON.stringify(labelsArray))
        this.setState({ labelsAfterFiltering: labelsArray })
    }

    deleteLabel = (id) => {
        console.log(id)
        let labelsArray = this.state.labelsAfterFiltering
        let afterDelete = labelsArray.filter((label) => {
            return label.id !== id
        })
        // store also to local storage
        localStorage.setItem('labels', JSON.stringify(afterDelete))
        this.setState({ labelsAfterFiltering: afterDelete })
    }

    filterLabels = (searchValue, filter) => {
        console.log(searchValue)
        let labels = this.state.labelsList
        const filtered = labels.filter((label) => label.label_name.startsWith(searchValue))
        console.log(filtered)
        this.setState({ labelsAfterFiltering: filtered, isfilterApplied: filter })
        if (filter) {
            this.setState({ searchValue: '' })
        }
    }
    render () {
        const { isNewLabelFormVisible, labelsAfterFiltering, isfilterApplied, searchValue } = this.state
        return (
            <div className="container">
                <h3 style={{ marginBottom: '2rem' }}>Github label feature - Frontend challenge</h3>
                <div className="top-header">
                    <SearchBar filterLabels={this.filterLabels} setSearchValue={this.setSearchValue} searchValue={searchValue} />
                    <NewLabelButton toggleNewLabelForm={this.toggleNewLabelForm} />
                </div>
                { isNewLabelFormVisible && <NewLabelForm createNewLabel={this.createNewLabel} toggleNewLabelForm={this.toggleNewLabelForm} />}
                {(isfilterApplied || !labelsAfterFiltering?.length > 0) && <a href="#" className="mb20 clearText" onClick={() => this.filterLabels('', false)}>
                    <svg class="octicon octicon-x issues-reset-query-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path></svg>
                            Clear current search</a>}
                {labelsAfterFiltering?.length > 0 ?
                    <div className="table">
                        <div className="header-flex">
                            <div>{labelsAfterFiltering?.length > 0 ? `${labelsAfterFiltering.length} labels` : `${labelsAfterFiltering.length} label`}</div>
                            {/* <div>Sort</div> */}
                        </div>
                        <table>
                            <tbody>
                                {labelsAfterFiltering.map((label) => {
                                    return (
                                        <tr key={label.id}>
                                            <td><span className="tag" style={{ backgroundColor: label.default_color, color: hexToRgbA(label.default_color) }}>{label.label_name}</span></td>
                                            <td className="mb-hide label_note">{label.lebel_note}</td>
                                            <td><a className="mb-hide linkUnderline" href="#">{label.open_issues_or_prs > 0 ? `${label.open_issues_or_prs} open issue or pull request` : ''}</a> </td>
                                            {/* <td><a className="linktext" href="#">Edit</a></td> */}
                                            <td><a className="linktext" href="#" onClick={() => this.deleteLabel(label.id)}>Delete</a></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> :
                    <div>
                        <h3>No matching labels</h3>
                        <p>No labels in this repository match your query.</p>
                    </div>
                }
            </div>
        )
    }
}

export default table
