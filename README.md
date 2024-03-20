# Zadatak

Learn Next.js: Adding Search and Pagination | Next.js - <https://nextjs.org/learn/dashboard-app/adding-search-and-pagination>

## Level 1

Dohvačanje podataka i prikazivanje s komponentom

- Napraviti vlastitu aplikaciju na Supabaseu - <https://supabase.com/dashboard/projects>
- Populirati .env.local s podacima iz Supabasea (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- Pokrenuti migracije
- Pokrenuti seed za popunjavanje podataka
- Loginati se koristeći supabase CLI i generirati db-types.ts
  - PROJECT_ID zamijeniti sa svojim project_idjem od supabasea

```bash
# Kod za loginanje sa supabaseom i generiranje db-types.ts
npx supabase login
npx supabase gen types typescript --project-id {PROJECT_ID} > db-types.ts
```

1. Dohvatiti podatke iz baze koristeći database funkciju 'get_grades' i joinati s tablicama student i subject
2. Prikazati DataTable komponentu s prikupljenim podatcima

## Level 2

Dodati mogućnost sortiranja po imenu studenta

1. Kreirati 'sorting' hook
2. Ubaciti 'sorting' state i 'setSorting' funkciju u 'useReactTable'
3. Koristiti 'useSearchParams' i 'usePathname' za dohvačanje trenutne parametre i putanju
4. Dopuniti handleSort funckiju da postavi 'sort' parametar u URL
5. Zamijeniti 'header' sa SortButton komponentom

## Level 3

Dodati mogućnost paginacije

1. Dopuni funkciju da se u URL-u promijeni parametar `page` na `pageNumber`
2. Dohvatiti totalni broj ocijena s funkcijom 'calculate_total_pages' iz baze
3. Prikazat Pagination komponentu

## Level 4

Dodati mogučnost pretraživanja po imenu studenta i/ili kolegija

1. Dopuniti funkciju handleSearch
2. Dodati Search komponentu
