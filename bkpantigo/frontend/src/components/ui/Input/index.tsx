"use client";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />;
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea className={styles.input} {...rest}></textarea>;
}
