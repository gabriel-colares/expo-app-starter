import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      initialRouteName="sign-in"
      screenOptions={{ statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark' }}>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  );
}
