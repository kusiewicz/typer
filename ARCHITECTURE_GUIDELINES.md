# Architektura Frontend - Wytyczne i Konwencje

## 🎯 Cel i Filozofia

**Główna zasada:** "React jako widok" - nie "aplikacja React". Frontend to regularna aplikacja JavaScript/TypeScript, która używa React do renderowania UI.

**Inspiracja:** Artykuł Thoughtworks "Modularizing React Applications with Established UI Patterns"

## 🏗️ Struktura Warstw (Layered Architecture)

### 1. **Warstwa Prezentacji (Presentation Layer)**
- **Komponenty React** - czyste funkcje, tylko renderowanie
- **Hooks** - zarządzanie stanem i side effects
- **Brak logiki biznesowej** w komponentach

### 2. **Warstwa Domenowa (Domain Layer)**
- **Klasy domenowe** - enkapsulacja logiki biznesowej
- **Interfejsy** - kontrakty między warstwami
- **Strategie** - różne implementacje dla różnych przypadków

### 3. **Warstwa Danych (Data Layer)**
- **Server actions** - komunikacja z backendem
- **Validatory** - walidacja danych
- **API clients** - abstrakcja nad HTTP

## 📁 Organizacja Kodu

### Struktura Folderów
```
src/
├── features/           # Funkcjonalności biznesowe
│   ├── auth/          # Autoryzacja
│   │   ├── models/    # Klasy domenowe
│   │   ├── hooks/     # Hooks React
│   │   ├── components/# Komponenty UI
│   │   ├── actions.ts # Server actions
│   │   └── validators.ts # Walidacja
│   └── main/          # Główne funkcjonalności
├── shared/             # Współdzielone komponenty
│   ├── ui/            # Komponenty UI
│   └── hooks/         # Wspólne hooki
└── utils/              # Narzędzia
```

## 🔧 Zasady Implementacji

### 1. **Komponenty (Components)**
```typescript
// ✅ DOBRZE - czysty komponent prezentacyjny
export const LogoutButton = () => {
  const { handleLogout } = useAuth(); // Hook zarządza stanem
  return <button onClick={handleLogout}>Logout</button>;
};

// ❌ ŹLE - logika w komponencie
export const LogoutButton = () => {
  const handleLogout = async () => {
    // Logika biznesowa w komponencie
    await supabase.auth.signOut();
    navigate('/');
  };
  return <button onClick={handleLogout}>Logout</button>;
};
```

### 2. **Hooki (Hooks)**
```typescript
// ✅ DOBRZE - hook zarządza stanem
export const useAuth = () => {
  const authService = new AuthService(supabase);
  const handleLogout = useCallback(async () => {
    await authService.logout();
    navigate('/');
  }, []);
  
  return { handleLogout };
};

// ❌ ŹLE - hook bez logiki domenowej
export const useAuth = () => {
  const handleLogout = async () => {
    // Logika bezpośrednio w hooku
    await supabase.auth.signOut();
  };
};
```

### 3. **Klasy Domenowe (Domain Classes)**
```typescript
// ✅ DOBRZE - interfejs + implementacja
export interface AuthService {
  getUser(): Promise<User | null>;
  logout(): Promise<void>;
  signup(email: string, password: string): Promise<void>;
}

export class SupabaseAuthService implements AuthService {
  constructor(private supabase: SupabaseClient) {}
  
  async getUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user ? { email: data.user.email } : null;
  }
  
  async logout() {
    await this.supabase.auth.signOut();
  }
}
```

### 4. **Server Actions**
```typescript
// ✅ DOBRZE - thin wrapper dla AuthService
export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const authService: AuthService = new SupabaseAuthService(supabase);
  return await authService.getUser();
});

// ❌ ŹLE - logika biznesowa w action
export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  // Logika biznesowa w action
  if (!data.user?.email) return null;
  return { email: data.user.email };
});
```

## 🚫 Czego Unikać

### 1. **Props Drilling**
```typescript
// ❌ ŹLE - przekazywanie props przez wiele poziomów
<Layout onLogout={handleLogout}>
  <Navbar onLogout={handleLogout}>
    <LogoutButton onLogout={handleLogout} />
  </Navbar>
</Layout>

// ✅ DOBRZE - hook w komponencie
const LogoutButton = () => {
  const { handleLogout } = useAuth();
  return <button onClick={handleLogout}>Logout</button>;
};
```

