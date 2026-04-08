import React from 'react';
import { View } from 'react-native';
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

  return (
    <View className="flex-1 items-center justify-center bg-background px-6 py-10">
      <View className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader className="items-center gap-2">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
              <AlertTriangle color={palette.destructive} size={26} />
            </View>

            <View className="items-center">
              <CardTitle className="text-2xl">Página não encontrada</CardTitle>
              <CardDescription className="text-center">
                A rota que você tentou acessar não existe ou foi movida.
              </CardDescription>
            </View>
          </CardHeader>

          <CardContent className="gap-3">
            <Button
              className="w-full"
              onPress={() => {
                router.replace('/(onboarding)/index');
              }}>
              <View className="flex-row items-center justify-center gap-2">
                <Home color={palette.primaryForeground} size={18} />
                <Text className="font-medium">Ir para o início</Text>
              </View>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onPress={() => {
                router.back();
              }}>
              <Text className="font-medium">Voltar</Text>
            </Button>
          </CardContent>
        </Card>

        <Text className="mt-4 text-center text-xs text-muted-foreground">
          Se isso continuar acontecendo, verifique suas rotas no expo-router.
        </Text>
      </View>
    </View>
  );
}
