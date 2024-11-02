import Grid from "@mui/material/Grid2";
import { Container, Box } from "@mui/material";
import BarChart from "../BarChart/BarChart";

const dataGraphs = [
    {
        title: "Statistical Parity Difference",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },
    {
        title: "Average Odds Difference",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },
    {
        title: "Equal Odds",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },
    {
        title: "Disparate Impact",
        values: [

            {
            "protected_attribute": "Gender",
            "score": 100,
            },
            {
                "protected_attribute": "Race",
                "score": 50,
            },
            {
                "protected_attribute": "Age",
                "score": 75,
            },
        ]
    },

]

function GraphGrid({graphsInfo}) {
    return (
        <Container sx={{display: 'inline-block'}}>
            <Grid container spacing={2}>
                {dataGraphs.map( (graphInfo, index) => 
                    <Grid style={{ minWidth: "350px" }} >
                        <BarChart graphInfo={graphInfo.values} title={graphInfo.title}/>
                    </Grid>
                )}

            </Grid>
        </Container>
    )    
}

export default GraphGrid