### 2. **Logika w Komponentach**
```typescript
// ❌ ŹLE - logika biznesowa w komponencie
const SignInForm = () => {
  const handleSubmit = async (formData) => {
    // Logika biznesowa w komponencie
    const response = await fetch('/api/signin', {
      method: 'POST',
      body: formData
    });
    // ...
  };
};

// ✅ DOBRZE - hook zarządza logiką
const SignInForm = () => {
  const { mutate, error } = useAuthForm('signIn');
  return <form action={(formData) => mutate({ data: formData })} />;
};
```

### 3. **Duplikacja Kodu**
```typescript
// ❌ ŹLE - duplikacja w formularzach
// sign-in-form.tsx
const { mutate: signInMutate, error: signInError } = useMutation({
  mutationFn: useServerFn(signin),
});

// sign-up-form.tsx  
const { mutate: signupMutation, error: signupError } = useMutation({
  mutationFn: useServerFn(signup),
});

// ✅ DOBRZE - wspólny hook
const { mutate, error } = useAuthForm('signIn');
```

## ✅ Co Robić Dobrze

### 1. **Separacja Odpowiedzialności**
- **Komponenty** - tylko renderowanie
- **Hooki** - zarządzanie stanem
- **Klasy domenowe** - logika biznesowa
- **Server actions** - integracja z HTTP

### 2. **Wzorce z Artykułu**
- **"Extract a hook to the rescue"** - wyciągaj logikę do hooków
- **"Data modelling to encapsulate logic"** - enkapsuluj logikę w klasach
- **"Polymorphism to the rescue"** - używaj interfejsów i implementacji
- **"Separation of concerns"** - rozdzielaj odpowiedzialności

### 3. **Testowanie**
- **Komponenty** - testuj renderowanie
- **Hooki** - testuj logikę stanu
- **Klasy domenowe** - testuj logikę biznesową
- **Server actions** - testuj integrację

## 🎯 Korzyści z Tej Architektury

### 1. **Maintainability**
- Łatwiejsze znajdowanie i naprawianie błędów
- Zmiany w jednej warstwie nie wpływają na inne

### 2. **Modularity**
- Kod może być używany w różnych miejscach
- Łatwiejsze budowanie nowych funkcjonalności

### 3. **Readability**
- Każdy plik ma jasno określoną odpowiedzialność
- Łatwiejsze zrozumienie kodu

### 4. **Scalability**
- Aplikacja może rosnąć bez utraty kontroli
- Łatwiejsze dodawanie nowych funkcji

### 5. **Framework Agnostic**
- Logika domenowa może być używana w Vue, Svelte, etc.
- Możliwość migracji na inne technologie

## 🔄 Ewolucja Aplikacji

### Etapy (zgodnie z artykułem):
1. **Single Component Application** ❌
2. **Multiple Component Application** ❌  
3. **State management with hooks** ✅
4. **Business models emerged** ✅
5. **Layered frontend application** 🎯

**Jesteśmy na etapie 4, dążymy do 5!**

## 📚 Przykłady z Artykułu

### Payment Method Pattern:
```typescript
// Zamiast rozproszonej logiki
if (countryCode === "JP") {
  return Math.floor(amount / 100 + 1) * 100;
} else {
  return Math.floor(amount + 1);
}

// Używaj strategii
export interface PaymentStrategy {
  getRoundUpAmount(amount: number): number;
}

export class JapanPaymentStrategy implements PaymentStrategy {
  getRoundUpAmount(amount: number): number {
    return Math.floor(amount / 100 + 1) * 100;
  }
}
```

## 🎉 Wniosek

**Ta architektura to nie over-engineering - to inwestycja w przyszłość!**

- **Krótkoterminowo** - więcej kodu do napisania
- **Długoterminowo** - łatwiejsze utrzymanie, rozwój i testowanie

**Pamiętaj:** "React to tylko widok" - reszta to regularna aplikacja JavaScript z dobrymi wzorcami architektonicznymi!
