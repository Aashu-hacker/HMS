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
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";
import CustomCss from "../../../../components/Global.module.css";
import REACT_APP_BASE_URL from "API/api";
import { useState, useEffect } from "react";
import { useToast } from '@chakra-ui/react';

const Unit = ({ onClose }) => {
  const [units, setUnits] = useState([]);
  const [newUnit, setNewUnit] = useState("");
  const toast = useToast()

  useEffect(() => {
    getUnits()
  }, []);

  function getUnits() {
    fetch(`${REACT_APP_BASE_URL}unit-master`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data)
        setUnits(data.data)
      }
      )
      .catch((error) => console.error("Error fetching units:", error));
  }

  const addUnit = (e) => {
    e.preventDefault();
    if (newUnit.length === 0) {
      toast({
        title: "Unit can't be empty!!",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "bottom"
      });
      return;
    }
    fetch(`${REACT_APP_BASE_URL}unit-master`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newUnit }),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewUnit("");
        getUnits();
        toast({
          title: 'Unit Added!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      })
      .catch((error) => {
        toast({
          title: 'Error in adding Unit!!',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
        console.error("Error adding unit:", error)
      });
  };

  const deleteUnit = async (id) => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}unit-master/delete/${id}`, {
        method: 'PUT',
      });
      if (response.ok) {
        getUnits()
        toast({
          title: 'Unit deleted!!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: "bottom"
        });
      } else {
        toast({
          title: 'Failed to delete unit!!',
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
      <h1>Unit</h1>
      <form>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <TextField
            label="Unit"
            variant="outlined"
            margin="normal"
            value={newUnit}
            onChange={(e) => setNewUnit(e.target.value)} />
          <button className={CustomCss.global_btn} onClick={addUnit}>Add</button>
        </div>
        <Paper>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="Department Table">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {units.map((unit, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{unit.name}</TableCell>
                    <TableCell>
                      <IconButton color="secondary" onClick={() => deleteUnit(unit._id)}>
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
          <button className={CustomCss.global_btn} onClick={() => onClose()}>Close</button>
        </div>
      </form>
    </div>
  );
};

export default Unit;
