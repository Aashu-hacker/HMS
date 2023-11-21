import React from "react";
import Page from '@layout/Page';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

const AssetRegister = () => {
  return (
    <Page title="Asset Register">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>SN</TableCell>
              <TableCell>Asset No.</TableCell>
              <TableCell>Assett Code</TableCell>
              <TableCell>date of Purchase</TableCell>
              <TableCell>Party name</TableCell>
              <TableCell>Model Name</TableCell>
              <TableCell>Date of Installation</TableCell>
              <TableCell>warrenty</TableCell>
              <TableCell>RF ID</TableCell>
              <TableCell>Location/ Department</TableCell>
              <TableCell>AMC</TableCell>
              <TableCell>Purchase Report</TableCell>
              <TableCell>Installation Certificate</TableCell>
              <TableCell>Service Report</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>123</TableCell>
              <TableCell>12/12/2021</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>12/12/2021</TableCell>
              <TableCell>12/12/2021</TableCell>
              <TableCell>123</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>Abc</TableCell>
              <TableCell>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  )
}

export default AssetRegister