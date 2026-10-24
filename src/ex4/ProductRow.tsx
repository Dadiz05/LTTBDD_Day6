import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import type { Phone } from "../types";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image source={PHONE_COLORS[phone.defaultColor].image} style={styles.thumb} resizeMode="contain" />
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={2}>{phone.name.split(" - ")[0]}</Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 10,
  },
  thumb: { width: 48, height: 64 },
  text: { flex: 1, marginLeft: 12 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { marginTop: 4, color: colors.red, fontWeight: "700" },
});
