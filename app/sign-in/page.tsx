"use client";

// React.js
import { useState } from "react";

// Next.js
import Image from "next/image";
import { useRouter } from "next/navigation";

// 3rd Party
import * as z from "zod";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Mantine
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Loader,
  LoadingOverlay,
} from "@mantine/core";

// Styles
import classes from "./sign-in.module.css";

// Assets
import SignInImage from "../../public/assets/sign-in-image.svg";

// Rules
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  keepLoggedIn: z.boolean(),
});

const SignIn = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);

    const payload = {
      email: data.email,
      password: data.password,
      keepLoggedIn: data.keepLoggedIn,
    };

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.status === 200) {
        const json = await response.json();

        Cookies.set(
          "tokens",
          JSON.stringify({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
          })
        );

        toast.success("user sign in successful.");

        router.push("/");
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
  };
  return (
    <div className={classes.wrapper}>
      <Image
        src={SignInImage}
        height={700}
        width={700}
        alt="sign-in-image"
        className={classes.image}
      />

      <Paper className={classes.form} radius={0} p={30}>
        <div className={classes.container}>
          <Title order={2} className={classes.title} ta="center" mt="md">
            Welcome Back !
          </Title>

          <Text ta="center" mt="md">
            <Anchor<"a">
              href="#"
              fw={700}
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </Anchor>
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            mt="md"
            size="md"
            {...register("email")}
            error={errors.email ? String(errors.email.message) : undefined}
          />

          <PasswordInput
            label="Your Password"
            placeholder="password@123"
            mt="md"
            size="md"
            {...register("password")}
            error={
              errors.password ? String(errors.password.message) : undefined
            }
          />

          <Checkbox
            label="Keep me logged in"
            mt="lg"
            size="md"
            {...register("keepLoggedIn")}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Sign In
          </Button>
        </form>
      </Paper>

      <LoadingOverlay
        visible={loading}
        loaderProps={{ children: <Loader /> }}
      />
    </div>
  );
};

export default SignIn;
