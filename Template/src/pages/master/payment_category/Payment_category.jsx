import React, { useState } from "react";
import style from "./Payment_category.module.css";
import PayeeParent from "./PayeeParent";
import PatientCategory from "./PatientCategory";
import PatientPayee from "./PatientPayee";
import ParentGroup from "./ParentGroup";
import Custom from "../../../components/Global.module.css";
import Page from "@layout/Page";

const Payment_category = () => {
  const [activeButton, setActiveButton] = useState("Payee Parent");

  return (
    <Page title={activeButton}>
      <div className={style.all_btn}>
        <button onClick={() => setActiveButton("Payee Parent")}>Payee Parent</button>
        <button onClick={() => setActiveButton("Patient Category")}>Patient Category</button>
        <button onClick={() => setActiveButton("Patient Payee")}>Patient Payee</button>
        <button onClick={() => setActiveButton("Parent Group")}> Parent Group</button>
      </div>
      {activeButton === "Patient Category" && <PatientCategory />}
      {activeButton === "Payee Parent" && <PayeeParent />}
      {activeButton === "Patient Payee" && <PatientPayee />}
      {activeButton === "Parent Group" && <ParentGroup />}
    </Page>
  );
};

export default Payment_category;
