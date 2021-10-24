import React from "react";

const ReadOnlyRow = ({ contact, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>     
    </tr>
  );
};
export default ReadOnlyRow;