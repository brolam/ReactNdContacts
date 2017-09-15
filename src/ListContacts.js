import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }
    state = {
        query: ''
    }
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    clearQuery = () => {
        this.setState({ query: '' })
    }
    render() {
        const { contacts, onDeleteContact } = this.props
        const query = this.state.query
        let showingContacts = contacts.sort(sortBy('name'))
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingContacts = showingContacts.filter((contact) => match.test(contact.name))
        }

        return (
            <div className='list-contacts' >
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search contatcs'
                        values={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link className="add-contact" to="/create">Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts' >
                        <span>Now showing {showingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}
                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li className='contact-list-item' key={contact.id} >
                            <div className='contact-avatar' style={{ backgroundImage: `url(${contact.avatarURL})` }} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => onDeleteContact(contact)} className='contact-remove' >Remove</button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts