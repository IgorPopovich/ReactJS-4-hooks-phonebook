import React, { useState, useEffect } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import css from './App.module.css';
import PropTypes from 'prop-types';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contactsLS = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contactsLS)
    return parsedContacts || []
  })
  const [filter, setFilter] = useState('')

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const deleteContact = (contactId) => {
    // setContacts(contacts.filter(contact => contact.id !== contactId))
    setContacts((prevState) => prevState.filter(contact => contact.id !== contactId))
  }

  const onChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleSubmitForm = (data) => {
    if (contacts.find(contact => contact.name.toLowerCase() === data.name.toLowerCase())) {
        alert(`${data.name} is already in contacts`)
        return;
    }
    // setContacts([data, ...contacts])
    setContacts((prevState) => [data, ...prevState]);
  }

    const normalSize = filter.toLocaleLowerCase()
    const visibleContacts = contacts.filter(contact => 
      contact.name.toLocaleLowerCase().includes(normalSize)
    )



    return (
          <div className={css.main}>
            <h1 className={css.title}>Phonebook</h1>
            <ContactForm addContact={handleSubmitForm} />
            <h2 className={css.title}>Contacts</h2>
            <Filter value={filter} onChange={onChangeFilter} />
            <ContactList contacts={visibleContacts} onDelete={deleteContact} />
          </div>
        );
}

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
}; 