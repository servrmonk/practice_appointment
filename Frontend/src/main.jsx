import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AppointmentProvider}  from './context/context'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AppointmentProvider>
    <App />
    </AppointmentProvider>

)
