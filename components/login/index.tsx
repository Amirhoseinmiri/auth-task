"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import styles from "./auth.module.scss";
import { useAuth } from "../../hooks/use-auth";
import { LoginFormData, loginSchema } from "../../validation";
import Button from "../ui/button";
import Input from "../ui/input";
import { fetchRandomUser } from "../../api/services";

const AuthPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async () => {
    setIsLoading(true);
    setApiError(null);

    try {
      const userData = await fetchRandomUser();

      login(userData);

      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setApiError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>
            Please enter your Iranian mobile number to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
          <Input
            {...register("phoneNumber")}
            id="phoneNumber"
            label="Iranian Mobile Number"
            type="tel"
            placeholder="09123456789"
            error={errors.phoneNumber?.message}
            autoComplete="tel"
            maxLength={11}
          />

          {apiError && (
            <div className={styles.errorAlert} role="alert">
              <span className={styles.errorIcon}>⚠</span>
              <span>{apiError}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isLoading}
            disabled={!isValid || isLoading}
            className={styles.submitButton}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className={styles.authFooter}>
          <p className={styles.footerText}>
            This is a demo authentication flow. Enter any valid Iranian mobile
            number format.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
