import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  InputLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Page from "@layout/Page";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import REACT_APP_BASE_URL from "../API/api";

const mapFunctionToBoolean = (functionValue) => {
  switch (functionValue) {
    case "lab":
      return {
        isLab: true,
        isPharmacy: false,
        isSpecialty: false,
        isRadiology: false,
      };
    case "pharmacy":
      return {
        isLab: false,
        isPharmacy: true,
        isSpecialty: false,
        isRadiology: false,
      };
    case "specialty":
      return {
        isLab: false,
        isPharmacy: false,
        isSpecialty: true,
        isRadiology: false,
      };
    case "radiology":
      return {
        isLab: false,
        isPharmacy: false,
        isSpecialty: false,
        isRadiology: true,
      };
    default:
      return {
        isLab: false,
        isPharmacy: false,
        isSpecialty: false,
        isRadiology: false,
      };
  }
};

const DepartmentSetup = () => {
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showData, setShowData] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const toast = useToast();

  const [departmentData, setDepartmentData] = useState({
    departmentName: "",
    departmentCode: "",
    departmentType: "",
    serviceLedger: "",
    status: "",
    departmentFunction: {
      isLab: false,
      isPharmacy: false,
      isSpecialty: false,
      isRadiology: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({
      ...departmentData,
      [name]: value,
    });
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}department-setup`);
      if (response.ok) {
        const data = await response.json();
        setShowData(data.data);
      } else {
        console.error("Failed to fetch departments");
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}department-setup/delete/${id}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        fetchDepartments();
        toast({
          title: "Department deleted!!",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        setOpenDeleteModal(false);
      } else {
        toast({
          title: "Failed to delete department!!",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      toast({
        title: "Server error!!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const openRegistration = () => {
    setOpenRegistrationModal(true);
  };

  const openEditModalFun = (department) => {
    setSelectedDepartment(department);
    setDepartmentData({
      departmentName: department.departmentName,
      departmentCode: department.departmentCode,
      departmentType: department.departmentType,
      serviceLedger: department.serviceLedger,
      status: department.status,
      departmentFunction: department.departmentFunction.isLab
        ? "lab"
        : department.departmentFunction.isPharmacy
          ? "pharmacy"
          : department.departmentFunction.isSpecialty
            ? "specialty"
            : department.departmentFunction.isRadiology
              ? "radiology"
              : "",
    });
    setOpenEditModal(true);
  };

  const openDeleteModalFun = (id) => {
    setDeleteId(id);
    setOpenDeleteModal(true);
  };

  const closeRegistration = () => {
    setOpenRegistrationModal(false);
    setOpenEditModal(false);
    setOpenDeleteModal(false);
    setDepartmentData({
      departmentName: "",
      departmentCode: "",
      departmentType: "",
      serviceLedger: "",
      status: "",
      departmentFunction: {
        isLab: false,
        isPharmacy: false,
        isSpecialty: false,
        isRadiology: false,
      },
    });
  };

  const generateUniqueDesignationCode = (name, existingCodes) => {
    const cleanedName = name.trim().toUpperCase().slice(0, 5);
    const matchingCodes = existingCodes.filter((code) =>
      code.startsWith(cleanedName)
    );
    let serialNumber = 1;
    if (matchingCodes.length > 0) {
      const serialNumbers = matchingCodes.map((code) => {
        const suffix = code.replace(cleanedName, "").trim();
        return parseInt(suffix, 10);
      });
      serialNumber = Math.max(...serialNumbers) + 1;
    }
    return `${cleanedName}${serialNumber.toString().padStart(3, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCode = generateUniqueDesignationCode(
      departmentData.departmentName,
      showData.map((data) => data.departmentCode)
    );

    const departmentDataToSend = {
      ...departmentData,
      departmentFunction: mapFunctionToBoolean(
        departmentData.departmentFunction
      ),
      departmentCode: newCode,
    };
    departmentData.departmentCode = newCode;
    try {
      await axios.post(
        `${REACT_APP_BASE_URL}department-setup`,
        departmentDataToSend
      );
      setOpenRegistrationModal(false);
      fetchDepartments();
      setDepartmentData({
        departmentName: "",
        departmentCode: "",
        departmentType: "",
        serviceLedger: "",
        status: "",
        departmentFunction: {
          isLab: false,
          isPharmacy: false,
          isSpecialty: false,
          isRadiology: false,
        },
      });
      toast({
        title: "Department Added!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Server error!!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const departmentDataToSend = {
      ...selectedDepartment,
      ...departmentData,
      departmentFunction: mapFunctionToBoolean(
        departmentData.departmentFunction
      ),
    };
    try {
      await axios.put(
        `${REACT_APP_BASE_URL}department-setup/${selectedDepartment._id}`,
        departmentDataToSend
      );
      setOpenEditModal(false);
      fetchDepartments();
      toast({
        title: "Department Updated!!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Server error!!",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <Page title="Department Setup">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
          <Button
            variant="contained"
            onClick={openRegistration}
            style={{ backgroundColor: "rgb(8,155,171)", color: "white" }}>
            + Add
          </Button>
          <Modal
            open={openRegistrationModal}
            onClose={closeRegistration}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "30px",
              }}>
              <h1>Add Department</h1>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Department Name"
                  variant="outlined"
                  margin="normal"
                  name="departmentName"
                  value={departmentData.departmentName}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      departmentName: e.target.value,
                    })
                  } />
                <TextField
                  fullWidth
                  label="Department Code"
                  variant="outlined"
                  margin="normal"
                  name="departmentCode"
                    disabled
                  value={generateUniqueDesignationCode(departmentData.departmentName, showData.map((data) => data.departmentCode)) ||""}   
                />
                <TextField
                  fullWidth
                  label="Department Type"
                  variant="outlined"
                  margin="normal"
                  name="departmentType"
                  value={departmentData.departmentType}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      departmentType: e.target.value,
                    })
                  } />
                <TextField
                  fullWidth
                  label="Department Ledger"
                  variant="outlined"
                  margin="normal"
                  name="serviceLedger"
                  value={departmentData.serviceLedger}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      serviceLedger: e.target.value,
                    })
                  } />
                <FormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel>Department Function</InputLabel>
                  <Select
                    name="departmentFunction"
                    label="Department Function"
                    value={departmentData.departmentFunction}
                    onChange={handleInputChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="lab">Is LAB</MenuItem>
                    <MenuItem value="speciality">Is Specilaity</MenuItem>
                    <MenuItem value="pharmacy">Is Pharmacy</MenuItem>
                    <MenuItem value="radilogy">Is Radilogy</MenuItem>
                  </Select>
                </FormControl>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    value={departmentData.status}
                    onChange={
                      (e) =>
                        setDepartmentData({
                          ...departmentData,
                          status: e.target.value,
                        })
                    }>
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active" />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive" />
                  </RadioGroup>
                </FormControl>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(8,155,171)",
                      color: "white",
                      marginRight: "10px",
                    }}>
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(8,155,171)",
                      color: "white",
                    }}
                    onClick={() => closeRegistration()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <Paper style={{ width: "100%", marginTop: "20px", overflowX: "auto" }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Department Table">
              <TableHead
                sx={{ backgroundColor: "rgb(8,155,171)", color: "white" }}
              >
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Department Name</TableCell>
                  <TableCell>Department Code</TableCell>
                  <TableCell>Department Type</TableCell>
                  <TableCell>Service Ledger</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showData.length <= 0 && (
                  <TableRow>
                    <TableCell colSpan="5">No Data Found</TableCell>
                  </TableRow>
                )}
                {showData.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.departmentName}</TableCell>
                      <TableCell>{item.departmentCode}</TableCell>
                      <TableCell>{item.departmentType}</TableCell>
                      <TableCell>{item.serviceLedger}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => openEditModalFun(item)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => openDeleteModalFun(item._id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Modal
            open={openEditModal}
            onClose={closeRegistration}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "30px",
              }}>
              <h1>Edit Department</h1>
              <form onSubmit={handleEditSubmit}>
                <TextField
                  fullWidth
                  label="Department Name"
                  variant="outlined"
                  margin="normal"
                  name="departmentName"
                  value={departmentData.departmentName}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      departmentName: e.target.value,
                    })
                  } />
                <TextField
                  fullWidth
                  label="Department Code"
                  variant="outlined"
                  margin="normal"
                  name="departmentCode"
                  value={departmentData.departmentCode}
                  disabled
                />
                <TextField
                  fullWidth
                  label="Department Type"
                  variant="outlined"
                  margin="normal"
                  name="departmentType"
                  value={departmentData.departmentType}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      departmentType: e.target.value,
                    })
                  } />
                <TextField
                  fullWidth
                  label="Department Ledger"
                  variant="outlined"
                  margin="normal"
                  name="serviceLedger"
                  value={departmentData.serviceLedger}
                  onChange={(e) =>
                    setDepartmentData({
                      ...departmentData,
                      serviceLedger: e.target.value,
                    })
                  } />
                <FormControl margin="normal" fullWidth variant="outlined">
                  <InputLabel>Department Function</InputLabel>
                  <Select
                    name="departmentFunction"
                    label="Department Function"
                    value={departmentData.departmentFunction}
                    onChange={handleInputChange}>
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="lab">Is LAB</MenuItem>
                    <MenuItem value="speciality">Is Specilaity</MenuItem>
                    <MenuItem value="pharmacy">Is Pharmacy</MenuItem>
                    <MenuItem value="radilogy">Is Radilogy</MenuItem>
                  </Select>
                </FormControl>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="status"
                    value={departmentData.status}
                    onChange={(e) =>
                      setDepartmentData({
                        ...departmentData,
                        status: e.target.value,
                      })
                    }>
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active" />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
                      label="Inactive" />
                  </RadioGroup>
                </FormControl>
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(8,155,171)",
                      color: "white",
                      marginRight: "10px",
                    }}>
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(8,155,171)",
                      color: "white",
                    }}
                    onClick={() => closeRegistration()}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
          <Modal
            open={openDeleteModal}
            onClose={closeRegistration}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div
              style={{
                borderRadius: "10px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "30px",
              }}>
              <h2>Delete Department?</h2>
              <div style={{ marginTop: "30px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    marginRight: "10px",
                  }}
                  onClick={() => deleteDepartment(deleteId)}>
                  Yes
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "white", color: "gray" }}
                  onClick={() => closeRegistration()}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </Paper>
      </div>
    </Page>
  );
};

export default DepartmentSetup;
