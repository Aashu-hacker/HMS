import React, { useState } from "react";
import NoDataPlaceholder from "@components/NoDataPlaceholder";
import "./CustomField.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  padding: "1.2rem",
  width: "700px",
  height: "620px",
};

const CustomField = ({ details }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSection, setSelectedSection] = useState("basicDetails");
  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div style={style}>
      <div className="header">
        <button onClick={() => setSelectedSection("basicDetails")}>Basic Details</button>
        <button onClick={() => setSelectedSection("educationalDetails")}>Educational Details</button>
        <button onClick={() => setSelectedSection("bankingDetails")}>Banking Details</button>
        <button onClick={() => setSelectedSection("documents")}>Documents</button>
      </div>
      {details && details[selectedSection] ? (
        <div className="container">
          {selectedSection === "basicDetails" && (
            <div className="basicDetails">
             <div>
             {details.documents ? (
                <img
                  className="pass-port"
                  // src={details.documents.photo}
                  src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  alt=""
                  />
              ) : null}
              <h6 className="name">
                {details.basicDetails.firstName} {details.basicDetails.middleName}{" "}
                {details.basicDetails.lastName} <span>({details.basicDetails.staffType})</span>
              </h6>
             </div>
              <div>
                <p><span>Address:</span> {details.addressDetails.address}</p>
                <p><span>City:</span> {details.addressDetails.city}</p>
                <p><span>State:</span> {details.addressDetails.state}</p>
                <p><span>Pincode:</span> {details.addressDetails.pincode}</p>
                <p><span>Mobile:</span> {details.basicDetails.mobile}</p>
                <p><span>Alternate Mobile:</span> {details.basicDetails.alternateMobile}</p>
                <p><span>Email</span>: {details.basicDetails.email}</p>
                <p><span>Alternate Email:</span> {details.basicDetails.alternateEmail}</p>
                <p><span>Aadhar:</span> {details.basicDetails.aadhar}</p>
              </div>
            </div>
          )}

          {selectedSection === "educationalDetails" && (
            <div className="educationalDetails">
              {details.educationalDetails.SSC ? (
                
                <div>
                  <h4> SSC: </h4>
                  <p><span>Qual:</span>{details.educationalDetails.SSC.degree}</p>
                  <p><span>Institute:</span> {details.educationalDetails.SSC.institute}</p>
                  <p><span>Year: </span>{details.educationalDetails.SSC.year}</p>
                  <p><span>CGPA:</span> {details.educationalDetails.SSC.CGPA}</p>
                </div>
              ) : null}
              {details.educationalDetails.HSC ? (
                <div>
                  <h4> HSC: </h4>
                  <p><span>Qual:</span>{details.educationalDetails.HSC.degree}</p>
                  <p> <span>Institute:</span> {details.educationalDetails.HSC.college}</p>
                  <p> {details.educationalDetails.HSC.university}</p>
                  <p><span>Year: </span> {details.educationalDetails.HSC.year}</p>
                  <p><span>CGPA:</span> {details.educationalDetails.HSC.CGPA}</p>
                </div>
              ) : null}
              {details.educationalDetails.graduation ? (
                <div>
                  <h4> Graduation: </h4>
                  <p><span>Qual:</span>{details.educationalDetails.graduation.degree}</p>
                  <p> <span>Institute:</span> {details.educationalDetails.graduation.college}</p>
                  <p> {details.educationalDetails.graduation.university}</p>
                  <p> <span>Year: </span>{details.educationalDetails.graduation.year}</p>
                  <p><span>CGPA:</span> {details.educationalDetails.graduation.CGPA}</p>
                </div>
              ) : null}
              {details.educationalDetails.postGraduation ? (
                <div>
                  <h4> Post Graduation: </h4>
                  <p><span>Qual:</span>{details.educationalDetails.postGraduation.degree}</p>
                  <p><span>Institute:</span>  {details.educationalDetails.postGraduation.college}</p>
                  <p> {details.educationalDetails.postGraduation.university}</p>
                  <p> <span>Year: </span>{details.educationalDetails.postGraduation.year}</p>
                  <p><span>CGPA:</span> {details.educationalDetails.postGraduation.CGPA}</p>
                </div>
              ) : null}
              {details.educationalDetails.other ? (
                <div>
                  <h4> Other: </h4>
                  <p><span>Qual:</span>{details.educationalDetails.other.degree}</p>
                  <p><span>Institute:</span>  {details.educationalDetails.other.college}</p>
                  <p> {details.educationalDetails.other.university}</p>
                  <p><span>Year: </span> {details.educationalDetails.other.year}</p>
                  <p><span>CGPA:</span> {details.educationalDetails.other.CGPA}</p>
                </div>
              ) : null}
            </div>
          )}

          {selectedSection === "bankingDetails" && (
            <div className="bankingDetails">
              {details.bankingDetails ? (
                <div>
                  <h4>Banking Details</h4>
                  <p><span>Account Number: </span>{details.bankingDetails.accountNumber}</p>
                  <p><span>Bank Name: </span>{details.bankingDetails.bankName}</p>
                  <p><span>Branch Name: </span>{details.bankingDetails.branchName}</p>
                  <p><span>IFSC Code: </span>{details.bankingDetails.IFSC}</p>
                </div>
              ) : null}
            </div>
          )}

          {selectedSection === "documents" && (
            
             <>
             {details.documents ? (
                  <div>
                    <h4>Documents</h4>
                    <div className="image-conatainer">
                      <div>
                        <img
                          src={details.documents.HSC}
                          alt=""
                          onClick={() => openModal(details.documents.HSC)}
                        />
                        <h5>HSC</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.SSC}
                          alt=""
                          onClick={() => openModal(details.documents.SSC)}
                        />
                        <h5>SSC</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.addharCard}
                          alt=""
                          onClick={() => openModal(details.documents.addharCard)}
                        />
                        <h5>Aadhar Card</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.bank}
                          alt=""
                          onClick={() => openModal(details.documents.bank)}
                        />
                        <h5>Bank</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.graduation}
                          alt=""
                          onClick={() => openModal(details.documents.graduation)}
                        />
                        <h5>Graduation</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.joining}
                          alt=""
                          onClick={() => openModal(details.documents.joining)}
                        />
                        <h5>Joining</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.postGraduation}
                          alt=""
                          onClick={() => openModal(details.documents.postGraduation)}
                        />
                        <h5>Post Graduation</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.panCard}
                          alt=""
                          onClick={() => openModal(details.documents.panCard)}
                        />
                        <h5>Pan Card</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.passport}
                          alt=""
                          onClick={() => openModal(details.documents.passport)}
                        />
                        <h5>Passport</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.revealing}
                          alt=""
                          onClick={() => openModal(details.documents.revealing)}
                        />
                        <h5>Revealing</h5>
                      </div>
                      <div>
                        <img
                          src={details.documents.other}
                          alt=""
                          onClick={() => openModal(details.documents.other)}
                        />
                        <h5>Other</h5>
                      </div>
                    </div>
                  </div>
                ) : null}
             </>
              
          )}
        </div>
      ) : (
        <NoDataPlaceholder />
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomField;
