import React, { useCallback, useEffect, useState } from "react";
import { fetchPhone } from "../api/phoneApi";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import type { Phone } from "../types";
import { SelectPhoneApp } from "./SelectPhoneApp";

// Bài 2: dữ liệu lấy từ API (mockapi.io) hoặc dữ liệu mẫu nếu chưa đặt EXPO_PUBLIC_API_URL
export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    // TODO 1
    setError(null);
    setPhone(null);
    // TODO 2
    try {
      setPhone(await fetchPhone("1"));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải dữ liệu");
    }
  }, []);

  // TODO 3: gọi load() khi mở màn hình lần đầu
  useEffect(() => {
    load();
  }, [load]);

  // TODO 4
  if (error) return <ErrorBox message={error} onRetry={load} />;
  // TODO 5
  if (!phone) return <Loading />;
  // TODO 6
  return <SelectPhoneApp phone={phone} />;
}
