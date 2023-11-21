import React, { useState,useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BasicDetails from "../BasicDetails";
import EducationalDetails from "../EducationalDetails";
import AddressDetails from "../AddressDetails";
import BankingDetails from "../BankingDetails";
import Page from "@layout/Page";
import DocumentUpload from "../DocumentsUpload";
import custom from "../../../components/Global.module.css";
import Widget from "@components/Widget";
import styled from "styled-components/macro";
import { Header } from "@components/Widget/style";
import WidgetBody from "@components/Widget/WidgetBody";
import GenderNav from "@components/GenderNav";
import theme from "styled-theming";
import Modal from "@mui/material/Modal";
// import DoctorData from "@components/DoctorData";
import './Consultants.css'
import NoDataPlaceholder from "@components/NoDataPlaceholder";
import REACT_APP_BASE_URL from "API/api";
import {
  light,
  dark,
  textSizes,
  colors,
  fonts,
  flex,
  breakpoints,
} from "@styles/vars";
import useWindowSize from "@hooks/useWindowSize";
import GroupSeparator from "@ui/GroupSeparator";
import CustomField from "@components/customField/CustomField";

const AddForm = () => {
  const [value, setValue] = useState(0);
  const [toggle, setToggle] = useState("BasicDetails");
  const type = "consultant";
  return (
    <>
      <div className="staff-nav">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            className="label"
            label="Basic Details"
            onClick={() => setToggle("BasicDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Address Details"
            onClick={() => setToggle("AddressDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Educational Details"
            onClick={() => setToggle("EducationalDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Banking Details"
            onClick={() => setToggle("BankingDetails")}
          />
          <BottomNavigationAction
            className="label"
            label="Document Upload"
            onClick={() => setToggle("DocumentUpload")}
          />
        </BottomNavigation>
      </div>
      <p
        style={{
          color: "rgb(8, 155, 171)",
          fontSize: "1.2rem",
          fontWeight: "650",
          margin: "1rem 0",
        }}
      >
        {toggle}
      </p>
      {toggle === "BasicDetails" ? (
        <BasicDetails type={type} />
      ) : toggle === "EducationalDetails" ? (
        <EducationalDetails type={type} />
      ) : toggle === "AddressDetails" ? (
        <AddressDetails type={type} />
      ) : toggle === "BankingDetails" ? (
        <BankingDetails type={type} />
      ) : toggle === "DocumentUpload" ? (
        <DocumentUpload />
      ) : null}
    </>
  );
};


const SearchBarForm = styled.form`
  height: 40px;
  margin: 0 24px;
  border-radius: 8px;
  padding: 0 22px;
  background-color: ${theme("theme", {
    light: light.bodyBg,
    dark: dark.bodyBg,
  })};
  display: flex;
  flex-grow: 1;
  align-items: center;

  ${breakpoints.tablet} {
    height: 60px;
    margin: 0 2px;
  }

  label {
    font-size: ${textSizes["12"]};
    margin-right: 24px;
    color: ${colors.gray};
  }

  input {
    width: 100%;
    font-size: ${textSizes["16"]};
    font-family: ${fonts.accent};
    &::placeholder {
      color: ${light.text};
    }
  }

  button[type="reset"] {
    opacity: 0;
    transition: opacity var(--transition);

    &.visible {
      opacity: 1;
    }
  }
`;

export const ListHeader = styled(Header)`
  padding: 24px 0 20px;

  .wrapper {
    padding: 0 24px;
    ${flex.col};
    gap: 20px;
  }

  .wrapper,
  form {
    flex-grow: 1;
    width: 100%;
  }

  ${breakpoints.tablet} {
    .wrapper {
      flex-direction: row;
      ${flex.between};

      .gender {
        width: 300px;
      }
    }
  }
`;

const Consultant = () => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const window = useWindowSize();
  const isMobile = window.width < 767.98;
  const [DoctorData, setDoctorData] = useState([]);


  const handleReset = () => {
    console.log("reset");
  };

  const openForm = () => {
    setButtonToggle(true);
  };

  const close = () => {
    setButtonToggle(false);
  };


  const handleOpen = (item) => {
    setOpen(true);
    setDetails(item);
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(null);
  };

  const fetchConsultant = async () => {
    try {
      const res = await fetch(`${REACT_APP_BASE_URL}/consultant`);
      const data = await res.json();
      console.log("consultant data", data);
      setDoctorData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchConsultant();
  }, []);


  return (
    <Page title="Consultant Staff">
      {buttonToggle ? (
        <>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className={custom.global_btn} onClick={close}>
              close
            </button>
          </div>
          <AddForm />
        </>
      ) : (
        <div className="add-staff">
          <Widget name="DoctorsList">
            <ListHeader>
              <div className="wrapper">
                <button className={custom.global_btn} onClick={openForm}>
                  +Add Consultant
                </button>
                <GenderNav state="male" handler="" />
              </div>
              <SearchBarForm action="#" method="get">
                <label className="search_bar-label" htmlFor="widgetSearch">
                  <i className="icon icon-search"></i>
                </label>
                <input
                  type="search"
                  id="widgetSearch"
                  //value={value}
                  placeholder="Search doctors"
                  //onChange={e => handler(e.target.value)}
                />
                <button
                  className={"value" !== "" ? "visible" : ""}
                  type="reset"
                  onClick={handleReset}
                >
                  <i className="icon icon-close" />
                </button>
              </SearchBarForm>
            </ListHeader>
            <WidgetBody style={{ padding: 0 }}>
              <GroupSeparator text="Doctor" />
              <div>
              {DoctorData &&
          DoctorData.map((item, index) => (
                <div key={index} className="staff_card">
                    <div className="profile">
                        {
                            item.documents ? (
                                <img
                                    // src={item.documents.photo}
                                    src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                    alt="profile"
                                    className="profile_img"
                                />
                            ) : (
                                <img
                                    src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                    alt="profile"
                                    className="profile_img"
                                />
                            )
                        }
                        <h5>
                            {item.basicDetails.firstName} {item.basicDetails.middleName}{" "}
                            {item.basicDetails.lastName}
                        </h5>
                    </div>
                    <div className="staff_details">
                        <div className="p">
                            <p>{item.basicDetails.mobile}</p>
                            <p>{item.basicDetails.email}</p>
                        </div>
                        <button className="viewBtn" onClick={() => handleOpen(item)}>
                            View Details
                        </button>
                    </div>
                </div>
            ))}
              </div>
            </WidgetBody>
          </Widget>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
      <CustomField details={details}/>
      </Modal>

    </Page>
  );
};

export default Consultant;



