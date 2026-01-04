import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MoonStarIcon, StarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Image, ImageStyle, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export default function Inicio() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
      <View className="gap-2 p-4">
        <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
          1. Edit <Text variant="code">app/index.tsx</Text> to get started.
        </Text>
        <Text className="ios:text-foreground font-mono text-sm text-muted-foreground">
          2. Save to see your changes instantly.
        </Text>
      </View>
      <View className="flex-row gap-2">
        <Link href="https://reactnativereusables.com" asChild>
          <Button>
            <Text>Browse the Docs</Text>
          </Button>
        </Link>
        <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
          <Button variant="ghost">
            <Text>Star the Repo</Text>
            <Icon as={StarIcon} />
          </Button>
        </Link>
      </View>
    </View>
  );
}
