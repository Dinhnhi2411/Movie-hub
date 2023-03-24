import React from "react";
import {Outlet} from "react-router-dom";
import Grid from "@mui/material/Grid";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";


function MainLayout() {

    return (
        // <ExampleContext.Provider value={}>
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <MainHeader/>
                
            </Grid>
            <Grid item xs={10} mt={5}>
                <Outlet/>
            </Grid>
            <Grid item xs={12}>
                <MainFooter/>
            </Grid>
        </Grid>
        // </ExampleContext.Provider>
    )
}
export default MainLayout;