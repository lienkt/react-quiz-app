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
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

import type { RootState } from "../../store";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";
import { formatDate } from "../../utils/formatTimer";
import type { ILeaderboards } from "../../types";

const csvHeaders = ["ID", "First Name", "Last Name", "Email", "Score"];

function Leaderboard() {
  const navigate = useNavigate();
  const leaderboards = useSelector(
    (state: RootState) => state.score.leaderboards,
  );
  const leaderboardChartData = useSelector(
    (state: RootState) => state.score.leaderboardChartData,
  );

  const csvData = React.useMemo(() => {
    const data = leaderboards.map((item: ILeaderboards) => {
      return [item.id, item.first_name, item.last_name, item.email, item.score];
    });
    return [csvHeaders, ...data];
  }, [leaderboards]);

  // Prepare data for line chart
  const chartData = React.useMemo(() => {
    if (
      !leaderboardChartData || // check if null or undefined
      // Object.keys(leaderboardChartData).length === 0 || // check if empty object
      // Object.values(leaderboardChartData).every((arr) => arr.length === 0) // check if all arrays are empty
      !Object.values(leaderboardChartData).some((scores) => scores.length > 0)
    ) {
      return null;
    }

    // let maxAttempts = 0;
    // Create series data for each email with scores in order
    // Filter out emails with no scores
    const series = Object.entries(leaderboardChartData)
      .filter(([_, scores]) => scores.length > 0)
      .map(([email, scoreItems]) => {
        const data = scoreItems.map((item) => item.score);
        // if (data.length > maxAttempts) maxAttempts = data.length;
        return {
          name: email,
          data,
        };
      });

    // Create time labels (showing attempt number)
    const maxAttempts = Math.max(
      ...Object.values(leaderboardChartData).map((items) => items.length),
    );
    const timeLabels = Array.from({ length: maxAttempts }, (_, index) => {
      const num = index + 1;
      const suffix =
        num === 1 ? "st" : num === 2 ? "nd" : num === 3 ? "rd" : "th";
      return `${num}${suffix}`;
    });

    const options: ApexOptions = {
      chart: { type: "line", height: 350, toolbar: { show: true } },
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"],
      stroke: { curve: "smooth", width: 2 },
      xaxis: { title: { text: "Time" }, categories: timeLabels },
      yaxis: { title: { text: "Score" } },
      title: { text: "Player Scores Over Time", align: "left" },
      legend: { position: "top" },
      grid: { borderColor: "#e0e0e0" },
    };

    return {
      series,
      options,
    };
  }, [leaderboardChartData]);

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

      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          {chartData && chartData.series.length > 0 ? (
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />
          ) : (
            <Typography align="center" color="textSecondary" sx={{ py: 4 }}>
              No leaderboard data available
            </Typography>
          )}
        </Paper>
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
