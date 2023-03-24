import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MovieDetailCard from "../components/MovieDetailCard";
import { useParams } from "react-router-dom";

function MovieDetailPage() {
  let { movieId } = useParams();
  const [loading, setLoading] = useState();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );

        setMovieDetail(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      <Typography variant="h5" mb={2} className="title" fontWeight={600}>
        MOVIE INFO
      </Typography>
      <Divider />

      <MovieDetailCard movieDetail={movieDetail} loading={loading} />
    </>
  );
}

export default MovieDetailPage;
