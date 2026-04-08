import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Link } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Image, StyleSheet, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const IMAGE_STYLE = {
  height: 76,
  width: 76,
};

export default function Inicio() {
  const { colorScheme } = useColorScheme();

  return (
    <View style={styles.screen}>
      <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionText}>
          1. Edit <Text variant="code">app/index.jsx</Text> to get started.
        </Text>
        <Text style={styles.instructionText}>2. Save to see your changes instantly.</Text>
      </View>
      <View style={styles.actionsRow}>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 32,
    padding: 16,
  },
  instructionsContainer: {
    rowGap: 8,
    padding: 16,
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 8,
  },
});
