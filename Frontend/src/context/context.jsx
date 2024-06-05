import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Appointment = createContext();
export const AppointmentProvider = ({ children }) => {
  const [appointment, setappoinment] = useState([]);

  async function getAppointment() {
    const url = "http://localhost:3000/api/users";
    try {
      const response = await axios.get(url);
      // console.log(response.data);
      setappoinment(response.data);
    } catch (err) {
      console.log("Error in fetching the user in context", err);
    }
  }
  async function addUser(data) {
    const url = "http://localhost:3000/api/add-user";
    try {
      const response = await axios.post(url, data);
      console.log(response);
    } catch (err) {
      console.log("Error in addUser in context", err);
    }
  }
  async function deleteAppoinment(id) {
    const url = `http://localhost:3000/api/delete-user/${id}`;
    try {
      const response = await axios.delete(url);
      console.log(response);
      // getAppointment();
    } catch (err) {
      console.log("Error in deleting the user in context", err);
    }
  }

  const editAppoinment = async (id, data) => {
    const url = `http://localhost:3000/api/edit-user/${id}`;
    try {
      console.log("id and data in edit appoinment is ", id, data);
      const response = await axios.patch(url, data);
      console.log(response);
      getAppointment();
    } catch (err) {
      console.log("Error in editing the user in context", err);
    }
  };
  useEffect(() => {
    getAppointment();
  }, []);
  console.log("Appoinment in context ",appointment);
  return (
    <Appointment.Provider
      value={{
        appointment,
        setappoinment,
        deleteAppoinment,
        editAppoinment,
        addUser,
      }}
    >
      {children}
    </Appointment.Provider>
  );
};
export default Appointment;
