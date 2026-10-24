import React, { createContext, useContext, useMemo, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

// TODO 3 (nâng cao): notify / dark đưa lên Context để chế độ tối đổi nền cả Home và Profile
interface SettingsCtx {
  notify: boolean;
  setNotify: (v: boolean) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}
const SettingsContext = createContext<SettingsCtx | null>(null);
function useSettings(): SettingsCtx {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsProvider");
  return ctx;
}
function useThemeColors() {
  const { dark } = useSettings();
  return { bg: dark ? "#111827" : "#FFFFFF", fg: dark ? "#F9FAFB" : colors.text, sub: dark ? "#9CA3AF" : colors.muted };
}

function HomeScreen() {
  const t = useThemeColors();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <Text style={[s.big, { color: t.fg }]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const t = useThemeColors();
  return (
    <View style={[s.center, { backgroundColor: t.bg }]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={[s.big, { color: t.fg }]}>Nguyễn Văn An</Text>
      <Text style={{ color: t.sub }}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1
function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useSettings();
  const t = useThemeColors();
  return (
    <View style={[s.settings, { backgroundColor: t.bg }]}>
      <View style={s.row}>
        <Text style={[s.label, { color: t.fg }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
      <View style={s.row}>
        <Text style={[s.label, { color: t.fg }]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={[s.status, { color: t.sub }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

const ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

// TODO 2
export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);
  const value = useMemo(() => ({ notify, setNotify, dark, setDark }), [notify, dark]);

  return (
    <SettingsContext.Provider value={value}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  big: { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  avatarText: { color: "#fff", fontSize: 34, fontWeight: "700" },
  settings: { flex: 1, padding: 20 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14 },
  label: { fontSize: 17 },
  status: { marginTop: 24, fontSize: 15 },
});
