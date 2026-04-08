import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Eye, EyeOff, Loader2, Mail, Lock, User, CheckCircle2, XCircle } from 'lucide-react-native';
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
  name: 'Informe seu nome (mín. 2 caracteres).',
  email: 'Informe um e-mail válido.',
  password: 'A senha deve ter pelo menos 6 caracteres.',
  root: 'Não foi possível criar sua conta. Tente novamente.',
};

function isValidName(value) {
  return value.trim().length >= 2;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPassword(value) {
  return value.length >= 6;
}

function validateSignUp(values) {
  return {
    name: isValidName(values.name) ? '' : FIELD_ERROR.name,
    email: isValidEmail(values.email.trim()) ? '' : FIELD_ERROR.email,
    password: isValidPassword(values.password) ? '' : FIELD_ERROR.password,
  };
}

function hasErrors(errors) {
  return Boolean(errors.name || errors.email || errors.password);
}

export default function SignUp() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  const [showPassword, setShowPassword] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [rootError, setRootError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit =
    !isSubmitting &&
    isValidName(form.name) &&
    isValidEmail(form.email.trim()) &&
    isValidPassword(form.password);

  const showFieldErrors = hasSubmitted;

  function updateField(name, value) {
    const nextForm = { ...form, [name]: value };

    setForm(nextForm);
    setCreatedUser(null);
    setRootError('');

    if (hasSubmitted) {
      setErrors(validateSignUp(nextForm));
    }
  }

  async function onSubmit() {
    setHasSubmitted(true);

    const nextErrors = validateSignUp(form);
    setErrors(nextErrors);
    if (hasErrors(nextErrors)) return;

    setCreatedUser(null);
    setRootError('');
    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 650));

      setCreatedUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      });

      router.replace('/(tabs)/inicio');
    } catch {
      setRootError(FIELD_ERROR.root);
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
                  <User color={palette.primary} size={20} />
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
              {createdUser ? (
                <View className="flex-row items-start gap-2 rounded-md border border-border bg-primary/10 px-3 py-2">
                  <CheckCircle2 color={palette.primary} size={18} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium">Conta criada</Text>
                    <Text className="text-xs text-muted-foreground">
                      {createdUser.name} • {createdUser.email}
                    </Text>
                  </View>
                </View>
              ) : null}

              {rootError ? (
                <View className="flex-row items-start gap-2 rounded-md border border-border bg-destructive/10 px-3 py-2">
                  <XCircle color={palette.destructive} size={18} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-destructive">Falha no cadastro</Text>
                    <Text className="text-xs text-muted-foreground">{rootError}</Text>
                  </View>
                </View>
              ) : null}

              <View className="gap-2">
                <Label nativeID="name">Nome</Label>
                <View className="relative">
                  <Input
                    aria-labelledby="name"
                    placeholder="Seu nome"
                    autoCapitalize="words"
                    autoCorrect={false}
                    textContentType="name"
                    value={form.name}
                    onChangeText={(value) => updateField('name', value)}
                    className="pl-11"
                    returnKeyType="next"
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User color={palette.mutedForeground} size={18} />
                  </View>
                </View>

                <FieldError message={showFieldErrors ? errors.name : undefined} />
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
                    value={form.email}
                    onChangeText={(value) => updateField('email', value)}
                    className="pl-11"
                    returnKeyType="next"
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail color={palette.mutedForeground} size={18} />
                  </View>
                </View>

                <FieldError message={showFieldErrors ? errors.email : undefined} />
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
                    value={form.password}
                    onChangeText={(value) => updateField('password', value)}
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

                <FieldError message={showFieldErrors ? errors.password : undefined} />
              </View>

              <Button className="mt-1 w-full" onPress={onSubmit} disabled={!canSubmit}>
                <View className="flex-row items-center justify-center gap-2">
                  {isSubmitting ? <Loader2 className="text-primary-foreground" size={18} /> : null}
                  <Text className="font-medium">{isSubmitting ? 'Criando…' : 'Criar conta'}</Text>
                </View>
              </Button>

              <View className="my-1 flex-row items-center gap-3">
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
                <Pressable onPress={() => router.push('/(auth)/sign-in')} hitSlop={10}>
                  <Text className="text-sm font-medium text-primary">Entrar</Text>
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

function FieldError({ message }) {
  if (!message) return null;
  return <Text className="text-xs text-destructive">{message}</Text>;
}
