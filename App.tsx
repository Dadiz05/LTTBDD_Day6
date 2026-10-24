import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SelectPhoneLocal } from "./src/ex1/SelectPhoneLocal";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { USING_API } from "./src/api/phoneApi";
import { colors } from "./src/theme";

const EXERCISES = [
  { key: "ex1", title: "Bài 1 — Select Phone", sub: "Stack + truyền params (dữ liệu mẫu)", Comp: SelectPhoneLocal },
  { key: "ex2", title: "Bài 2 — Select Phone + API", sub: USING_API ? "Đang dùng mockapi.io" : "Chưa đặt EXPO_PUBLIC_API_URL → dữ liệu mẫu offline", Comp: SelectPhoneApi },
  { key: "ex3", title: "Bài 3 — Bottom Tab", sub: "Home / Search / Profile", Comp: BottomTabApp },
  { key: "ex4", title: "Bài 4 — Stack + Tab + Params", sub: "Products / Favorites / ProductDetails", Comp: StackTabApp },
  { key: "ex5", title: "Bài 5 — Drawer", sub: "Home / Profile / Settings", Comp: DrawerApp },
] as const;

function Root() {
  const insets = useSafeAreaInsets();
  const [current, setCurrent] = useState<string | null>(null);
  const active = EXERCISES.find((e) => e.key === current);

  if (!active) {
    return (
      <View style={[styles.menu, { paddingTop: insets.top + 24 }]}>
        <Text style={styles.title}>Lab 06 — Navigation</Text>
        {EXERCISES.map((e) => (
          <Pressable key={e.key} style={styles.item} onPress={() => setCurrent(e.key)}>
            <Text style={styles.itemTitle}>{e.title}</Text>
            <Text style={styles.itemSub}>{e.sub}</Text>
          </Pressable>
        ))}
      </View>
    );
  }

  const Comp = active.Comp;
  return (
    <View style={styles.flex}>
      <View style={[styles.bar, { paddingTop: insets.top }]}>
        <Pressable onPress={() => setCurrent(null)} style={styles.back} hitSlop={8}>
          <Text style={styles.backText}>← Menu</Text>
        </Pressable>
        <Text style={styles.barTitle}>{active.title}</Text>
      </View>
      {/* phần top đã được thanh Menu chiếm, nên bài tập không cộng thêm inset top nữa */}
      <SafeAreaInsetsContext.Provider value={{ ...insets, top: 0 }}>
        <View style={styles.flex}>
          <Comp />
        </View>
      </SafeAreaInsetsContext.Provider>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Root />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  menu: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: "800", color: colors.navy, marginBottom: 20 },
  item: { backgroundColor: "#fff", borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.line },
  itemTitle: { fontSize: 17, fontWeight: "700", color: colors.text },
  itemSub: { marginTop: 4, color: colors.muted },
  bar: { backgroundColor: colors.navy, flexDirection: "row", alignItems: "center", paddingBottom: 10, paddingHorizontal: 14 },
  back: { paddingRight: 14 },
  backText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  barTitle: { color: "#C7D2FE", fontSize: 14 },
});
