import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  const history = useHistory();

  useEffect(() => {
    if (value === 0) history.push("/");
    else if (value === 1) history.push("/movies");
    else if (value === 2) history.push("/series");
    else if (value === 3) history.push("/search");
  }, [value, history]);

  return (
    <Box
      sx={{
        zIndex: 100,
      }}
    >
      <BottomNavigation
        style={{
          backgroundColor: "#2d313a",
          bottom: 0,
          position: "fixed",
          width: "100%",
          zIndex: 100,
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white", width: "100%" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Tv Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
