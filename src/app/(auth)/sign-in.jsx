import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Eye, EyeOff, Loader2, Mail, Lock, CheckCircle2, XCircle } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

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

const FIELD_ERROR = {
  email: 'Informe um e-mail válido.',
  password: 'A senha deve ter pelo menos 6 caracteres.',
  root: 'E-mail ou senha inválidos para a conta demo.',
};

const MOCK_USER = {
  email: 'demo@venust.app',
  password: '123456',
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value) {
  return value.length >= 6;
}

function validateSignIn(values) {
  return {
    email: isValidEmail(values.email.trim()) ? '' : FIELD_ERROR.email,
    password: isValidPassword(values.password) ? '' : FIELD_ERROR.password,
  };
}

function hasErrors(errors) {
  return Boolean(errors.email || errors.password);
}

function FieldError({ message }) {
  if (!message) return null;
  return <Text className="text-xs text-destructive">{message}</Text>;
}

export default function SignIn() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  const [showPassword, setShowPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [rootError, setRootError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    !isSubmitting && isValidEmail(form.email.trim()) && isValidPassword(form.password);

  const showFieldErrors = hasSubmitted;

  function updateField(name, value) {
    const nextForm = { ...form, [name]: value };

    setForm(nextForm);
    setLoggedUser(null);
    setRootError('');

    if (hasSubmitted) {
      setErrors(validateSignIn(nextForm));
    }
  }

  function fillDemo() {
    const nextForm = { email: MOCK_USER.email, password: MOCK_USER.password };

    setLoggedUser(null);
    setRootError('');
    setForm(nextForm);

    if (hasSubmitted) {
      setErrors(validateSignIn(nextForm));
    }
  }

  async function onSubmit() {
    setHasSubmitted(true);

    const nextErrors = validateSignIn(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setLoggedUser(null);
    setRootError('');
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 650));

      const email = form.email.trim().toLowerCase();
      const password = form.password;

      const ok = email === MOCK_USER.email.toLowerCase() && password === MOCK_USER.password;

      if (!ok) {
        setRootError(FIELD_ERROR.root);
        return;
      }

      setLoggedUser({ email: MOCK_USER.email, name: 'Usuário Demo' });
      router.replace('/(tabs)/inicio');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className="flex-1 bg-background">
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingVertical: 32,
          justifyContent: 'center',
        }}>
        <View className="w-full max-w-md self-center">
          <Card className="w-full">
            <CardHeader className="gap-2">
              <View className="items-center gap-2">
                <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                  <Lock color={theme.primary} size={20} />
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
              <View className="rounded-md border border-border bg-muted/10 px-3 py-2">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm font-medium">Conta demo</Text>

                  <Pressable onPress={fillDemo} hitSlop={10} className="px-2 py-1">
                    <Text className="text-xs font-medium text-primary">Preencher</Text>
                  </Pressable>
                </View>

                <Text className="text-xs text-muted-foreground">
                  {MOCK_USER.email} • senha {MOCK_USER.password}
                </Text>
              </View>

              {loggedUser ? (
                <View className="flex-row items-start gap-2 rounded-md border border-border bg-primary/10 px-3 py-2">
                  <CheckCircle2 color={theme.primary} size={18} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium">Login aprovado</Text>
                    <Text className="text-xs text-muted-foreground">
                      Bem-vindo, {loggedUser.name} ({loggedUser.email})
                    </Text>
                  </View>
                </View>
              ) : null}

              {rootError ? (
                <View className="flex-row items-start gap-2 rounded-md border border-border bg-destructive/10 px-3 py-2">
                  <XCircle color={theme.destructive} size={18} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-destructive">Falha no login</Text>
                    <Text className="text-xs text-muted-foreground">{rootError}</Text>
                  </View>
                </View>
              ) : null}

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
                    value={form.email}
                    onChangeText={(value) => updateField('email', value)}
                    className="pl-11"
                    returnKeyType="next"
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail color={theme.mutedForeground} size={18} />
                  </View>
                </View>

                <FieldError message={showFieldErrors ? errors.email : undefined} />
              </View>

              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Label nativeID="password">Senha</Label>

                  <Pressable onPress={() => {}} hitSlop={10}>
                    <Text className="text-sm text-primary">Esqueci a senha</Text>
                  </Pressable>
                </View>

                <View className="relative">
                  <Input
                    aria-labelledby="password"
                    placeholder="Sua senha"
                    value={form.password}
                    onChangeText={(value) => updateField('password', value)}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    className="pl-11 pr-11"
                    returnKeyType="done"
                    onSubmitEditing={onSubmit}
                  />

                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock color={theme.mutedForeground} size={18} />
                  </View>

                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={10}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showPassword ? (
                      <EyeOff color={theme.mutedForeground} size={18} />
                    ) : (
                      <Eye color={theme.mutedForeground} size={18} />
                    )}
                  </Pressable>
                </View>

                <Text className="text-xs text-muted-foreground">
                  A senha deve ter pelo menos 6 caracteres.
                </Text>

                <FieldError message={showFieldErrors ? errors.password : undefined} />
              </View>

              <Button className="mt-1 w-full" onPress={onSubmit} disabled={!canSubmit}>
                <View className="flex-row items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="text-primary-foreground" size={18} /> : null}
                  <Text className="font-medium">{isSubmitting ? 'Entrando…' : 'Entrar'}</Text>
                </View>
              </Button>

              <View className="my-1 flex-row items-center gap-3">
                <Separator className="flex-1" />
                <Text className="text-xs text-muted-foreground">ou</Text>
                <Separator className="flex-1" />
              </View>

              <Button variant="outline" className="w-full" onPress={() => {}}>
                <Text className="font-medium">Continuar com Google</Text>
              </Button>
            </CardContent>

            <CardFooter className="items-center justify-center">
              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-muted-foreground">Não tem conta?</Text>
                <Pressable onPress={() => router.push('/(auth)/sign-up')} hitSlop={10}>
                  <Text className="text-sm font-medium text-primary">Criar conta</Text>
                </Pressable>
              </View>
            </CardFooter>
          </Card>

          <Text className="mt-3 text-center text-xs text-muted-foreground">
            Ao continuar, você concorda com os termos e a política de privacidade.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
