"use client";

// Next.js
import { useRouter } from "next/navigation";

// 3rd Party
import Cookies from "js-cookie";

// Mantine
import {
  Group,
  Button,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// Components
import ThemeButton from "../buttons/theme-button";

// Icons
import { IconBrandMantine as Logo } from "@tabler/icons-react";

// Styles
import classes from "./navbar.module.css";

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const router = useRouter();

  const logout = () => {
    Cookies.remove("tokens");

    router.push("/sign-up");
  };
  return (
    <Box pb={50}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Logo
            style={{ width: rem(35), height: rem(35) }}
            stroke={1.5}
            color="var(--mantine-color-blue-filled)"
          />

          <Group visibleFrom="sm">
            <ThemeButton />

            <Button onClick={logout}>Log Out</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title=""
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Group justify="center" grow pb="xl" px="md">
            <ThemeButton />

            <Button onClick={logout}>Log Out</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default Navbar;
