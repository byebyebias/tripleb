import { Typography, Stack, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import GraphGrid from "../components/Dashboard/GraphGrid/GraphGrid";
import Overview from "../components/Dashboard/Overview/Overview";
import LetterGrade from "../components/Dashboard/LetterGrade/LetterGrade";
import Footer from "../components/Footer/Footer";

function DashboardPage() {
  const location = useLocation();
  const { dashboardData } = location.state;

  return (
    <main role="main">

    <Box role="region" aria-live="polite" sx={{ position: 'absolute', left: '-9999px' }}>
      You are on the Dashboard page.
    </Box>
    
    
    <Typography variant="h1" sx={{paddingTop: "20px", paddingLeft: "75px", textAlign:'left', fontFamily: 'Montserrat', fontWeight: 700, fontSize: '45pt'}}>Dashboard</Typography>
    <Typography variant="body1" aria-label={`File path displayed as ${dashboardData.filePath.split('/').pop()}`} sx={{paddingBottom: "15px", paddingLeft: "75px", textAlign:'left', fontFamily: 'Montserrat', color: "#9921D2", fontWeight: 500, fontSize: '15pt'}} >
        {dashboardData.filePath.split('/').pop()}
      </Typography>

    <Stack sx={{backgroundColor: '#E6EEF5'}} p = {3}>
      
      <Stack>
        
        <Box bgcolor="#E6EEF5" sx={{paddingLeft: "30px"}}p={0}>
          <Stack direction="row" spacing={2}>
            <Typography sx={{fontFamily: 'Montserrat', fontSize:'15px', fontWeight: 300, color:"#9921D2"}}>{dashboardData.fileName}</Typography>
            <LetterGrade aria-label={`Letter grade is ${dashboardData.overview?.score || "A+"}`} score={dashboardData.overview?.score || "A+"} />
            <Overview data={dashboardData.overview || { score: 0, top_category: 'Sender_Gender' }} />
          </Stack>
          <GraphGrid graphsInfo={dashboardData.metricResults} />
        </Box>
      </Stack>

    </Stack>
    
    <Footer label="© 2024 Team TripleB" /></main>
  );
}

export default DashboardPage;
