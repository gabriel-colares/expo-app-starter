import React, { useMemo, useState } from 'react';
import { Dimensions, Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Slide = {
  key: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
};

const SLIDES: Slide[] = [
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function OnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const slide = SLIDES[index];

  const isLast = index === total - 1;

  const progress = useMemo(() => {
    return (index + 1) / total;
  }, [index, total]);

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
    <View className="flex-1 bg-background px-6 py-10">
      <View className="flex-row items-center justify-between">
        <Text className="text-sm text-muted-foreground">
          {index + 1}/{total}
        </Text>

        <Pressable onPress={skip} hitSlop={10}>
          <Text className="text-sm text-primary">Pular</Text>
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="gap-2">
              <View className="items-center gap-3">
                <View className="h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <slide.Icon color={palette.primary} size={28} />
                </View>

                <View className="items-center">
                  <CardTitle className="text-2xl">{slide.title}</CardTitle>
                  <CardDescription className="text-center">{slide.description}</CardDescription>
                </View>
              </View>
            </CardHeader>

            <CardContent className="gap-4">
              <View className="gap-3">
                <Separator />

                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-muted-foreground">Progresso</Text>
                  <Text className="text-sm">{Math.round(progress * 100)}%</Text>
                </View>

                <View className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <View
                    className="h-full rounded-full bg-primary"
                    style={{ width: SCREEN_WIDTH ? `${progress * 100}%` : '0%' }}
                  />
                </View>

                <View className="flex-row items-center justify-center gap-2 pt-2">
                  {SLIDES.map((s, i) => {
                    const active = i === index;
                    return (
                      <View
                        key={s.key}
                        className={
                          active
                            ? 'h-2.5 w-2.5 rounded-full bg-primary'
                            : 'h-2 w-2 rounded-full bg-muted'
                        }
                      />
                    );
                  })}
                </View>
              </View>

              <Button className="w-full" onPress={goNext}>
                <View className="flex-row items-center justify-center gap-2">
                  <Text className="font-medium">{isLast ? 'Começar' : 'Continuar'}</Text>
                  <ArrowRight color={palette.primaryForeground} size={18} />
                </View>
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onPress={() => {
                  router.push('/(auth)/sign-up');
                }}>
                <Text className="font-medium">Criar conta</Text>
              </Button>
            </CardContent>
          </Card>

          <Text className="mt-4 text-center text-xs text-muted-foreground">
            Dica: por ser demo, você pode trocar as rotas no final do onboarding sem medo 😄
          </Text>
        </View>
      </View>
    </View>
  );
}
