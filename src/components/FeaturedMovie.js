import React, { useState, useEffect } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
// import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Skeleton from "@mui/material/Skeleton";
import ListItemButton from "@mui/material/ListItemButton";
import RecommendIcon from "@mui/icons-material/Recommend";


export default function FeaturedMovie(props) {
  const [cutInitial, setcutInitial] = useState([]);
  const [loading, setLoading] = useState();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("props", props)
        setLoading(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;

        setcutInitial([...result].splice(12, 8));
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );
  return (
    <Box>
      {loading
        ? cutInitial.map((item, i) => detailSkeleton)
        : cutInitial.map((item, i) => <Item key={i} item={item} />)}
    </Box>
  );
}

function Item(props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      sx={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "50vh",
      }}
    >
      <Paper square sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <ListItemButton>
          <Stack
            display="flex"
            flexWrap="no-wrap"
            sx={{ height: "20%", width: "50%" }}
          >
           
            <Typography variant="h5" mb={1}>
              {props.item.original_name}
            </Typography>
            <Typography variant="caption">{props.item.overview}</Typography>

           
            <Stack flexDirection="row" justifyContent="flex-start" mt={1}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr={3}
              >

                <RecommendIcon />
                <Typography ml={1}>{props.item.vote_average}</Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon />
                <Typography ml={1}>{props.item.vote_count}</Typography>
              </Box>
            </Stack>
          </Stack>
        </ListItemButton>
      </Paper>
    </Box>
  );
}