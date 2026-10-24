import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ColorKey, Phone } from "../types";
import type { SelectPhoneParamList } from "./SelectPhoneApp";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & { phone: Phone };

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - "); // "Điện Thoại Vsmart Joy 3" / "Hàng chính hãng"

  return (
    <SafeAreaView style={styles.root} edges={["bottom", "left", "right"]}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>
          {/* TODO 3: chỉ hiện khi đã chọn màu */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={[styles.small, styles.bold]}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: nút XONG */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked }, { merge: true })}
        >
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, alignItems: "flex-start" },
  thumb: { width: 90, height: 110 },
  headerText: { flex: 1, marginLeft: 14 },
  small: { fontSize: 14, color: colors.text, marginBottom: 4 },
  bold: { fontWeight: "700" },
  body: { flex: 1, backgroundColor: colors.grey, alignItems: "center", paddingVertical: 20, paddingHorizontal: 16 },
  hint: { fontSize: 16, color: colors.text, marginBottom: 14 },
  swatches: { alignItems: "center" },
  swatch: {
    width: 85,
    height: 80,
    marginVertical: 8,
    borderWidth: 4,
    borderColor: "transparent",
  },
  swatchOn: { borderColor: "#FFFFFF" },
  doneBtn: {
    marginTop: "auto",
    alignSelf: "stretch",
    height: 46,
    borderRadius: 4,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  doneText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
