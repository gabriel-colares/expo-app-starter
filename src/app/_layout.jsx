import '../../global.css';

import { Providers } from '@/providers';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  return (
    <Providers>
      <Stack initialRouteName="(onboarding)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </Providers>
  );
}
