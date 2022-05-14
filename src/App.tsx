import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Fab,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";

function shuffle(array: Array<String>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const theme = createTheme();

function App() {
  const [keywords, setKeywords] = React.useState("");
  const onInputKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };
  const [numShuffle, setNumShuffle] = React.useState(5);
  const [shuffledKeywords, setShuffledKeywords] = React.useState("");
  const onClickShuffle = () => {
    setShuffledKeywords(
      shuffle(keywords.split(" ")).slice(0, numShuffle).join(" ")
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
        maxWidth="sm"
        m="auto"
      >
        <Paper elevation={3}> back and save</Paper>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <TextField
            label="Keywords"
            multiline
            rows={4}
            placeholder="Copy your keywords here, with space in between"
            value={keywords}
            onInput={onInputKeywords}
          />
          <Typography>{shuffledKeywords}</Typography>
        </Box>
        <Paper elevation={3}>
          nav bar
          <Fab color="primary" onClick={onClickShuffle}>
            <ShuffleRoundedIcon />
          </Fab>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
