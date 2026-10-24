import React from "react";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { PHONES } from "../data/phones";

// Bài 1: dùng dữ liệu viết cứng
export function SelectPhoneLocal() {
  return <SelectPhoneApp phone={PHONES[0]} />;
}
