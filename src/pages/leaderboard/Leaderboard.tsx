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
      !leaderboardChartData ||
      Object.keys(leaderboardChartData).length === 0
    ) {
      return null;
    }

    // Get all unique days and sort them
    const allDays = Array.from(
      new Set(
        Object.values(leaderboardChartData)
          .flat()
          .map((item) => item.day),
      ),
    ).sort((a, b) => Number(a) - Number(b));

    // Create series data for each email from leaderboardChartData
    // Align each user's scores with the corresponding days
    const series = Object.entries(leaderboardChartData).map(
      ([email, scoreItems]) => {
        // Create a map of day -> score for this email
        const dayScoreMap = new Map(
          scoreItems.map((item) => [item.day, item.score]),
        );
        // Create data array aligned with allDays
        const data = allDays.map((day) => dayScoreMap.get(day) ?? null);
        return {
          name: email,
          data,
        };
      },
    );

    // Create time labels from days (showing attempt number)
    const timeLabels = allDays.map((_, index) => {
      const num = index + 1;
      const suffix =
        num === 1 ? "st" : num === 2 ? "nd" : num === 3 ? "rd" : "th";
      return `${num}${suffix}`;
    });

    const options: ApexOptions = {
      chart: {
        type: "line",
        height: 350,
        toolbar: {
          show: true,
        },
      },
      colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"],
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        title: {
          text: "Time",
        },
        categories: timeLabels,
      },
      yaxis: {
        title: {
          text: "Score",
        },
      },
      title: {
        text: "Player Scores Over Time",
        align: "left",
      },
      legend: {
        position: "top",
      },
      grid: {
        borderColor: "#e0e0e0",
      },
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
