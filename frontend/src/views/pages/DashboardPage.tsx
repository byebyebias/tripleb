import { Typography, Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import GraphGrid from "../components/Dashboard/GraphGrid/GraphGrid";
import Overview from "../components/Dashboard/Overview/Overview";
import LetterGrade from "../components/Dashboard/LetterGrade/LetterGrade";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import ExportJSONButton from "../components/Dashboard/ExportJsonButton/ExportJsonButton";
import BackgroundImage from "../assets/PurpleGradient.png";


function DashboardPage() {
  const location = useLocation();
  const { dashboardData } = location.state;

  return (
    <>
      <Navbar />
      <main 
      role="main"
      style={{
        backgroundImage: `url(${BackgroundImage})`, 
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh"}}>

        <Box
          role="region"
          aria-live="polite"
          sx={{ position: "absolute", left: "-9999px" }}
        >
          You are on the Dashboard page.
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px",
            width: "90%",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              paddingTop: "20px",
              paddingLeft: "85px",
              textAlign: "left",
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: "45pt",
            }}
          >
            Dashboard
          </Typography>

          <ExportJSONButton
            data={
              dashboardData.overview || {
                score: 0,
                top_category: "Sender_Gender",
              }
            }
            graphsInfo={dashboardData.metricResults}
          />
        </Box>

        <Typography
          variant="body1"
          aria-label={`File path displayed as ${dashboardData.fileName}`}
          sx={{
            paddingBottom: "15px",
            paddingLeft: "75px",
            textAlign: "left",
            fontFamily: "Montserrat",
            color: "#9921D2",
            fontWeight: 500,
            fontSize: "15pt",
          }}
        >
          {dashboardData.fileName}
        </Typography>

        <Stack sx={{justifyContent: "center", alignItems: 'center'}}>

            <Box sx={{width: "90%", alignItems: "center"}}>
              <Stack direction="row" spacing={0}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat",
                    fontSize: "15px",
                    fontWeight: 300,
                    color: "#9921D2",
                  }}
                >
                  {dashboardData.fileName}
                </Typography>
                <Stack direction="row" spacing = {2} sx={{width: "100%"}}>
                  <LetterGrade
                    aria-label={`Letter grade is ${
                      dashboardData.overview?.score || "A+"
                    }`}
                    score={dashboardData.overview?.score || "A+"}
                    percentage={dashboardData.overview.percentage}
                  />
                  <Overview data={dashboardData.overview} />
                </Stack>
                
              </Stack>
              <GraphGrid graphsInfo={dashboardData.metricResults} />
            </Box>

        </Stack>

        <Footer label="© 2024 Team TripleB" />
      </main>
    </>
  );
}

export default DashboardPage;
