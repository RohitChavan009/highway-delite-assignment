"use client";

// Mantine
import {
  Container,
  Group,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core";

// Icons
import {
  IconBrandX,
  IconBrandGithub,
  IconBrandMantine,
  IconBrandYoutube,
  IconBrandLinkedin,
} from "@tabler/icons-react";

// Styles
import classes from "./footer.module.css";

const Footer = () => {
  // theme
  const theme = useMantineTheme();

  const openLink = (link: string) => window.open(link);
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <IconBrandMantine
          style={{ width: rem(40), height: rem(40) }}
          stroke={2}
          color={theme.colors.blue[6]}
        />

        <Group
          gap={0}
          className={classes.links}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() =>
              openLink("https://www.linkedin.com/in/rohitchavan110116114/")
            }
          >
            <IconBrandLinkedin
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() => openLink("https://x.com/RohitCh05943009")}
          >
            <IconBrandX
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() => openLink("https://github.com/roHIT-MAN-45")}
          >
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            onClick={() =>
              openLink(
                "https://www.youtube.com/channel/UCCn_hk6vKrcrJCeyJBLJglA"
              )
            }
          >
            <IconBrandYoutube
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default Footer;
