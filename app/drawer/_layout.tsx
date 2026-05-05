import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import api, { setAuthToken } from "@/services/api";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await setAuthToken(null);
      router.replace('/auth/login');
    }
  };

  const confirmLogout = () => {
    if (Platform.OS === 'web') {
      // For web, we can use a window confirm or just proceed
      if (confirm('Are you sure you want to log out?')) {
        handleLogout();
      }
    } else {
      Alert.alert('Logout', 'Are you sure you want to log out?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: handleLogout }
      ]);
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <TouchableOpacity
        style={[styles.logoutButton, { borderTopColor: colors.border }]}
        onPress={confirmLogout}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={[styles.logoutText, { color: '#FF4B4B' }]}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: colors.text,
          drawerInactiveTintColor: colors.textSecondary,
          drawerStyle: {
            backgroundColor: colors.background,
            width: 280,
          },
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: "600",
            marginLeft: -10,
          },
          drawerItemStyle: {
            borderRadius: 10,
            marginHorizontal: 14,
            marginVertical: 4,
            paddingVertical: 6,
          },
          drawerActiveBackgroundColor: colors.cardBackground,
          drawerInactiveBackgroundColor: "transparent",
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
          name="statistics"
          options={{
            title: "Statistics",
            drawerIcon: ({ color, size }) => (
              <Text style={{ fontSize: size, color }}>📊</Text>
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

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    marginBottom: 20,
    gap: 15,
  },
  logoutIcon: {
    fontSize: 22,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
