import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  CssBaseline,
  Fab,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { yellow } from "@mui/material/colors";
import ShuffleRoundedIcon from "@mui/icons-material/ShuffleRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import ReplayCircleFilledOutlinedIcon from "@mui/icons-material/ReplayCircleFilledOutlined";
import CopyAllRoundedIcon from "@mui/icons-material/CopyAllRounded";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import AllInclusiveRoundedIcon from "@mui/icons-material/AllInclusiveRounded";
import ListRoundedIcon from "@mui/icons-material/ListRounded";

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

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: yellow[500],
  },
  // "& .MuiRating-iconHover": {
  //   color: yellow[600],
  // },
});

const theme = createTheme();

function App() {
  const [keywords, setKeywords] = React.useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  );
  const onInputKeywords = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };
  const [numShuffle, setNumShuffle] = React.useState(2);
  // const onChangeNumShuffle = (event, newValue) => {
  //   console.log(newValue)
  // }
  const [shuffledKeywords, setShuffledKeywords] = React.useState<String[]>([]);
  const onClickShuffle = () => {
    setShuffledKeywords(
      shuffle(keywords.split(" ").filter((word) => word !== ""))
    );
  };

  const onClickReplace = (index: number) => () => {
    if (shuffledKeywords.length > numShuffle) {
      const newShuffledKeywords = [...shuffledKeywords];
      newShuffledKeywords[index] = newShuffledKeywords.pop() || "";
      setShuffledKeywords(newShuffledKeywords);
    } else {
      alert("Not enough keywords!");
    }
  };

  const shuffledCards = React.useMemo(
    () =>
      shuffledKeywords.slice(0, numShuffle).map((keyword, index) => {
        return (
          <Box sx={{ mx: 1 }} key={index}>
            <Paper
              sx={{
                flexShrink: 0,
                display: "flex",
                width: "10rem",
                height: "15rem",
                alignItems: "center",
                justifyContent: "center",
              }}
              elevation={6}
            >
              <Typography variant="h6">{keyword}</Typography>
            </Paper>
            <Box sx={{ display: "flex" }}>
              <Button
                sx={{ marginLeft: "auto" }}
                endIcon={<ShuffleRoundedIcon />}
                size="small"
                color="inherit"
                onClick={onClickReplace(index)}
              >
                replace
              </Button>
            </Box>
          </Box>
        );
      }),
    [shuffledKeywords, numShuffle]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        className="App"
        sx={{
          height: "100%",
        }}
        maxWidth="sm"
        m="auto"
      >
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <Paper className="TopNavigation" elevation={0} square>
            <Box sx={{ display: "flex", alignItems: "center", m: 1 }}>
              <ArrowBackRoundedIcon fontSize="large" />
              <SaveAltRoundedIcon
                sx={{ marginLeft: "auto" }}
                fontSize="large"
              />
            </Box>
          </Paper>
          <Box
            className="ShuffleKeywordsPage"
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box sx={{ width: "100%", p: 2, paddingBottom: 0 }}>
              <TextField
                label="Keywords"
                fullWidth
                multiline
                rows={4}
                placeholder="Copy your keywords here, with space in between"
                value={keywords}
                onInput={onInputKeywords}
              />
            </Box>
            <Box
              className="CollectionName"
              sx={{ width: "100%", p: 2, paddingBottom: 0 }}
            >
              <Typography variant="body1" color="text.disabled">
                Cards in
              </Typography>
              <Typography variant="h4" noWrap>
                Industrial Design
              </Typography>
            </Box>
            <Box
              className="ShuffledKeywords"
              sx={{
                flexGrow: 1,
                display: "flex",
                width: "100%",
                overflow: "auto",
                p: 2,
                alignItems: "center",
                justifyContent:
                  shuffledCards.length < 3 ? "space-around" : "flex-start",
              }}
            >
              {shuffledCards}
            </Box>
            <Box className="NumberToShuffle" sx={{ display: "flex", p: 2 }}>
              <StyledRating
                value={numShuffle}
                max={9}
                icon={<ReplayCircleFilledOutlinedIcon sx={{ mx: 0.5 }} />}
                emptyIcon={<ReplayCircleFilledOutlinedIcon sx={{ mx: 0.5 }} />}
                onChange={(event, newValue) => {
                  if (newValue) {
                    setNumShuffle(newValue);
                  }
                }}
              />
            </Box>
          </Box>
          <Paper
            sx={{ marginTop: "28px" }}
            className="BottomNavigation"
            elevation={3}
            square
          >
            <Fab
              sx={{
                position: "absolute",
                left: "50%",
                bottom: "56px",
                transform: "translate(-35px, 35px)",

                maxHeight: "70px",
                minHeight: "70px",
                minWidth: "70px",
                maxWidth: "70px",
              }}
              color="primary"
              size="large"
              onClick={onClickShuffle}
            >
              <ShuffleRoundedIcon fontSize="large" />
            </Fab>
            <BottomNavigation>
              <BottomNavigationAction
                icon={<AllInclusiveRoundedIcon fontSize="large" />}
              />
              <BottomNavigationAction
                icon={<CopyAllRoundedIcon fontSize="large" />}
              />
              <Box sx={{ width: "70px" }} />
              <BottomNavigationAction
                icon={<TipsAndUpdatesOutlinedIcon fontSize="large" />}
              />
              <BottomNavigationAction
                icon={<ListRoundedIcon fontSize="large" />}
              />
            </BottomNavigation>
          </Paper>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default App;
