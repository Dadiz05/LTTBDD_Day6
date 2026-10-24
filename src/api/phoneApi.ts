import { PHONES } from "../data/phones";
import { Phone } from "../types";

export const API_URL = (
  process.env.EXPO_PUBLIC_API_URL ?? "https://6aca1f5b3115bcc95820676a.mockapi.io/phones"
).trim().replace(/\/+$/, "");
export const USING_API = API_URL !== "";
const PHONES_URL = API_URL.endsWith("/phones") ? API_URL : `${API_URL}/phones`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    // chế độ offline: giả lập độ trễ để thấy loading
    await sleep(600);
    const p = PHONES.find((x) => x.id === id);
    if (!p) throw new Error("Không tìm thấy sản phẩm");
    return p;
  }
  const res = await fetch(PHONES_URL);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  const phones: (Omit<Phone, "id"> & { id?: string })[] = await res.json();
  if (!Array.isArray(phones)) throw new Error("API phải trả về danh sách sản phẩm");

  // API hiện trả về danh sách không có id; dùng số thứ tự từ 1 cho dữ liệu này.
  const phone = phones
    .map((item, index) => ({ ...item, id: String(item.id ?? index + 1) }))
    .find((item) => item.id === id);
  if (!phone) throw new Error("Không tìm thấy sản phẩm");
  return phone;
}
