import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Stars } from "../components/Stars";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";
import type { RootProps } from "./types";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params; // TODO 4
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  // TODO 5
  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);
  // TODO 6 + TODO 7
  return (
    <View style={styles.root}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{phone.name}</Text>
      <Stars value={phone.rating} />
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      <Text style={styles.supplier}>Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text></Text>

      <Pressable
        style={[styles.favBtn, saved && styles.favBtnOn]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.favText, saved && styles.favTextOn]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  notFound: { fontSize: 16, color: colors.red },
  image: { width: "100%", height: 260, marginBottom: 12 },
  name: { fontSize: 17, fontWeight: "600", color: colors.text, marginBottom: 6 },
  price: { fontSize: 22, fontWeight: "700", color: colors.red, marginTop: 8 },
  supplier: { marginTop: 6, color: colors.muted },
  bold: { fontWeight: "700", color: colors.text },
  favBtn: {
    marginTop: "auto",
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
  },
  favBtnOn: { backgroundColor: colors.red },
  favText: { color: colors.red, fontWeight: "700", fontSize: 16 },
  favTextOn: { color: "#fff" },
});
