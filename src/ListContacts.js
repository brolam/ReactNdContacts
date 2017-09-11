import React, {Component} from 'react'

class ListContacts extends Component{
    render() {
        console.log('Props', this.props)
        return(
            <ol className='contact-list'>
                {this.getContacts().map((contact) => (
                    <li className='contact-list-item' key={contact.id} >
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }}/>
                        <div className='contact-details'>
                            <p>{contact.name}</p>
                            <p>{contact.email}</p>
                        </div>
                        <button className='contact-remove'>Remove</button>
                    </li>
                ))}
            </ol>
        )
    }

    getContacts(){
        return this.props.contacts
    };

}



export default ListContacts