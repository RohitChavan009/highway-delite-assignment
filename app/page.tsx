"use client";

// React.js
import { useState, useEffect, useRef, useCallback } from "react";

// 3rd Party
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Mantine
import {
  Badge,
  Group,
  Title,
  Text,
  Container,
  SimpleGrid,
  Loader,
  LoadingOverlay,
} from "@mantine/core";

// Styles
import classes from "./main.module.css";

// Components
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import FeatureCard from "../components/cards/feature/feature";

// Constants
import { FEATURES_DATA } from "../constants/data";

// Models
import { UserInterface } from "../lib/models/user.model";

const Dashboard = () => {
  const isLoaded = useRef(false);

  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<UserInterface | null>(null);

  const credentials: string | undefined = Cookies.get("tokens")!;

  let secret: { accessToken: string; refreshToken: string } | null = null;

  if (credentials) secret = JSON.parse(credentials);

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile", {
        method: "GET",
        headers: { authorization: `Bearer ${secret?.accessToken}` },
      });

      if (response.status === 200) {
        const json = await response.json();

        setUser(json.user);
      } else {
        // handle non-200 responses
        const errorJSON = await response.json();

        toast.error(errorJSON.message || "something went wrong.");
      }
    } catch (error: any) {
      console.log("error : ", error);

      toast.error("something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [secret]);

  // on page load
  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;

      getProfile();
    }
  }, [getProfile]);
  return (
    <>
      <Navbar />

      <Container size="lg" py="xl">
        <Group justify="center">
          <Badge variant="filled" size="lg">
            © Rohit Chavan {new Date().getFullYear()}
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          Security So Sleek, It Feels Like Enchantment
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Dive into top-notch security with slick JWT integration and
          lightning-fast email handling with NodeMailer. Powered by TypeScript,
          my system delivers smooth, powerful performance that&apos;s as
          reliable as it is impressive.
        </Text>

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard key={`feature-card-${index}`} feature={feature} />
          ))}
        </SimpleGrid>
      </Container>

      <Footer />

      <LoadingOverlay
        visible={loading}
        loaderProps={{ children: <Loader /> }}
      />
    </>
  );
};

export default Dashboard;
