import { Button, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthBackgroundPattern({t}:any) {
  const router = useRouter();


console.log("PATTERN" ,t)

  const currentLink = router.pathname;
  return (
    <Box
      mt={15}
      sx={{
        flexGrow: 1,
      }}
    >
      <Typography
      // className="   text-red-400 "
        component={"h1"}
        variant="h5"
        style={{
          marginBottom: "3rem",
        }}
      >
      {t.welcome_1}
      </Typography>
      <Typography
        component={"span"}
        style={{
          marginBottom: "3rem",
        }}
        variant="body2"
      >
       {t.welcome_2}
      </Typography>
      <Box mt={5}>
        {currentLink === "/auth/login" ? (
          <Link href="/auth/register">
            <Button variant="outlined" color="secondary">
           {t.register}
            </Button>
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button variant="outlined" color="secondary">
             {t.login}
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
