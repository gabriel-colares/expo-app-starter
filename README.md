# my-expo-app (Template)

Template **Expo + Expo Router** com **TypeScript**, **NativeWind**, UI kit em `src/components/ui`, **React Hook Form + Zod**, **Jest** e **react-native-keyboard-controller**.

Este README explica **como usar a estrutura** e **onde colocar cada tipo de código**, para manter o projeto escalável.

---

## Rodando o projeto

Instalar dependências:

```bash
pnpm install
```

Rodar o app (limpando cache do Expo):

```bash
pnpm dev
```

Rodar por plataforma:

```bash
pnpm android
pnpm ios
pnpm web
```

Lint:

```bash
pnpm lint
```

Testes:

```bash
pnpm test
```

---

## Estrutura (atual) e responsabilidades

A ideia principal é: **`src/app` só orquestra tela/rota**.  
Regra de negócio, estado, validação, chamadas HTTP, etc. ficam fora do `app/`, principalmente em `features/`, `lib/`, `hooks/`.

### Tree (resumo)

```bash
src/
  app/
    (auth)/
    (onboarding)/
    (tabs)/
    _layout.tsx
    +not-found.tsx

  assets/
    images/

  components/
    ui/
    shared/

  constants/
  contexts/
  features/
  hooks/
  lib/
  providers/
  types/
```

---

## Rotas com Expo Router (`src/app`)

A pasta `src/app` define rotas por arquivo.

### Grupos (pastas com parênteses)

Pastas como `(auth)`, `(tabs)`, `(onboarding)` são **grupos**: ajudam a organizar, mas **não entram na URL**.

- `(auth)` → telas de autenticação (ex.: `sign-in.tsx`, `sign-up.tsx`)
- `(tabs)` → telas dentro de Tabs (`inicio`, `buscar`, `perfil`)
- `(onboarding)` → onboarding do app

### Layouts

- `src/app/_layout.tsx` → layout raiz (Stack + providers globais)
- `src/app/(tabs)/_layout.tsx` → navegação de Tabs
- `+not-found.tsx` → fallback para rota inexistente

**Boa prática:** tela em `app/` deve ser “fina”:

- renderiza UI
- chama hooks
- dispara ações (ex.: `authStore.signIn()`)
- navega (`router.push/replace`)

---

## UI Kit (`src/components/ui`)

Componentes reutilizáveis e “agnósticos” de negócio:

- `button`, `input`, `text`, `card`, `separator`, etc.

Eles devem ser:

- altamente reutilizáveis
- com variantes (via `cva`, se você usar)
- sem conhecimento de domínio (“auth”, “profile”, etc.)

---

## Shared components (`src/components/shared`)

Componentes reutilizáveis, mas já com alguma intenção de produto (não tão “genéricos” quanto o UI kit).
Ex.: `theme-toggle.tsx`.

---

## Lib (`src/lib`)

Utilitários e infra base:

- `theme.ts` → tokens/tema
- `utils.ts` → helpers (ex.: `cn`)

Aqui é onde você coloca:

- clients (ex.: `http.ts` com fetch/axios)
- adaptadores (storage, device, env)
- helpers de formatação (date, currency)

---

## Providers (`src/providers`)

Providers globais (React Context, wrappers de libs).

Ex.: você pode colocar aqui:

- `KeyboardProvider` do `react-native-keyboard-controller`
- ThemeProvider
- AuthProvider (se usar context)
- QueryClientProvider (se usar React Query)

Apenas certifique-se de “montar” esses providers no `src/app/_layout.tsx`.

---

## Hooks (`src/hooks`) — o que colocar aqui

`hooks/` é para hooks reutilizáveis entre features/telas.

Sugestão de arquivos úteis (o que falta hoje além do `.gitkeep`):

```bash
src/hooks/
  useDebounce.ts
  useMounted.ts
  useIsFirstRender.ts
  useAppState.ts
  useKeyboard.ts
```

Exemplos de responsabilidade:

- `useDebounce(value, delay)` → para busca/inputs
- `useMounted()` → evitar setState após unmount
- `useKeyboard()` → status do teclado (se precisar além do KeyboardAwareScrollView)

---

## Features (`src/features`) — padrão recomendado

Aqui fica o **domínio**: auth, profile, settings, etc.  
Cada feature deve encapsular:

