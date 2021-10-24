import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./data.json";
import ReadOnlyRow from "./ReadOnlyRow";



const App = () => {
  const [contacts, setContacts] = useState(data);
  const [countPressDelete, setCountPressDelete] = useState(0)
  const [countPressAdd, setCountPressAdd] = useState(0)
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

const add = () => {
  setCountPressAdd(countPressAdd + 1)
}
const del = () => {
  setCountPressDelete(countPressDelete + 1)
  handleDeleteClick(contacts.length)
}

  return (
    <div className="app">
      <form onSubmit={handleEditFormSubmit}>
        <>
          <div className="listHeader">
            count: {contacts.length}       
          </div>
            {contacts.map((contact) => (
              <div className="listItem">
                <Fragment >
                    <ReadOnlyRow
                      contact={contact}
                      handleDeleteClick={handleDeleteClick}
                    />
                </Fragment>
              </div>
            ))}        
          </>
      </form>

      <form onSubmit={handleAddFormSubmit} style = {{display: "flex", flexDirection: "column", width: 300}}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Название"
          onChange={handleAddFormChange}
        />       
        <button  type="submit" onClick={() => add()}>Добавить {countPressAdd !== 0  && '(' + countPressAdd + ')'}</button>
        <button  type="button" onClick={() => del()}>
          Убрать {countPressDelete !== 0 && '(' + countPressDelete + ')'}
        </button>     
      </form>
    </div>
  );
};

export default App;
