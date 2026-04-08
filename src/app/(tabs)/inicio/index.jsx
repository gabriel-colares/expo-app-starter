import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { THEME } from '@/lib/theme';
import { Link } from 'expo-router';
import { BookOpen, Compass, Search, Sparkles, StarIcon, TrendingUp } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const IMAGE_STYLE = {
  height: 76,
  width: 76,
};

const QUICK_ACTIONS = [
  {
    title: 'Comecar rapido',
    description: 'Abra exemplos prontos e duplique para seu fluxo.',
    icon: Sparkles,
  },
  {
    title: 'Explorar componentes',
    description: 'Veja cards, botoes e layouts para reaproveitar.',
    icon: Compass,
  },
  {
    title: 'Acompanhar progresso',
    description: 'Organize tarefas por sprint e prioridade.',
    icon: TrendingUp,
  },
];

const EXAMPLE_SECTIONS = [
  {
    title: 'Cards e listas',
    description: 'Use esta secao como base para dashboards com conteudo variavel.',
  },
  {
    title: 'Navegacao guiada',
    description: 'Combine tabs e stacks para separar jornadas do usuario.',
  },
  {
    title: 'Estados visuais',
    description: 'Mostre carregamento, sucesso e erro de maneira consistente.',
  },
];

export default function Inicio() {
  const { colorScheme } = useColorScheme();
  const palette = THEME[colorScheme === 'dark' ? 'dark' : 'light'];
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: palette.background }]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      <Card style={styles.heroCard}>
        <CardHeader style={styles.heroHeader}>
          <Image source={LOGO[colorScheme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />
          <View style={styles.heroTextBlock}>
            <CardTitle style={styles.heroTitle}>Home de exemplo</CardTitle>
            <CardDescription style={styles.heroDescription}>
              Cards, pesquisa e areas rolaveis para acelerar sua base.
            </CardDescription>
          </View>
        </CardHeader>

        <CardContent style={styles.heroContent}>
          <View style={styles.instructionsContainer}>
            <Text style={[styles.instructionText, { color: palette.mutedForeground }]}>
              1. Edit <Text variant="code">app/index.jsx</Text> to get started.
            </Text>
            <Text style={[styles.instructionText, { color: palette.mutedForeground }]}>
              2. Save to see your changes instantly.
            </Text>
          </View>

          <View style={styles.searchRow}>
            <View style={styles.searchInputWrap}>
              <Input placeholder="Pesquisar exemplos" style={styles.searchInput} />
              <View style={styles.searchIconWrap}>
                <Search color={palette.mutedForeground} size={16} />
              </View>
            </View>
            <Button style={styles.roundedButton}>
              <Text>Pesquisar</Text>
            </Button>
          </View>
        </CardContent>
      </Card>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Acoes rapidas</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Horizontal Scroll
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}>
        {QUICK_ACTIONS.map((item) => (
          <Card key={item.title} style={styles.quickCard}>
            <CardHeader style={styles.quickCardHeader}>
              <View
                style={[
                  styles.quickIconBox,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)' },
                ]}>
                <item.icon color={palette.primary} size={18} />
              </View>
              <CardTitle style={styles.quickCardTitle}>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </ScrollView>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Exemplos verticais</Text>
        <Text style={[styles.sectionMeta, { color: palette.mutedForeground }]}>
          Vertical Scroll
        </Text>
      </View>

      <View style={styles.verticalList}>
        {EXAMPLE_SECTIONS.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent style={styles.exampleActionsRow}>
              <Button variant="outline" style={styles.roundedButtonSmall}>
                <Icon as={BookOpen} size={16} />
                <Text>Detalhes</Text>
              </Button>
              <Button style={styles.roundedButtonSmall}>
                <Text>Usar bloco</Text>
              </Button>
            </CardContent>
          </Card>
        ))}
      </View>

      <View style={styles.footerActionsRow}>
        <Link href="https://reactnativereusables.com" asChild>
          <Button style={styles.roundedButtonFooter}>
            <Text>Browse the Docs</Text>
          </Button>
        </Link>
        <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
          <Button variant="ghost" style={styles.roundedButtonFooter}>
            <Text>Star the Repo</Text>
            <Icon as={StarIcon} />
          </Button>
        </Link>
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
    paddingBottom: 32,
  },
  heroCard: {
    borderRadius: 20,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 14,
  },
  heroTextBlock: {
    flex: 1,
    rowGap: 2,
  },
  heroTitle: {
    fontSize: 22,
    lineHeight: 28,
  },
  heroDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  heroContent: {
    rowGap: 14,
  },
  instructionsContainer: {
    rowGap: 6,
  },
  instructionText: {
    fontSize: 13,
    lineHeight: 18,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  searchInputWrap: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  searchInput: {
    paddingLeft: 34,
    borderRadius: 999,
  },
  searchIconWrap: {
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -8,
  },
  roundedButton: {
    borderRadius: 999,
    paddingHorizontal: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
  horizontalListContent: {
    columnGap: 10,
    paddingRight: 2,
  },
  quickCard: {
    width: 230,
    borderRadius: 18,
  },
  quickCardHeader: {
    rowGap: 10,
  },
  quickIconBox: {
    height: 32,
    width: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickCardTitle: {
    fontSize: 15,
    lineHeight: 20,
  },
  verticalList: {
    rowGap: 10,
  },
  exampleActionsRow: {
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
  },
  roundedButtonSmall: {
    borderRadius: 999,
    paddingHorizontal: 14,
  },
  footerActionsRow: {
    marginTop: 4,
    flexDirection: 'row',
    columnGap: 8,
    flexWrap: 'wrap',
  },
  roundedButtonFooter: {
    borderRadius: 999,
  },
});
