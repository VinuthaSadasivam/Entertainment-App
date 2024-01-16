import React from "react";
import Pagination from "@material-ui/lab/Pagination";
import { ThemeProvider, createTheme } from "@material-ui/core";

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          count={numOfPages}
          onChange={(e) => handlePageChange(e.target.textContent)}
          hideNextButton
          hidePrevButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
};

export default CustomPagination;
