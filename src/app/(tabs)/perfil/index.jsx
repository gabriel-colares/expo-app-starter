import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import {
  Bell,
  Briefcase,
  ChevronRight,
  CreditCard,
  MoonStar,
  Search,
  Shield,
  User,
} from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

const STATS = [
  { label: 'Projetos', value: '12' },
  { label: 'Tarefas', value: '48' },
  { label: 'Conquistas', value: '9' },
];

const SHORTCUTS = [
  {
    title: 'Assinatura',
    subtitle: 'Plano Pro ativo',
    icon: CreditCard,
  },
  {
    title: 'Seguranca',
    subtitle: '2FA habilitado',
    icon: Shield,
  },
  {
    title: 'Equipe',
    subtitle: '3 membros conectados',
    icon: Briefcase,
  },
];

const ACCOUNT_LINKS = [
  'Dados pessoais',
  'Privacidade',
  'Notificacoes por e-mail',
  'Suporte e ajuda',
];

export default function Perfil() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkPreview: false,
    loginAlerts: true,
  });

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.profileCard}>
        <CardHeader style={styles.profileHeader}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)' },
            ]}>
            <Text style={styles.avatarText}>GC</Text>
          </View>

          <View style={styles.profileInfo}>
            <CardTitle style={styles.profileName}>Gabriel Colares</CardTitle>
            <CardDescription>@gabriel.colares • Product Builder</CardDescription>
          </View>
        </CardHeader>

        <CardContent style={styles.profileActions}>
          <Button style={styles.roundedButtonPrimary}>
            <User color={palette.primaryForeground} size={15} />
            <Text>Editar perfil</Text>
          </Button>
          <Button variant="outline" style={styles.roundedButtonSecondary}>
            <Text>Compartilhar</Text>
          </Button>
        </CardContent>
      </Card>

      <View style={styles.statsRow}>
        {STATS.map((stat) => (
          <Card key={stat.label} style={styles.statCard}>
            <CardContent style={styles.statContent}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: palette.mutedForeground }]}>
                {stat.label}
              </Text>
            </CardContent>
          </Card>
        ))}
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Horizontal Scroll
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.shortcutsContent}>
        {SHORTCUTS.map((item) => (
          <Card key={item.title} style={styles.shortcutCard}>
            <CardHeader style={styles.shortcutHeader}>
              <View
                style={[
                  styles.shortcutIcon,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)' },
                ]}>
                <item.icon color={palette.primary} size={16} />
              </View>
              <CardTitle style={styles.shortcutTitle}>{item.title}</CardTitle>
              <CardDescription>{item.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" style={styles.roundedButtonSecondary}>
                <Text>Gerenciar</Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </ScrollView>

      <Card>
        <CardHeader>
          <CardTitle>Buscar configuracao</CardTitle>
          <CardDescription>Encontre preferencias e itens da conta rapidamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <View style={styles.searchWrap}>
            <Input placeholder="Digite para filtrar" style={styles.searchInput} />
            <View style={styles.searchIconWrap}>
              <Search color={palette.mutedForeground} size={16} />
            </View>
          </View>
        </CardContent>
      </Card>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Vertical Scroll
        </Text>
      </View>

      <View style={styles.preferencesList}>
        <Card>
          <CardContent style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <Text style={styles.preferenceTitle}>Notificacoes push</Text>
              <Text style={[styles.preferenceSubtitle, { color: palette.mutedForeground }]}>
                Receba alertas de atividades importantes.
              </Text>
            </View>
            <Switch
              value={preferences.notifications}
              onValueChange={(value) =>
                setPreferences((prev) => ({ ...prev, notifications: value }))
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <View style={styles.preferenceTitleRow}>
                <MoonStar color={palette.foreground} size={15} />
                <Text style={styles.preferenceTitle}>Preview escuro</Text>
              </View>
              <Text style={[styles.preferenceSubtitle, { color: palette.mutedForeground }]}>
                Simule tema escuro para componentes de perfil.
              </Text>
            </View>
            <Switch
              value={preferences.darkPreview}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, darkPreview: value }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent style={styles.preferenceRow}>
            <View style={styles.preferenceTextWrap}>
              <View style={styles.preferenceTitleRow}>
                <Bell color={palette.foreground} size={15} />
                <Text style={styles.preferenceTitle}>Alertas de login</Text>
              </View>
              <Text style={[styles.preferenceSubtitle, { color: palette.mutedForeground }]}>
                Seja avisado quando houver acesso de novo dispositivo.
              </Text>
            </View>
            <Switch
              value={preferences.loginAlerts}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, loginAlerts: value }))}
            />
          </CardContent>
        </Card>
      </View>

      <Card>
        <CardHeader>
          <CardTitle>Conta e suporte</CardTitle>
          <CardDescription>Exemplo de lista navegavel com botoes arredondados.</CardDescription>
        </CardHeader>
        <CardContent style={styles.linksList}>
          {ACCOUNT_LINKS.map((label) => (
            <Pressable key={label} style={styles.linkRow}>
              <Text style={styles.linkText}>{label}</Text>
              <ChevronRight color={palette.mutedForeground} size={16} />
            </Pressable>
          ))}
        </CardContent>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    rowGap: 14,
    paddingBottom: 36,
  },
  profileCard: {
    borderRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  avatar: {
    height: 58,
    width: 58,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '700',
  },
  profileInfo: {
    flex: 1,
    rowGap: 2,
  },
  profileName: {
    fontSize: 22,
    lineHeight: 28,
  },
  profileActions: {
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
  },
  roundedButtonPrimary: {
    borderRadius: 999,
    paddingHorizontal: 14,
  },
  roundedButtonSecondary: {
    borderRadius: 999,
    paddingHorizontal: 14,
  },
  statsRow: {
    flexDirection: 'row',
    columnGap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
  },
  statContent: {
    alignItems: 'center',
    rowGap: 4,
    paddingVertical: 2,
  },
  statValue: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  sectionMeta: {
    fontSize: 12,
    lineHeight: 16,
  },
  shortcutsContent: {
    columnGap: 10,
    paddingRight: 2,
  },
  shortcutCard: {
    width: 220,
    borderRadius: 18,
  },
  shortcutHeader: {
    rowGap: 8,
  },
  shortcutIcon: {
    height: 30,
    width: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutTitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  searchWrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: 999,
    paddingLeft: 34,
  },
  searchIconWrap: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -8,
  },
  preferencesList: {
    rowGap: 10,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    columnGap: 10,
  },
  preferenceTextWrap: {
    flex: 1,
    rowGap: 4,
  },
  preferenceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  preferenceTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  preferenceSubtitle: {
    fontSize: 12,
    lineHeight: 16,
  },
  linksList: {
    rowGap: 8,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