- chamadas de API
- schemas zod
- store (estado da feature)
- utils

Você sugeriu esse formato (ótimo):

```bash
src/features/
  auth/
    auth.api.ts
    auth.schemas.ts
    auth.store.ts
    auth.utils.ts

  profile/
    profile.api.ts
    profile.schemas.ts
    profile.store.ts
```

### Como usar nas telas

Em `src/app/(auth)/sign-in.tsx`, por exemplo:

- tela coleta input (UI)
- valida com schema (ou usa resolver)
- chama `authStore.signIn(...)` (ou `authApi.signIn(...)`)
- navega ao sucesso

A “regra” aqui é: **feature manda, tela orquestra**.

---

## Constants (`src/constants`)

Constantes de produto:

- rotas internas
- chaves de storage
- limites (ex.: `MAX_UPLOAD_MB`)
- enums de UI (ex.: `TAB_HEIGHT`)

Sugestão:

```bash
src/constants/
  storage.ts
  routes.ts
  ui.ts
```

---

## Contexts (`src/contexts`)

Se você tiver contexts “puros” (sem provider específico) ou quiser separar:

- `theme.context.ts`
- `auth.context.ts`

Se você já faz isso em `providers/`, pode manter `contexts/` mais leve.

---

## Types (`src/types`)

Tipos globais:

- types utilitários
- tipos de API
- tipos compartilhados entre features

Sugestão:

```bash
src/types/
  api.ts
  navigation.ts
  env.d.ts
```

---

## Teclado (sem KeyboardAvoidingView)

Esse template usa `react-native-keyboard-controller` para formularios ficarem bons no Android/iOS.

### Provider global

No `src/app/_layout.tsx`, envolva a navegação com `KeyboardProvider`:

```tsx
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </KeyboardProvider>
  );
}
```

### Nas telas com form

Use `KeyboardAwareScrollView` no lugar de `KeyboardAvoidingView`:

```
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
```

E use `contentContainerStyle` com `flexGrow: 1` para evitar conteúdo saindo da tela.

---

## Forms (React Hook Form + Zod)

Padrão recomendado para RN:

- `react-hook-form`
- `zod`
- `@hookform/resolvers/zod`
- `Controller` para inputs RN

Exemplo de schema:

```ts
import { z } from 'zod';

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInValues = z.infer<typeof SignInSchema>;
```

---

## Testes (Jest)

Rodar:

```bash
pnpm test
```

Você já tem um `transformIgnorePatterns` ajustado para transformar libs que precisam (como `@rn-primitives/*`) e evitar erro de JSX em node_modules.

Exemplo simples (padrão “direto” que tende a passar):

```tsx
import { render } from '@testing-library/react-native';
import Inicio from '@/app/(tabs)/inicio/index';

describe('<Inicio />', () => {
  test('renders CTAs', () => {
    const { getByText } = render(<Inicio />);
    getByText('Browse the Docs');
  });
});
```

---

## Convenção de “onde colocar o quê”

Se você estiver em dúvida, siga:

- **UI Genérica** → `src/components/ui`
- **UI Reutilizável com intenção de produto** → `src/components/shared`
- **Regra de negócio / estado / API** → `src/features/<feature>`
- **Hooks reutilizáveis** → `src/hooks`
- **Infra / helpers** → `src/lib`
- **Providers globais** → `src/providers`
- **Rotas / telas** → `src/app`

---

## Próximos arquivos recomendados (para completar o template)

Se você quiser deixar “pronto pra produção”, eu criaria pelo menos:

```bash
src/lib/http.ts                 // fetch wrapper (baseURL, headers, errors)
src/lib/storage.ts              // storage wrapper (AsyncStorage/SecureStore)
src/constants/storage.ts        // chaves
src/constants/routes.ts         // rotas “oficiais”
src/types/api.ts                // tipos base de resposta (data/meta/error)
src/hooks/useDebounce.ts
src/hooks/useMounted.ts
src/features/auth/auth.api.ts
src/features/auth/auth.schemas.ts
src/features/auth/auth.store.ts
src/features/profile/profile.api.ts
src/features/profile/profile.schemas.ts
src/features/profile/profile.store.ts
```

---

## Licença

Template — ajuste conforme seu uso (MIT/privado/etc.).
