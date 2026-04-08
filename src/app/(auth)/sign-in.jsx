import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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

function FieldError({ message, color }) {
  if (!message) return null;
  return <Text style={[styles.fieldError, { color }]}>{message}</Text>;
}

export default function SignIn() {
  const { colorScheme } = useColorScheme();
  const theme = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

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
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bottomOffset={16}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentWrapper}>
          <Card style={styles.fullWidth}>
            <CardHeader style={styles.cardHeader}>
              <View style={styles.headerContent}>
                <View
                  style={[
                    styles.headerIconWrapper,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.06)' },
                  ]}>
                  <Lock color={theme.primary} size={20} />
                </View>

                <View style={styles.centeredItems}>
                  <CardTitle style={styles.titleText}>Entrar</CardTitle>
                  <CardDescription style={styles.centerText}>
                    Use seu e-mail e senha para acessar sua conta.
                  </CardDescription>
                </View>
              </View>
            </CardHeader>

            <CardContent style={styles.cardContent}>
              <View
                style={[
                  styles.demoCard,
                  {
                    borderColor: theme.border,
                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.03)',
                  },
                ]}>
                <View style={styles.rowBetween}>
                  <Text style={styles.bodyStrong}>Conta demo</Text>

                  <Pressable onPress={fillDemo} hitSlop={10} style={styles.demoActionButton}>
                    <Text style={[styles.demoActionText, { color: theme.primary }]}>Preencher</Text>
                  </Pressable>
                </View>

                <Text style={[styles.captionText, { color: theme.mutedForeground }]}>
                  {MOCK_USER.email} • senha {MOCK_USER.password}
                </Text>
              </View>

              {loggedUser ? (
                <View
                  style={[
                    styles.feedbackCard,
                    {
                      borderColor: theme.border,
                      backgroundColor: isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.05)',
                    },
                  ]}>
                  <CheckCircle2 color={theme.primary} size={18} />
                  <View style={styles.flexOne}>
                    <Text style={styles.bodyStrong}>Login aprovado</Text>
                    <Text style={[styles.captionText, { color: theme.mutedForeground }]}>
                      Bem-vindo, {loggedUser.name} ({loggedUser.email})
                    </Text>
                  </View>
                </View>
              ) : null}

              {rootError ? (
                <View
                  style={[
                    styles.feedbackCard,
                    {
                      borderColor: theme.border,
                      backgroundColor: isDark ? 'rgba(239,68,68,0.18)' : 'rgba(239,68,68,0.1)',
                    },
                  ]}>
                  <XCircle color={theme.destructive} size={18} />
                  <View style={styles.flexOne}>
                    <Text style={[styles.bodyStrong, { color: theme.destructive }]}>
                      Falha no login
                    </Text>
                    <Text style={[styles.captionText, { color: theme.mutedForeground }]}>
                      {rootError}
                    </Text>
                  </View>
                </View>
              ) : null}

              <View style={styles.fieldGroup}>
                <Label nativeID="email">E-mail</Label>

                <View style={styles.inputWrapper}>
                  <Input
                    aria-labelledby="email"
                    placeholder="voce@exemplo.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="emailAddress"
                    value={form.email}
                    onChangeText={(value) => updateField('email', value)}
                    style={styles.inputWithLeftIcon}
                    returnKeyType="next"
                  />
                  <View style={styles.leftIconContainer}>
                    <Mail color={theme.mutedForeground} size={18} />
                  </View>
                </View>

                <FieldError
                  message={showFieldErrors ? errors.email : undefined}
                  color={theme.destructive}
                />
              </View>

              <View style={styles.fieldGroup}>
                <View style={styles.rowBetween}>
                  <Label nativeID="password">Senha</Label>

                  <Pressable onPress={() => {}} hitSlop={10}>
                    <Text style={[styles.smallLink, { color: theme.primary }]}>
                      Esqueci a senha
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.inputWrapper}>
                  <Input
                    aria-labelledby="password"
                    placeholder="Sua senha"
                    value={form.password}
                    onChangeText={(value) => updateField('password', value)}
                    secureTextEntry={!showPassword}
                    textContentType="password"
                    style={styles.inputWithBothIcons}
                    returnKeyType="done"
                    onSubmitEditing={onSubmit}
                  />

                  <View style={styles.leftIconContainer}>
                    <Lock color={theme.mutedForeground} size={18} />
                  </View>

                  <Pressable
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={10}
                    style={styles.rightIconContainer}
                    accessibilityRole="button"
                    accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                    {showPassword ? (
                      <EyeOff color={theme.mutedForeground} size={18} />
                    ) : (
                      <Eye color={theme.mutedForeground} size={18} />
                    )}
                  </Pressable>
                </View>

                <Text style={[styles.captionText, { color: theme.mutedForeground }]}>
                  A senha deve ter pelo menos 6 caracteres.
                </Text>

                <FieldError
                  message={showFieldErrors ? errors.password : undefined}
                  color={theme.destructive}
                />
              </View>

              <Button style={styles.submitButton} onPress={onSubmit} disabled={!canSubmit}>
                <View style={styles.buttonContentRow}>
                  {isSubmitting ? <Loader2 color={theme.primaryForeground} size={18} /> : null}
                  <Text style={styles.buttonLabel}>{isSubmitting ? 'Entrando…' : 'Entrar'}</Text>
                </View>
              </Button>

              <View style={styles.dividerRow}>
                <Separator style={styles.flexOne} />
                <Text style={[styles.captionText, { color: theme.mutedForeground }]}>ou</Text>
                <Separator style={styles.flexOne} />
              </View>

              <Button variant="outline" style={styles.fullWidth} onPress={() => {}}>
                <Text style={styles.buttonLabel}>Continuar com Google</Text>
              </Button>
            </CardContent>

            <CardFooter style={styles.cardFooter}>
              <View style={styles.footerRow}>
                <Text style={[styles.bodyText, { color: theme.mutedForeground }]}>
                  Não tem conta?
                </Text>
                <Pressable onPress={() => router.push('/(auth)/sign-up')} hitSlop={10}>
                  <Text style={[styles.bodyStrong, { color: theme.primary }]}>Criar conta</Text>
                </Pressable>
              </View>
            </CardFooter>
          </Card>

          <Text style={[styles.legalText, { color: theme.mutedForeground }]}>
            Ao continuar, você concorda com os termos e a política de privacidade.
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: 'center',
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  cardHeader: {
    rowGap: 8,
  },
  headerContent: {
    alignItems: 'center',
    rowGap: 8,
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
  headerIconWrapper: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  cardContent: {
    rowGap: 16,
  },
  demoCard: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    rowGap: 6,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 8,
  },
  demoActionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  demoActionText: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  flexOne: {
    flex: 1,
  },
  fieldGroup: {
    rowGap: 8,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputWithLeftIcon: {
    paddingLeft: 44,
  },
  inputWithBothIcons: {
    paddingLeft: 44,
    paddingRight: 44,
  },
  leftIconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -9,
  },
  rightIconContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -9,
  },
  submitButton: {
    marginTop: 4,
    width: '100%',
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
  dividerRow: {
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  cardFooter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  bodyStrong: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  captionText: {
    fontSize: 12,
    lineHeight: 16,
  },
  smallLink: {
    fontSize: 14,
    lineHeight: 20,
  },
  fieldError: {
    fontSize: 12,
    lineHeight: 16,
  },
  legalText: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 16,
  },
});
