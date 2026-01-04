import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  const { colorScheme } = useColorScheme();
  return <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>{children}</ThemeProvider>;
}
