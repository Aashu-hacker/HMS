import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { IconButton } from '@mui/material'
import DeleteIcon from "@material-ui/icons/Delete";
import CustomCss from "../../../../components/Global.module.css";
import { useState } from "react";
import REACT_APP_BASE_URL from "API/api";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const Specimen = () => {
  const [specimen, setSpecimen] = useState([])
  const [newSpecimen, setNewSpecimen] = useState("");
  const toast = useToast();

  async function getSpecimenData() {
    try {
      const respose = await fetch(`${REACT_APP_BASE_URL}specimen-master`)
      if (respose.ok) {
        const data = await respose.json()
        setSpecimen(data.specimen)
      }
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getSpecimenData()
  }, []);

  const addSpecimen = (e) => {
    e.preventDefault();
    if (newSpecimen.length === 0) {
      toast({
        title: "Unit can't be empty!!",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }
    fetch(`${REACT_APP_BASE_URL}specimen-master`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newSpecimen }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewSpecimen("");
        getSpecimenData();
        toast({
          title: 'Specimen Added!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      })
      .catch((error) => {
        toast({
          title: 'Error in adding Specimen!!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
        console.error("Error adding specimen:", error)
      });
  };

  const deleteSpecimen = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}specimen-master/delete/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        getSpecimenData()
        toast({
          title: 'Specimen deleted!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      } else {
        toast({
          title: 'Failed to delete specimen!!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      }
    } catch (error) {
      toast({
        title: 'Server error!!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: "bottom"
      });
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "30px",
      }}
    >
      <h1>Specimen</h1>
      <form>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextField label="Specimen" variant="outlined" margin="normal" value={newSpecimen} onChange={(e) => setNewSpecimen(e.target.value)} />
          <button
            className={CustomCss.global_btn}
            onClick={addSpecimen}
          >
            Add
          </button>
        </div>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Department Table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Specimen</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {specimen.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => deleteSpecimen(item._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <div style={{ marginTop: "10px" }}>
          <button className={CustomCss.global_btn}>Save</button>
          <button className={CustomCss.global_btn}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Specimen;
