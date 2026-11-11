# User flow a use cases

## User flow: provozovatel (já)

```
[ Přehled „Firmy“ ]
       │
       ▼ (Spustí import: obor 43.2, Praha 10)
[ Import z ARES ] ──▶ (Souhrn: z ARES / uloženo / přeskočeno)
       │
       ▼ (Pipeline dohledá a zkontroluje weby)
[ Seznam firem seřazený podle důvodu k oslovení ]
       │
       ▼ (Klikne na firmu)
[ Detail firmy: nález + screenshot ]
       │
       ├──────────────────────────────┬───────────────────────────────┐
       ▼                              ▼                               ▼
       (Web nalezen)                  (Web nenalezen)                 (Výsledek nejistý)
       │                              │                               │
       ▼                              ▼                               ▼
       [ Ověří nález ]                [ Ověří, že web chybí ]         [ Vybere správný web ]
       │                              │                               │
       ▼                              │                               │
[ Report pro firmu (PDF) ] ◀──────────┴───────────────────────────────┘
       │
       ▼ (Zapíše oslovení: kanál, datum)
[ Stav oslovení ] ──▶ (Odpověděla / Nezájem / Smazat)
```

„Web nenalezen“ je sám o sobě důvod k oslovení, ale jen po ručním ověření. U nejistého výsledku vybírá správný web člověk, nástroj nehádá.

## User flow: firma, která dostane report

```
[ Firma dostane report ]  (kanál oslovení je zatím otevřené rozhodnutí)
       │
       ▼ (Přečte nález, např. web bez HTTPS, se screenshotem)
[ Konkrétní problém jejího webu ]
       │
       ├────────────────────────┐
       ▼                        ▼
       (Má zájem)               (Nemá zájem)
       │                        │
       ▼                        ▼
       [ Ozve se → jednání ]    [ Požádá o smazání → data smazána ]
```

## Use cases

### UC1: Import firem z ARES
- **Aktér:** provozovatel
- **Předpodmínka:** je zvolený obor (CZ-NACE 43.2) a městská část (Praha 10), databáze je připravená.
- **Hlavní scénář (Happy Path):**
  1. Provozovatel spustí import pro obor 43.2 a Prahu 10.
  2. Systém načte z číselníku ARES všechny kódy skupiny 43.2.
  3. Systém se zeptá ARES, zjistí celkový počet firem a stránkuje s prodlevou mezi dotazy.
  4. Systém ověří IČO kontrolní číslicí a vynechá zaniklé subjekty.
  5. Systém uloží firmy podle IČO a vypíše souhrn: z ARES / uloženo / přeskočeno.
- **Chybový / alternativní scénář:**
  - *A1 (Dotaz by vrátil víc než 1 000 výsledků):* ARES dotaz odmítne. Systém region rozdělí na menší dotazy a pokračuje.
  - *A2 (ARES je nedostupný nebo omezí dotazy):* Systém import zastaví, nic nepřepíše a při dalším spuštění pokračuje z uložených odpovědí.
  - *A3 (Firma už v databázi je):* Systém aktualizuje její údaje, duplicita nevznikne.

### UC2: Dohledání a ověření webu
- **Aktér:** provozovatel (spouští), systém (pipeline)
- **Předpodmínka:** firma je importovaná a zatím nemá výsledek detekce.
- **Hlavní scénář (Happy Path):**
  1. Provozovatel spustí dohledání webů pro importované firmy.
  2. Systém z obchodního jména vytvoří kandidáty domén. Pokud je vybraný zdroj vyhledávání, přidá i jeho výsledky.
  3. Systém otevře úvodní stránku a kontakty kandidáta.
  4. Systém na stránce najde IČO firmy a uloží web jako nalezený.
  5. Systém web zkontroluje (dostupnost, HTTPS, mobil, stáří) a uloží screenshot.
- **Chybový / alternativní scénář:**
  - *A1 (Žádný kandidát neodpovídá):* Systém uloží „nenalezen“. Je to důvod k oslovení, ale až po ručním ověření.
  - *A2 (Víc kandidátů, IČO není na žádném):* Systém uloží „nejistý“ a kandidáty pošle do ruční kontroly.
  - *A3 (Web neodpovídá nebo v `robots.txt` zakazuje roboty):* Systém se ho nesnaží načíst násilím, zapíše důvod a firmu pošle do ruční kontroly.

### UC3: Ruční kontrola a report před oslovením
- **Aktér:** provozovatel
- **Předpodmínka:** firma má výsledek detekce (nalezen, nenalezen, nebo nejistý).
- **Hlavní scénář (Happy Path):**
  1. Provozovatel otevře v seznamu detail firmy.
  2. Systém zobrazí nález, screenshot a důvod k oslovení.
  3. Provozovatel nález ověří a potvrdí.
  4. Systém vytvoří report na jednu stranu (PDF). Bez ručního potvrzení report nevznikne.
  5. Provozovatel zapíše oslovení (kanál, datum) a systém změní stav firmy na „oslovena“.
- **Chybový / alternativní scénář:**
  - *A1 (Nález nesedí, firma web má):* Provozovatel výsledek opraví. Systém report nevytvoří a chybu započítá do měření přesnosti.
  - *A2 (Firma požádá o smazání):* Systém smaže její údaje včetně screenshotů a reportu. IČO zůstane jen na seznamu „neoslovovat“, aby ji další import znovu nenabídl.

Další use cases (samostatné hodnocení webu, evidence odpovědí) přibudou s implementací.
