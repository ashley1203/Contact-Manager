import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/Navbar';
import ContactList from './Components/Contacts/contactlist/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import EditContact from './Components/Contacts/EditContact/EditContact';
import BorderExample from './Components/spinner/spinner';

let App = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path='/' element={<Navigate to={'/contacts/list'} />} />
        <Route path='/contacts/list' element={<ContactList />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/view/:contactId' element={<ViewContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
