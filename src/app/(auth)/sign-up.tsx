import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react-native';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { router } from 'expo-router';
import { THEME } from '@/lib/theme';
import { useColorScheme } from 'nativewind';

export default function SignUp() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    const n = name.trim();
    const e = email.trim();
    const p = password.trim();
    return n.length >= 2 && e.length > 0 && p.length >= 6 && !loading;
  }, [name, email, password, loading]);

  async function onSubmit() {
    if (!canSubmit) return;

    try {
      setLoading(true);

      // TODO: chamar sua action/api de cadastro aqui
      // await auth.signUp({ name: name.trim(), email: email.trim(), password });

      await new Promise((r) => setTimeout(r, 650));

      // Opcional: após cadastrar, ir pra sign-in
      // router.replace('/(auth)/sign-in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={Platform.select({ ios: 24, android: 0 })}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-1 items-center justify-center px-6 py-10"
        keyboardShouldPersistTaps="handled">
        <View className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader className="gap-2">
              <View className="items-center gap-2">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <User color={palette.primary} size={22} />
                </View>

                <View className="items-center">
                  <CardTitle className="text-2xl">Criar conta</CardTitle>
                  <CardDescription className="text-center">
                    Preencha os dados abaixo para criar sua conta.
                  </CardDescription>
                </View>
              </View>
            </CardHeader>

            <CardContent className="gap-4">
              <View className="gap-2">
                <Label nativeID="name">Nome</Label>
                <View className="relative">
                  <Input
                    aria-labelledby="name"
                    placeholder="Seu nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                    value={name}
                    onChangeText={setName}
                    className="pl-11"
                    returnKeyType="next"
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User color={palette.mutedForeground} size={18} />
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <Label nativeID="email">E-mail</Label>
                <View className="relative">
                  <Input
                    aria-labelledby="email"
                    placeholder="voce@exemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                    className="pl-11"
                    returnKeyType="next"
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail color={palette.mutedForeground} size={18} />
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Label nativeID="password">Senha</Label>

                  <Pressable
                    onPress={() => {
                      // TODO: mostrar regras/ajuda (se quiser)
                    }}
                    hitSlop={10}>
                    <Text className="text-sm text-primary">Dicas de senha</Text>
                  </Pressable>
                </View>

                <View className="relative">
                  <Input
                    aria-labelledby="password"
                    placeholder="Crie uma senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="newPassword"
                    className="pl-11 pr-11"
                    returnKeyType="done"
                    onSubmitEditing={onSubmit}
                  />

                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock color={palette.mutedForeground} size={18} />
                  </View>

                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={10}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showPassword ? (
                      <EyeOff color={palette.mutedForeground} size={18} />
                    ) : (
                      <Eye color={palette.mutedForeground} size={18} />
                    )}
                  </Pressable>
                </View>

                <Text className="text-xs text-muted-foreground">
                  Use pelo menos 6 caracteres (ideal: 1 número e 1 caractere especial).
                </Text>
              </View>

              <Button className="mt-2 w-full" onPress={onSubmit} disabled={!canSubmit}>
                <View className="flex-row items-center justify-center gap-2">
                  {loading ? <Loader2 className="text-primary-foreground" size={18} /> : null}
                  <Text className="font-medium">{loading ? 'Criando…' : 'Criar conta'}</Text>
                </View>
              </Button>

              <View className="my-2 flex-row items-center gap-3">
                <Separator className="flex-1" />
                <Text className="text-xs text-muted-foreground">ou</Text>
                <Separator className="flex-1" />
              </View>

              <Button
                variant="outline"
                className="w-full"
                onPress={() => {
                  // TODO: cadastro social (Google/Apple/etc)
                }}>
                <Text className="font-medium">Continuar com Google</Text>
              </Button>
            </CardContent>

            <CardFooter className="items-center justify-center">
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">Já tem conta?</Text>
                <Pressable
                  onPress={() => {
                    router.push('/(auth)/sign-in');
                  }}
                  hitSlop={10}>
                  <Text className="text-sm font-medium text-primary">Entrar</Text>
                </Pressable>
              </View>
            </CardFooter>
          </Card>

          <Text className="mt-4 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com os termos e a política de privacidade.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
