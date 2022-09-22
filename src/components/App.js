import React,{useState, useEffect} from 'react';
import uuid from 'react-uuid';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './App.css';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
  const addContactHandler = (contact) => {
    setContacts([...contacts,{id:uuid(),...contact}])
  }

  const removeContactList = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  }
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts))
  },[contacts]);

  return (
   <div className='ui container'>
    <Router>
      <Header/>
      <Routes>
        {/* <Route path='/' exact component={ContactList} /> */}
        <Route path="/" exact element={<ContactList contacts={contacts} getContactId={removeContactList}/>} />
        <Route path='/add' element={<AddContact addContactHandler={addContactHandler}/>} />
        <Route path='/contact/:id' element={<ContactDetail/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
