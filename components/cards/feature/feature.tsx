"use client";

// Mantine
import { Text, Card, rem, useMantineTheme } from "@mantine/core";

// Icons
import { IconProps } from "@tabler/icons-react";

// Styles
import classes from "./feature.module.css";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ComponentType<IconProps>;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // theme
  const theme = useMantineTheme();

  return (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />

      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>

      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  );
};

export default FeatureCard;
