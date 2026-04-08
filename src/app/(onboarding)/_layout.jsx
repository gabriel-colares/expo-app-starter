import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function Layout() {
  const { colorScheme } = useColorScheme();
  return (
    <Stack screenOptions={{ statusBarStyle: colorScheme === 'dark' ? 'light' : 'dark' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
