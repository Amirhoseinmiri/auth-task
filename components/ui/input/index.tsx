import React, { forwardRef } from "react";
import { InputProps } from "@/types";
import styles from "./Input.module.scss";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={`${styles.inputWrapper} ${className}`}>
        {label && (
          <label className={styles.label} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
          {...props}
        />
        {error && (
          <span className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
