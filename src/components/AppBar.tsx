import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { signOut, useSession } from "next-auth/client";
import * as React from "react";
import Link, { NextLinkComposed } from "./Link";


export default function ButtonAppBar() {
  const [session, loading] = useSession();
  if (!session) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>

            <Button variant="contained" component={Link} noLinkStyle href="/">
              Main Feed{" "}
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>

            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/api/auth/signin",
              }}
              color="inherit"
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>


            <Button variant="contained" component={Link} noLinkStyle href="/">
              Feed Page{" "}
            </Button>
            <Button
              variant="contained"
              component={Link}
              noLinkStyle
              href="/post/create"
            >
              Create a Post{" "}
            </Button>
            <Button
              variant="contained"
              component={Link}
              noLinkStyle
              href="/post/drafts"
            >
              My Drafts{" "}
            </Button>
            <Button
              variant="contained"
              component={Link}
              noLinkStyle
              href="/profiles"
            >
              Bloggers Profiles{" "}
            </Button>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              variant="contained"
              component={Link}
              noLinkStyle
              href="/profile"
            >
              My Profile{" "}
            </Button>
            <Box> you are logged in as {session?.user?.email}</Box>
            <Button onClick={() => signOut()} color="inherit">
              LogOut
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
