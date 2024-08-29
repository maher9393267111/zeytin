import {
    Box,
    Menu,
    MenuItem,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
//   import { useTranslation } from "react-i18next";
  import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
 
  export default function Language() {
    // const { t, i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(
     //    window.localStorage?.getItem("lng") 

         typeof window !== 'undefined' ?    window.localStorage?.getItem("lng") : 'arabic'
    );
    const [anchorEl, setAnchorEl] = useState(false);
    const open = Boolean(anchorEl);
  
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    useEffect(() => {
        localStorage.setItem("lng", 'arabic');
    //  i18n.changeLanguage(selectedLanguage);
    }, [selectedLanguage]);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleLanguageChange = (lng) => {
      localStorage.setItem("lng", lng);
      setSelectedLanguage(lng);
      handleClose();
    };
  
    const lang =
    selectedLanguage === "de"
        ? {
            color: "#fff",
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#666666" },
          }
        : {};
    const lang2 =
    selectedLanguage === "ru"
        ? {
            color: "#fff",
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#666666" },
          }
        : {};
    const lang3 =
    selectedLanguage === "en"
        ? {
            color: "#fff",
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#666666" },
          }
        : {};
    const lang6 =
    selectedLanguage === "chinese"
        ? {
            color: "#fff",
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#666666" },
          }
        : {};
    const lang5 =
    selectedLanguage === "arabic"
        ? {
            color: "#fff",
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "#666666" },
          }
        : {};

  
    if(typeof window === 'undefined'){ return <div>.....</div>}


  
    return (
      <Box>
        <Stack
          cursor="pointer"
          variant="text"
          direction="row"
          alignItems="center"
          onClick={handleClick}
          sx={{
            cursor: "pointer",
            color: "#000",
            gap: { lg: "5px", md: "3px", xs: 0 },
          }}
          minHeight="32px"
        >
          {typeof window !== 'undefined' && window.localStorage.getItem("lng") === "ru" ? (
            <Stack direction="row" spacing={1}>
              <Typography
                fontFamily="Montserrat"
                textTransform="capitalize"
                fontWeight={600}
                sx={{ ...(isMobile ? { fontSize: 15 } : { fontSize: 16 }) }}
                color="#8F6340"
              >
                Рус
              </Typography>
            </Stack>
          ) : typeof window !== 'undefined' && localStorage.getItem("lng") === "arabic" ? (
            <Stack direction="row" spacing={1}>
              <Typography
                fontWeight={600}
                color="#8F6340"
                fontFamily="Montserrat"
                textTransform="capitalize"
              >
                عربي
              </Typography>
            </Stack>
          ) : typeof window !== 'undefined' && localStorage.getItem("lng") === "de" ? (
            <Stack direction="row" spacing={1}>
              <Typography
                fontWeight={600}
                color="#8F6340"
                fontFamily="Montserrat"
                textTransform="capitalize"
              >
                De
              </Typography>
            </Stack>
          ) : typeof window !== 'undefined' && localStorage.getItem("lng") === "chinese" ? (
            <Stack direction="row" spacing={1}>
              <Typography
                fontWeight={600}
                color="#8F6340"
                fontFamily="Montserrat"
                textTransform="capitalize"
              >
                中國人
              </Typography>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              <Typography
                fontWeight={600}
                color="#8F6340"
                fontFamily="Montserrat"
                textTransform="capitalize"
              >
                Eng
              </Typography>
            </Stack>
          )}
          <KeyboardArrowDownIcon
            sx={{
              color: "#8F6340",
              ...(open ? { transform: "rotate(180deg)" } : ""),
              width: { lg: 24, md: 20, xs: 18 },
              height: { lg: 24, md: 20, xs: 18 },
            }}
          />
        </Stack>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{
            zIndex: "100000",
            position: "fixed",
            "& .MuiMenu-paper": { backgroundColor: "#8F6340" },
          }}
          MenuListProps={{
            "aris-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleLanguageChange("ru")} sx={lang2}>
            <Stack direction="row" spacing={1}>
              <Typography>Русский</Typography>
            </Stack>
          </MenuItem>
          <MenuItem sx={lang3} onClick={() => handleLanguageChange("en")}>
            <Stack direction="row" spacing={1}>
              <Typography>English</Typography>
            </Stack>
          </MenuItem>
          <MenuItem sx={lang} onClick={() => handleLanguageChange("de")}>
            <Stack direction="row" spacing={1}>
              <Typography>Deutsch</Typography>
            </Stack>
          </MenuItem>
          <MenuItem sx={lang5} onClick={() => handleLanguageChange("arabic")}>
            <Stack direction="row" spacing={1}>
              <Typography>عربي</Typography>
            </Stack>
          </MenuItem>
          <MenuItem sx={lang6} onClick={() => handleLanguageChange("chinese")}>
            <Stack direction="row" spacing={1}>
              <Typography>中國人</Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </Box>
    );
  }
  