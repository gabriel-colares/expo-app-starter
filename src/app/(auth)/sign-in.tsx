import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Eye, EyeOff, Loader2, Mail, Lock, CheckCircle2, XCircle } from 'lucide-react-native';
import { z } from 'zod';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const SignInSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
});

type SignInValues = z.infer<typeof SignInSchema>;

const MOCK_USER: SignInValues = {
  email: 'demo@venust.app',
  password: '123456',
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-xs text-destructive">{message}</Text>;
}

export default function SignIn() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme === 'dark' ? 'dark' : 'light'];

  const [showPassword, setShowPassword] = useState(false);
  const [loggedUser, setLoggedUser] = useState<{ email: string; name: string } | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const email = useWatch({ control, name: 'email' }) ?? '';
  const password = useWatch({ control, name: 'password' }) ?? '';

  const canSubmit = useMemo(() => {
    if (isSubmitting) return false;
    return SignInSchema.safeParse({ email, password }).success;
  }, [email, password, isSubmitting]);

  const showFieldErrors = submitCount > 0;

  function fillDemo() {
    setLoggedUser(null);
    clearErrors();
    setValue('email', MOCK_USER.email, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setValue('password', MOCK_USER.password, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  async function onSubmit(values: SignInValues) {
    setLoggedUser(null);
    clearErrors('root');

    await new Promise((r) => setTimeout(r, 650));

    const e = values.email.trim().toLowerCase();
    const p = values.password;

    const ok = e === MOCK_USER.email.toLowerCase() && p === MOCK_USER.password;

    if (!ok) {
      setError('root', { type: 'manual', message: 'E-mail ou senha inválidos para a conta demo.' });
      return;
    }

    setLoggedUser({ email: MOCK_USER.email, name: 'Usuário Demo' });
    router.replace('/(tabs)/inicio');
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
              {/* Conta demo (discreta) */}
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

              {/* Feedback visual */}
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

              {errors.root?.message ? (
                <View className="flex-row items-start gap-2 rounded-md border border-border bg-destructive/10 px-3 py-2">
                  <XCircle color={theme.destructive} size={18} />
                  <View className="flex-1">
                    <Text className="text-sm font-medium text-destructive">Falha no login</Text>
                    <Text className="text-xs text-muted-foreground">{errors.root.message}</Text>
                  </View>
                </View>
              ) : null}

              {/* Email */}
              <View className="gap-2">
                <Label nativeID="email">E-mail</Label>

                <View className="relative">
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        aria-labelledby="email"
                        placeholder="voce@exemplo.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="emailAddress"
                        value={value}
                        onChangeText={(v) => {
                          onChange(v);
                          setLoggedUser(null);
                          clearErrors('root');
                        }}
                        onBlur={onBlur}
                        className="pl-11"
                        returnKeyType="next"
                      />
                    )}
                  />
                  <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail color={theme.mutedForeground} size={18} />
                  </View>
                </View>

                <FieldError message={showFieldErrors ? errors.email?.message : undefined} />
              </View>

              {/* Password */}
              <View className="gap-2">
                <View className="flex-row items-center justify-between">
                  <Label nativeID="password">Senha</Label>

                  <Pressable onPress={() => {}} hitSlop={10}>
                    <Text className="text-sm text-primary">Esqueci a senha</Text>
                  </Pressable>
                </View>

                <View className="relative">
                  <Controller
                    control={control}
                    name="password"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        aria-labelledby="password"
                        placeholder="Sua senha"
                        value={value}
                        onChangeText={(v) => {
                          onChange(v);
                          setLoggedUser(null);
                          clearErrors('root');
                        }}
                        onBlur={onBlur}
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        className="pl-11 pr-11"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />
                    )}
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

                <FieldError message={showFieldErrors ? errors.password?.message : undefined} />
              </View>

              <Button
                className="mt-1 w-full"
                onPress={handleSubmit(onSubmit)}
                disabled={!canSubmit}>
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
