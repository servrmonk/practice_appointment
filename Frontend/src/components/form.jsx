import React, { useContext, useState } from "react";
import Appointment from "../context/context";

export default function Form() {
  const {
    appointment,
    addUser,
    setappoinment,
    deleteAppoinment,
    editAppoinment,
  } = useContext(Appointment);

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");

  const [editToggle, setEditToggle] = useState(false);
  const [editId, setEditId] = useState(null);

  console.log("appointment from db ", appointment);

  function submitHandler(e) {
    e.preventDefault();
    if (!editToggle) {
      const obj = {
        name: name,
        number: number,
        email: email,
        id: Math.ceil(Math.random() * 100),
      };
      addUser(obj);

      setappoinment((data) => [...data, obj]);
    } else {
      const obj = {
        name: name,
        number: number,
        email: email,
      };
      editAppoinment(editId, obj);
      setEditToggle((val) => !val);
    }
  }
  function deleteHandler(id) {
    console.log("inside delHandler ", id);
    setappoinment(appointment.filter((elm) => elm.id !== id));

    deleteAppoinment(id);
  }
  function editHandler(id) {
    setEditToggle((val) => !val);
    console.log("inside editHandler ", id);

    console.log(appointment);
    setEditId(id);
    let userEdit = appointment.find((elm) => elm.id === id);
    console.log("userEdit", userEdit);
    setName(userEdit.name);
    setEmail(userEdit.email);
    setNumber(userEdit.number);
  }

  console.log("editToggle", editToggle);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Enter Name"
        />
        <br />
        <input
          type="number"
          required
          onChange={(e) => setNumber(e.target.value)}
          value={number}
          placeholder="Enter Phone Number"
        />
        <br />
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email"
        />
        <br />

        <button type="submit">
          {editToggle ? "Update Form" : "Submit Form"}
        </button>
      </form>
      <>
        {appointment?.map((elm) => (
          <ul key={elm.id}>
            <li>
              {elm.name} {"  "} {elm.number} {"  "} {elm.email}{" "}
              <button onClick={() => editHandler(elm.id)} type="button">
                🖊
              </button>{" "}
              <button type="button" onClick={() => deleteHandler(elm.id)}>
                ❌
              </button>
            </li>
          </ul>
        ))}
      </>
    </>
  );
}
