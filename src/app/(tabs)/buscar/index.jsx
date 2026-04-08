import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Filter, Flame, Search, SlidersHorizontal } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { ScrollView, StyleSheet, View } from 'react-native';

const FILTERS = ['Todos', 'Design', 'Produto', 'Comercial', 'Suporte', 'Tecnologia'];

const TRENDING = [
  {
    title: 'Playbook de onboarding',
    subtitle: 'Aprimore ativacao em 7 dias',
  },
  {
    title: 'Checklist para squads',
    subtitle: 'Padrao operacional por sprint',
  },
  {
    title: 'Guia de discovery',
    subtitle: 'Valide hipoteses com clientes',
  },
];

const RESULTS = [
  {
    title: 'Painel de metricas semanal',
    description: 'Cards com indicadores, comparativo e alertas para o time.',
    tag: 'Dashboard',
  },
  {
    title: 'Biblioteca de componentes de vendas',
    description: 'Blocos de interface para CRM, funil e previsao comercial.',
    tag: 'Componentes',
  },
  {
    title: 'Fluxo de aprovacao interna',
    description: 'Modelo pronto com status, comentarios e responsaveis.',
    tag: 'Workflow',
  },
  {
    title: 'Central de documentacao de produto',
    description: 'Estruture guias, changelogs e atalhos por modulo.',
    tag: 'Conteudo',
  },
];

export default function Buscar() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.headerCard}>
        <CardHeader style={styles.headerTop}>
          <View style={styles.titleRow}>
            <CardTitle style={styles.titleText}>Explorer</CardTitle>
            <View
              style={[
                styles.hotBadge,
                { backgroundColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.06)' },
              ]}>
              <Flame color={palette.primary} size={14} />
              <Text style={styles.hotBadgeLabel}>Trending</Text>
            </View>
          </View>
          <CardDescription>Pesquise e navegue por colecoes de exemplo.</CardDescription>
        </CardHeader>

        <CardContent style={styles.searchArea}>
          <View style={styles.searchInputWrap}>
            <Input placeholder="Buscar templates, cards ou fluxos" style={styles.searchInput} />
            <View style={styles.searchIconWrap}>
              <Search color={palette.mutedForeground} size={16} />
            </View>
          </View>

          <View style={styles.searchActionsRow}>
            <Button style={styles.roundedButtonPrimary}>
              <Search color={palette.primaryForeground} size={15} />
              <Text>Buscar</Text>
            </Button>
            <Button variant="outline" style={styles.roundedButtonSecondary}>
              <SlidersHorizontal color={palette.foreground} size={15} />
              <Text>Filtros</Text>
            </Button>
          </View>
        </CardContent>
      </Card>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalFiltersContent}>
        {FILTERS.map((filter) => (
          <Button key={filter} variant="outline" style={styles.filterChip}>
            <Filter color={palette.foreground} size={13} />
            <Text>{filter}</Text>
          </Button>
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Destaques</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Horizontal Scroll
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalCardsContent}>
        {TRENDING.map((item) => (
          <Card key={item.title} style={styles.trendingCard}>
            <CardHeader>
              <CardTitle style={styles.trendingTitle}>{item.title}</CardTitle>
              <CardDescription>{item.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button style={styles.roundedButtonPrimary}>
                <Text>Ver detalhe</Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Resultados</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Vertical Scroll
        </Text>
      </View>

      <View style={styles.resultsList}>
        {RESULTS.map((item) => (
          <Card key={item.title} style={styles.resultCard}>
            <CardHeader>
              <View style={styles.resultHeaderRow}>
                <CardTitle style={styles.resultTitle}>{item.title}</CardTitle>
                <View
                  style={[
                    styles.tagPill,
                    { backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)' },
                  ]}>
                  <Text style={[styles.tagText, { color: palette.foreground }]}>{item.tag}</Text>
                </View>
              </View>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent style={styles.resultActionsRow}>
              <Button variant="outline" style={styles.roundedButtonSecondary}>
                <Text>Preview</Text>
              </Button>
              <Button style={styles.roundedButtonPrimary}>
                <Text>Aplicar</Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>
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
  headerCard: {
    borderRadius: 20,
  },
  headerTop: {
    rowGap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    columnGap: 8,
  },
  titleText: {
    fontSize: 22,
    lineHeight: 28,
  },
  hotBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  hotBadgeLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  searchArea: {
    rowGap: 10,
  },
  searchInputWrap: {
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
  searchActionsRow: {
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
  horizontalFiltersContent: {
    columnGap: 8,
    paddingRight: 2,
  },
  filterChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
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
  horizontalCardsContent: {
    columnGap: 10,
    paddingRight: 2,
  },
  trendingCard: {
    width: 250,
    borderRadius: 18,
  },
  trendingTitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  resultsList: {
    rowGap: 10,
  },
  resultCard: {
    borderRadius: 18,
  },
  resultHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    columnGap: 8,
  },
  resultTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  tagPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '600',
  },
  resultActionsRow: {
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
  },
});
