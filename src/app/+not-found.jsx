import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { AlertTriangle, Home } from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

export default function NotFoundScreen() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={styles.contentWrapper}>
        <Card style={styles.fullWidth}>
          <CardHeader style={styles.cardHeader}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: isDark ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.12)' },
              ]}>
              <AlertTriangle color={palette.destructive} size={26} />
            </View>

            <View style={styles.centeredItems}>
              <CardTitle style={styles.titleText}>Página não encontrada</CardTitle>
              <CardDescription style={styles.centerText}>
                A rota que você tentou acessar não existe ou foi movida.
              </CardDescription>
            </View>
          </CardHeader>

          <CardContent style={styles.cardContent}>
            <Button
              style={styles.fullWidth}
              onPress={() => {
                router.replace('/(onboarding)/index');
              }}>
              <View style={styles.buttonContentRow}>
                <Home color={palette.primaryForeground} size={18} />
                <Text style={styles.buttonLabel}>Ir para o início</Text>
              </View>
            </Button>

            <Button
              variant="outline"
              style={styles.fullWidth}
              onPress={() => {
                router.back();
              }}>
              <Text style={styles.buttonLabel}>Voltar</Text>
            </Button>
          </CardContent>
        </Card>

        <Text style={[styles.footerText, { color: palette.mutedForeground }]}>
          Se isso continuar acontecendo, verifique suas rotas no expo-router.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  fullWidth: {
    width: '100%',
  },
  cardHeader: {
    alignItems: 'center',
    rowGap: 8,
  },
  iconContainer: {
    height: 56,
    width: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredItems: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  titleText: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  cardContent: {
    rowGap: 12,
  },
  buttonContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  buttonLabel: {
    fontWeight: '500',
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
});
