import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    key: 'demo',
    title: 'Repo demo, setup rápido',
    description:
      'Este app é um exemplo com Expo Router + NativeWind + componentes reutilizáveis. Tudo pronto para você copiar e adaptar.',
    Icon: Sparkles,
  },
  {
    key: 'ui',
    title: 'UI consistente',
    description:
      'Componentes prontos e estilos por tokens: cores, tipografia e espaçamentos com suporte a light/dark.',
    Icon: ShieldCheck,
  },
  {
    key: 'dx',
    title: 'Dev experience',
    description:
      'Estrutura simples, telas isoladas, navegação direta e fácil de estender com autenticação, API e estado global.',
    Icon: Zap,
  },
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function OnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const slide = SLIDES[index];

  const isLast = index === total - 1;
  const progress = (index + 1) / total;

  function goNext() {
    if (isLast) {
      router.replace('/(auth)/sign-in');
      return;
    }
    setIndex((i) => clamp(i + 1, 0, total - 1));
  }

  function skip() {
    router.replace('/(auth)/sign-in');
  }

  return (
    <View style={[styles.screen, { backgroundColor: palette.background }]}>
      <View style={styles.topRow}>
        <Text style={[styles.smallMutedText, { color: palette.mutedForeground }]}>
          {index + 1}/{total}
        </Text>

        <Pressable onPress={skip} hitSlop={10}>
          <Text style={[styles.smallLinkText, { color: palette.primary }]}>Pular</Text>
        </Pressable>
      </View>

      <View style={styles.centerArea}>
        <View style={styles.contentWrapper}>
          <Card style={styles.fullWidth}>
            <CardHeader style={styles.cardHeader}>
              <View style={styles.headerContent}>
                <View
                  style={[
                    styles.slideIconWrapper,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)' },
                  ]}>
                  <slide.Icon color={palette.primary} size={28} />
                </View>

                <View style={styles.centeredItems}>
                  <CardTitle style={styles.titleText}>{slide.title}</CardTitle>
                  <CardDescription style={styles.centerText}>{slide.description}</CardDescription>
                </View>
              </View>
            </CardHeader>

            <CardContent style={styles.cardContent}>
              <View style={styles.progressSection}>
                <Separator />

                <View style={styles.topRow}>
                  <Text style={[styles.smallMutedText, { color: palette.mutedForeground }]}>
                    Progresso
                  </Text>
                  <Text style={styles.smallText}>{Math.round(progress * 100)}%</Text>
                </View>

                <View
                  style={[
                    styles.progressTrack,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' },
                  ]}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: SCREEN_WIDTH ? `${progress * 100}%` : '0%',
                        backgroundColor: palette.primary,
                      },
                    ]}
                  />
                </View>

                <View style={styles.dotsRow}>
                  {SLIDES.map((s, i) => {
                    const active = i === index;
                    return (
                      <View
                        key={s.key}
                        style={[
                          active ? styles.activeDot : styles.inactiveDot,
                          {
                            backgroundColor: active
                              ? palette.primary
                              : isDark
                                ? '#4b5563'
                                : '#d1d5db',
                          },
                        ]}
                      />
                    );
                  })}
                </View>
              </View>

              <Button style={styles.fullWidth} onPress={goNext}>
                <View style={styles.buttonContentRow}>
                  <Text style={styles.buttonLabel}>{isLast ? 'Começar' : 'Continuar'}</Text>
                  <ArrowRight color={palette.primaryForeground} size={18} />
                </View>
              </Button>

              <Button
                variant="outline"
                style={styles.fullWidth}
                onPress={() => {
                  router.push('/(auth)/sign-up');
                }}>
                <Text style={styles.buttonLabel}>Criar conta</Text>
              </Button>
            </CardContent>
          </Card>

          <Text style={[styles.footerTip, { color: palette.mutedForeground }]}>
            Dica: por ser demo, você pode trocar as rotas no final do onboarding sem medo 😄
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
  },
  fullWidth: {
    width: '100%',
  },
  cardHeader: {
    rowGap: 8,
  },
  headerContent: {
    alignItems: 'center',
    rowGap: 12,
  },
  slideIconWrapper: {
    height: 64,
    width: 64,
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
    rowGap: 16,
  },
  progressSection: {
    rowGap: 12,
  },
  smallText: {
    fontSize: 14,
    lineHeight: 20,
  },
  smallMutedText: {
    fontSize: 14,
    lineHeight: 20,
  },
  smallLinkText: {
    fontSize: 14,
    lineHeight: 20,
  },
  progressTrack: {
    height: 8,
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
  },
  dotsRow: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  activeDot: {
    height: 10,
    width: 10,
    borderRadius: 999,
  },
  inactiveDot: {
    height: 8,
    width: 8,
    borderRadius: 999,
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
  footerTip: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
});
