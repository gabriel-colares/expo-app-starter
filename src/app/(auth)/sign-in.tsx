import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react-native';

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

export default function SignIn() {
  const { colorScheme } = useColorScheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    const e = email.trim();
    const p = password.trim();
    return e.length > 0 && p.length >= 6 && !loading;
  }, [email, password, loading]);

  async function onSubmit() {
    if (!canSubmit) return;

    try {
      setLoading(true);

      // TODO: chamar sua action/api de login aqui
      // await auth.signIn({ email: email.trim(), password });

      await new Promise((r) => setTimeout(r, 650));
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
                  <Lock
                    color={THEME[colorScheme === 'dark' ? 'dark' : 'light'].primary}
                    size={22}
                  />
                </View>

                <View className="items-center">
                  <CardTitle className="text-2xl">Entrar</CardTitle>
                  <CardDescription className="text-center">
                    Use seu e-mail e senha para acessar sua conta.
                  </CardDescription>
                </View>
              </View>
            </CardHeader>

            <CardContent className="gap-4">
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
                    <Mail
                      color={THEME[colorScheme === 'dark' ? 'dark' : 'light'].mutedForeground}
                      size={18}
                    />
                  </View>
                </View>
              </View>

              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Label nativeID="password">Senha</Label>

                  <Pressable
                    onPress={() => {
                      // TODO: navegue para "esqueci minha senha"
                    }}
                    hitSlop={10}>
                    <Text className="text-sm text-primary">Esqueci a senha</Text>
                  </Pressable>
                </View>

                <View className="relative">
                  <Input
                    aria-labelledby="password"
                    placeholder="Sua senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    className="pl-11 pr-11"
                    returnKeyType="done"
                    onSubmitEditing={onSubmit}
                  />

                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock
                      color={THEME[colorScheme === 'dark' ? 'dark' : 'light'].mutedForeground}
                      size={18}
                    />
                  </View>

                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={10}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showPassword ? (
                      <EyeOff
                        color={THEME[colorScheme === 'dark' ? 'dark' : 'light'].mutedForeground}
                        size={18}
                      />
                    ) : (
                      <Eye
                        color={THEME[colorScheme === 'dark' ? 'dark' : 'light'].mutedForeground}
                        size={18}
                      />
                    )}
                  </Pressable>
                </View>

                <Text className="text-xs text-muted-foreground">
                  A senha deve ter pelo menos 6 caracteres.
                </Text>
              </View>

              <Button className="mt-2 w-full" onPress={onSubmit} disabled={!canSubmit}>
                <View className="flex-row items-center justify-center gap-2">
                  {loading ? <Loader2 className="text-primary-foreground" size={18} /> : null}
                  <Text className="font-medium">{loading ? 'Entrando…' : 'Entrar'}</Text>
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
                  // TODO: login social (Google/Apple/etc)
                }}>
                <Text className="font-medium">Continuar com Google</Text>
              </Button>
            </CardContent>

            <CardFooter className="items-center justify-center">
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">Não tem conta?</Text>
                <Pressable
                  onPress={() => {
                    router.push('/(auth)/sign-up');
                  }}
                  hitSlop={10}>
                  <Text className="text-sm font-medium text-primary">Criar conta</Text>
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
