# Lab 06 — Navigation (React Native + Expo + TypeScript)

## Cách chạy
```bash
npx create-expo-app@latest Lab06 --template blank-typescript
cd Lab06
npx expo install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs \
  @react-navigation/drawer react-native-screens react-native-safe-area-context \
  react-native-gesture-handler react-native-reanimated react-native-worklets @expo/vector-icons
```
Sau đó chép đè vào project: `App.tsx`, `index.ts`, thư mục `assets/` và `src/`.
Trong `package.json` đảm bảo `"main": "index.ts"` và thêm script `"typecheck": "tsc --noEmit"`.
```bash
npx expo start        # quét QR bằng Expo Go, nhấn w để mở bản web
npm run typecheck
```

## Bài 2 — chạy với API thật
Tạo project + resource `phones` trên mockapi.io, nhập dữ liệu từ `mockapi_phones.json`, rồi:
```bash
# PowerShell
$env:EXPO_PUBLIC_API_URL="https://xxxxxxxx.mockapi.io/api/v1"; npx expo start -c
# macOS / Linux
EXPO_PUBLIC_API_URL=https://xxxxxxxx.mockapi.io/api/v1 npx expo start -c
```
Không đặt biến này thì app dùng dữ liệu mẫu offline (vẫn có loading 0,6 giây).

## Ghi chú
- `assets/phones/*.png` là ảnh minh hoạ tự vẽ; thay bằng ảnh xuất từ Figma (giữ nguyên tên file).
- Menu ở `App.tsx` để chọn Bài 1 → 5.
