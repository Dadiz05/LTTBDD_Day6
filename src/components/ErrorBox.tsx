import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.title}>Có lỗi xảy ra</Text>
      <Text style={styles.msg}>{message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "700", color: colors.red, marginBottom: 6 },
  msg: { color: colors.text, textAlign: "center", marginBottom: 16 },
  btn: { backgroundColor: colors.blue, borderRadius: 6, paddingVertical: 12, paddingHorizontal: 28 },
  btnText: { color: "#fff", fontWeight: "700" },
});
