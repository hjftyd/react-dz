import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import ReadOnlyRow from "./ReadOnlyRow";



const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,    
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
       
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                  <ReadOnlyRow
                    contact={contact}
                    handleDeleteClick={handleDeleteClick}
                  />
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="write something"
          onChange={handleAddFormChange}
        />       
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
