import { Drawer } from "expo-router/drawer";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,

          // Colors
          drawerActiveTintColor: "#1E1E1E",
          drawerInactiveTintColor: "#7B8A8C",

          // Drawer container
          drawerStyle: {
            backgroundColor: "#FAF9F4",
            width: 280,
          },

          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: "600",
            marginLeft: -10,
          },

          // Drawer item container
          drawerItemStyle: {
            borderRadius: 10,
            marginHorizontal: 14,
            marginVertical: 4,
            paddingVertical: 6,
          },

          drawerActiveBackgroundColor: "#FFFFFF",
          drawerInactiveBackgroundColor: "transparent",

          drawerContentStyle: {
            paddingTop: 40,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>🏠</Text>
            ),
          }}
        />

        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>👤</Text>
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>⚙️</Text>
            ),
          }}
        />

        <Drawer.Screen
          name="help"
          options={{
            title: "Help",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>❓</Text>
            ),
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            title: "About",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>ℹ️</Text>
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
