import React from "react";
import "./Search.css";
import { Button, Tab, Tabs } from "@mui/material";

import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import CustomPagination from "../components/CustomPagination/CustomPagination";

function Search() {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [loading, setLoading] = useState();
  const [numOfPages, setNumOfPages] = useState();
  const [searchMovie, setSearchMovie] = useState();
  const [searchInput, setSearchInput] = useState("");
  const [movied, setMovied] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (searchMovie) {
          const res = await axios.get(`
              https://api.themoviedb.org/3/search/${
                type ? "tv" : "movie"
              }?api_key=f3d8e4feb56f8aa83c7956ede155fe74&language=en-US&query=${searchMovie}&page=${page}`);

          setMovied(res.data.results);
          setNumOfPages(res.data.total_pages);

          setLoading(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, [page, type, searchMovie]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchMovie(searchInput);
  };

  return (
    <div>
      {/* <ThemeProvider theme={darkTheme}> */}

      <div className="search">
        <input
          style={{ flex: 1 }}
          value={searchInput}
          className="searchBox"
          label="Search"
          variant="filled"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          style={{ marginLeft: 10 }}
        >
          <YoutubeSearchedForIcon fontSize="large" />
        </Button>
      </div>
      <div className="tab">
        <Tabs
          value={type}
          indicatorColor="secondary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </div>
      {/* </ThemeProvider> */}

      <div className="search">
        {movied && movied.map((c) => <MovieCard key={c.id} item={c} />)}
        {searchMovie &&
          !movied &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      <div className="pagination">
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
      </div>
    </div>
  );
}

export default Search;
