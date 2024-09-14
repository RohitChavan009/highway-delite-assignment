"use client";

// 3rd Party
import cx from "clsx";

// Mantine
import {
  Group,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";

// Icons
import { IconSun, IconMoon } from "@tabler/icons-react";

// Styles
import classes from "./theme-button.module.css";

const ThemeButton = () => {
  const { setColorScheme } = useMantineColorScheme();

  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <Group justify="center">
      <ActionIcon
        size="xl"
        variant="transparent"
        aria-label="Toggle color scheme"
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />

        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
};

export default ThemeButton;
