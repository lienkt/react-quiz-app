import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import DescriptionIcon from "@mui/icons-material/Description";
import { CSVLink } from "react-csv";

import type { RootState } from "../../store";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/formatTimer";
import type { ILeaderboards } from "../../types";

const csvHeaders = ["ID", "First Name", "Last Name", "Email", "Score"];

function Leaderboard() {
  const navigate = useNavigate();
  const leaderboards = useSelector(
    (state: RootState) => state.score.leaderboards
  );

  const csvData = React.useMemo(() => {
    const data = leaderboards.map((item: ILeaderboards) => {
      return [item.id, item.first_name, item.last_name, item.email, item.score];
    });
    return [csvHeaders, ...data];
  }, [leaderboards]);

  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%" }}>
        <Typography variant="h3" align="center" gutterBottom>
          Leaderboard
        </Typography>
      </Box>

      <Box sx={{ textAlign: "right", mb: 3 }}>
        <CSVLink
          data={csvData}
          filename={"leaderboard_" + formatDate(new Date()) + ".csv"}
        >
          <Button
            size="small"
            variant="contained"
            startIcon={<DescriptionIcon />}
            sx={{ mr: 2 }}
          >
            Export CSV
          </Button>
        </CSVLink>

        <Button size="small" variant="outlined" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Box>

      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboards.map((row: ILeaderboards) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.first_name}
                  </TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default Leaderboard;
