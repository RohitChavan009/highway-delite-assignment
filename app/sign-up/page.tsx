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

// Assets
import SignUpImage from "../../public/assets/sign-up-image.svg";

// Styles
import classes from "./sign-up.module.css";

// Rules
const schema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),

    lastName: z.string().min(1, { message: "Last name is required" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string(),

    email: z.string().email({ message: "Invalid email address" }),

    keepLoggedIn: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
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
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      keepLoggedIn: data.keepLoggedIn,
    };

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const json = await response.json();

        Cookies.set(
          "tokens",
          JSON.stringify({
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
          })
        );

        toast.success("user sign up successful.");

        router.push(`/${json.user._id}/verify`);
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
        height={700}
        width={700}
        src={SignUpImage}
        alt="sign-up-image"
        className={classes.image}
      />

      <Paper className={classes.form} radius={0} p={30}>
        <div className={classes.container}>
          <Title order={2} className={classes.title} ta="center" mt="md">
            Create Your Account !
          </Title>

          <Text ta="center" mt="md">
            <Anchor<"a">
              href="#"
              fw={700}
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </Anchor>
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="First name"
            placeholder="John"
            size="md"
            {...register("firstName")}
            error={
              errors.firstName ? String(errors.firstName.message) : undefined
            }
          />

          <TextInput
            label="Last name"
            placeholder="Doe"
            size="md"
            mt="md"
            {...register("lastName")}
            error={
              errors.lastName ? String(errors.lastName.message) : undefined
            }
          />

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            mt="md"
            size="md"
            {...register("email")}
            error={errors.email ? String(errors.email.message) : undefined}
          />

          <PasswordInput
            label="Set password"
            placeholder="password@123"
            mt="md"
            size="md"
            {...register("password")}
            error={
              errors.password ? String(errors.password.message) : undefined
            }
          />

          <PasswordInput
            label="Retype password"
            placeholder="password@123"
            mt="md"
            size="md"
            {...register("confirmPassword")}
            error={
              errors.confirmPassword
                ? String(errors.confirmPassword.message)
                : undefined
            }
          />

          <Checkbox
            label="Keep me logged in"
            mt="lg"
            size="md"
            {...register("keepLoggedIn")}
          />

          <Button fullWidth mt="xl" size="md" type="submit">
            Sign Up
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

export default SignUp;
