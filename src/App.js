import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact.js'
import * as ContactsAPI from './utils/ContactsAPI.js'


class App extends Component {
  state = {
    contacts: []
  }
  updateListContacts() {
    ContactsAPI.getAll().then((contacts) => {
      this.setState({ contacts })
    })
  }
  componentDidMount() {
    this.updateListContacts()
  }
  removeContact = (contact) => {
    /*
    this.setState((state) => ({
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
    */
    ContactsAPI.remove(contact).then(() => {
      this.updateListContacts();
    })
  }
  render() {
    return (
      <div>
        <Route exact path='/' render={ () => (
          <ListContacts
            onDeleteContact={this.removeContact}
            contacts={this.state.contacts}
          />
        )}
        />
        <Route path='/create' component={CreateContact} />
      </div>
    )
  }
}
export default App

