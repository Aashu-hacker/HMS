import Page from '@layout/Page'
import React from 'react'
import Provisional from './appointmentList/Provisional';
import Confirm from './appointmentList/Confirm';
import { useState } from 'react';
import styles from '../../components/Global.module.css'
import { useNavigate } from 'react-router';
function AppointmetScreen() {
  const [active, setActive] = useState(null);
  const [title, setTitle] = useState("Appointments");
  const navigate = useNavigate()

  function handleProvisional() {
    setActive(true);
    setTitle("Provisional Appointments");
  }

  function handleConfirm() {
    setActive(false);
    setTitle("Confirm Appointments");
  }
  

  return (
    <Page title={title}>
      <div>
        <div style={{ marginBottom: '20px' }}>
          <button className={styles.global_btn} >+ Appointment Setup</button>
          <button className={styles.global_btn} onClick={() => navigate("/patient_list")}>Book Appointment</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <button
            className={`${styles.global_btn} ${active === true ? styles.activeButton : ''}`}
            style={{ width: "50%" }}
            onClick={handleProvisional}
          >
            Provisional Appointment
          </button>
          <button
            className={`${styles.global_btn} ${active === false ? styles.activeButton : ''}`}
            style={{ width: "50%" }}
            onClick={handleConfirm}
          >
            Confirm Appointment
          </button>
        </div>
        {active == null ? "" : active === true ? <Provisional /> : <Confirm />}
      </div>
    </Page>
  );
}

export default AppointmetScreen;
