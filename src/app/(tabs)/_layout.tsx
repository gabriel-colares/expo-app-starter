import { ThemeToggle } from '@/components/shared/theme-toggle';
import { THEME } from '@/lib/theme';
import { Tabs } from 'expo-router';
import { Home, Search, User } from 'lucide-react-native';
import { Platform, Pressable } from 'react-native';

const TAB_SCREEN_OPTIONS = {
  headerRight: () => <ThemeToggle />,
  headerTransparent: false,
  headerShown: true,
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: THEME.light.primary,
        tabBarStyle: { height: 64, paddingVertical: 8 },
        sceneStyle: {
          backgroundColor: THEME.light.background,
        },
        tabBarButton: (props) => {
          const {
            children,
            onPress,
            onLongPress,
            accessibilityState,
            accessibilityLabel,
            testID,
            style,
          } = props;

          return (
            <Pressable
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityState={accessibilityState}
              accessibilityLabel={accessibilityLabel}
              testID={testID}
              style={style}
              android_ripple={
                Platform.OS === 'android'
                  ? {
                      color: THEME.light.mutedForeground,
                      foreground: true,
                      radius: 200,
                    }
                  : undefined
              }>
              {children}
            </Pressable>
          );
        },
      }}>
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
          ...TAB_SCREEN_OPTIONS,
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color }) => <Search size={24} color={color} />,
          ...TAB_SCREEN_OPTIONS,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
          ...TAB_SCREEN_OPTIONS,
        }}
      />
    </Tabs>
  );
}
