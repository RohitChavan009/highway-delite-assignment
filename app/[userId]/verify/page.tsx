"use client";

// React.js
import { useState, useEffect, useRef, useCallback } from "react";

// Next.js
import Image from "next/image";
import { useRouter } from "next/navigation";

// 3rd Party
import * as z from "zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

// Mantine
import {
  Paper,
  Button,
  Title,
  Text,
  Anchor,
  PinInput,
  Loader,
  LoadingOverlay,
} from "@mantine/core";

// Styles
import classes from "./verify.module.css";

// Models
import { UserInterface } from "../../../lib/models/user.model";

const schema = z.object({
  pin: z
    .string()
    .min(4, { message: "Pin must be 4 digits long" })
    .regex(/^\d+$/, { message: "Pin must be numeric" }),
});

const Verify = () => {
  const router = useRouter();

  const isLoaded = useRef(false);

  const credentials: string | undefined = Cookies.get("tokens")!;

  let secret: { accessToken: string; refreshToken: string } | null = null;

  if (credentials) secret = JSON.parse(credentials);

  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<UserInterface | null>(null);

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const payload = {
      pin: data.pin,
    };

    try {
      const response = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { authorization: `Bearer ${secret?.accessToken}` },
      });

      if (response.status === 200) {
        toast.success("email verification successful.");

        router.push(`/`);
      } else {
        // handle non-200 responses
        const errorJSON = await response.json();

        toast.error(errorJSON.message || "something went wrong.");
      }
    } catch (error: any) {
      console.log("error : ", error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className={classes.wrapper}>
      <Image
        src="/assets/verify-image.svg"
        height={700}
        width={700}
        alt="verify-image"
        className={classes.image}
      />

      <Paper className={classes.form} radius={0} p={30}>
        <div className={classes.container}>
          <Title order={2} className={classes.title} ta="center" mt="md">
            Verify Email !
          </Title>

          <Text ta="center" mt="md">
            <Anchor<"a"> href="#" fw={700} onClick={() => router.back()}>
              Change Email
            </Anchor>
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="pin"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) => (
              <PinInput
                inputMode="numeric"
                size="lg"
                length={6}
                value={field.value}
                onChange={field.onChange}
                error={error ? true : false}
              />
            )}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Verify Email
          </Button>
        </form>

        <Text ta="center" mt="md">
          6-digit PIN has been sent to{" "}
          <Anchor<"a"> href="#" fw={700} onClick={() => {}}>
            {user?.email}.
          </Anchor>{" "}
          Please check your inbox.
        </Text>
      </Paper>

      <LoadingOverlay
        visible={loading}
        loaderProps={{ children: <Loader /> }}
      />
    </div>
  );
};

export default Verify;
