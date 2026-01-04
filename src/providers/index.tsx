import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export function Providers({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <KeyboardProvider>{children}</KeyboardProvider>
    </ThemeProvider>
  );
}
