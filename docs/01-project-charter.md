# Project Charter

## Problém a vize
Najít firmu, které chybí funkční web, dnes znamená googlit firmu po firmě. Registr ARES web firem neuvádí, takže každou firmu je potřeba dohledat a zkontrolovat ručně. Wexli Scout tuhle práci zautomatizuje. Z ARES načte firmy vybraného oboru a městské části, dohledá jejich web, zkontroluje ho a seřadí firmy podle konkrétního důvodu k oslovení. Každé oslovení pak stojí na ověřeném nálezu, ne na hromadné nabídce.

## Cílové skupiny

| Skupina | Potřeba | Přínos |
|---|---|---|
| **Primární:** provozovatel webového studia Wexli (jeden uživatel) | najít firmy, kterým web chybí nebo nefunguje, bez ručního googlení | seřazený seznam firem s důvodem k oslovení a důkazem (nález, screenshot) |
| **Sekundární:** malé firmy, v MVP s.r.o. z oboru instalací | vědět, co je na jejich webu špatně | report na jednu stranu s konkrétním problémem a návrhem řešení |

## Rozsah MVP (duben 2027)
Čísla jsou cíle MVP (návrh). Obdoba „hra o 3 levelech, ne MMORPG“.

| V MVP | Mimo MVP |
|---|---|
| 1 obor: CZ-NACE skupina 43.2 (elektro, voda, topení a další stavební instalace) | další obory |
| 1 region: Praha 10, podle ARES 469 s.r.o. v tomto oboru (k 8. 11. 2026) | další městské části a kraje |
| jen s.r.o. (právní forma 112) | živnostníci (fyzické osoby, GDPR), až po pilotu |
| import z ARES s měřením kvality | ruční zadávání firem |
| dohledání a ověření webu, přesnost změřená na vzorku 100 firem | automatické rozesílání e-mailů |
| kontrola webu: dostupnost, HTTPS, mobil, stáří, screenshot | rychlost, SEO a přístupnost webu |
| report pro firmu (1 strana, PDF) po ruční kontrole | generování webů a design náhledy |
| evidence stavu oslovení | CRM, víc uživatelů, platby |
| pilot: 10 oslovených firem | nasazení na internet (nástroj běží lokálně) |

## Milníky

| Období | Obsah | Výstup |
|---|---|---|
| říjen až prosinec 2026 | základ a detekce: aplikace, databáze, import z ARES, dohledání webu | import Prahy 10, změřená přesnost detekce |
| **konec prosince 2026** | **podmínka pro pokračování:** detekce na vzorku 100 firem aspoň 90 % přesná | když nevyjde, leden patří zlepšení detekce |
| leden až únor 2027 | hodnocení webu a report | kontroly webu, screenshoty, report PDF |
| březen 2027 | pilot oslovení | 10 oslovených firem s ručně ověřeným reportem |
| duben 2027 | vyhodnocení | odpovědi, spolupráce, ušetřený čas, co změnit |

## Kritéria úspěchu

1. **Import z ARES**
   - Počet uložených firem se rovná `pocetCelkem`, který vrátí ARES.
   - Druhý import stejného filtru přidá 0 nových řádků (deduplikace podle IČO).
   - 100 % uložených IČO projde kontrolní číslicí.
   - Na vzorku 100 firem změřím a uvedu, u kolika firem obor a sídlo odpovídají skutečnosti. Kvalitu dat ARES neovlivním, proto ji jen měřím.
2. **Detekce webu aspoň 90 % přesná**
   - Vzorek: 100 náhodně vybraných firem z importu (výběr s pevně daným seedem, aby šel zopakovat).
   - Ruční pravda: u každé firmy web dohledám ručně a zapíšu skutečnost (web X / bez webu / jen profil na sociální síti).
   - Výsledek nástroje: *nalezen* (URL), *nenalezen*, nebo *nejistý*.
   - Chyba je **přiřazený cizí web** nebo **„nenalezen“ u firmy, která web má**. Jiná adresa téhož webu (např. s `www` a bez) chyba není.
   - *Nejistý* výsledek chyba není, ale jde do ruční kontroly. Smí jich být nejvýš 20 % vzorku (návrh), jinak by nástroj mohl označit vše za nejisté.
   - Přesnost = správné výsledky / (vzorek − nejisté). Podmínka je splněná při přesnosti aspoň 90 % a nejvýš 20 % nejistých.
3. **Kontrola webu:** na testovacích stránkách (záměrně rozbitá a v pořádku) chytí všechny záměrné chyby a na stránce v pořádku nehlásí nic.
4. **Pilot:** všech 10 oslovení má ručně ověřený nález, tedy 0 oslovení postavených na chybném nálezu. Zaznamenám odpovědi a spolupráce.
5. **Ušetřený čas (návrh):** při ověřování vzorku změřím čas ruční kontroly jedné firmy a porovnám ho s časem nástroje.

## Rizika a omezení

| Riziko | Dopad | Pravděpodobnost | Opatření |
|---|---|---|---|
| **Čas:** škola a podnikání souběžně, jeden vývojář | vysoký | střední | malé MVP, podmínka pro pokračování v prosinci. Když se detekce protáhne, hodnocení webu zúžím na dostupnost a HTTPS. |
| **Neznámé technologie:** Playwright v praxi, Supabase (RLS, Storage) | střední | střední | malé kroky, ke každé kontrole test, který umí selhat. Vše běží lokálně. |
| **Kvalita dat ARES:** kódy CZ-NACE na různých úrovních, firma má víc kódů, sídlo nemusí být místo působení | střední | vysoká (už zjištěno) | dotaz se všemi kódy z číselníku, obor a sídlo ověřené na vzorku, viz [architektura](02-architektura.md#import-z-ares) |
| **Limity ARES:** nejvýš 1 000 výsledků na dotaz, omezení počtu dotazů | střední | střední | dotazy postupně a s prodlevou, cache odpovědí, větší region rozdělený na menší dotazy |
| **Chybná detekce:** existující web nenajdu, oslovení pak působí amatérsky | vysoký | střední | ověření IČO na stránce, ruční kontrola před každým kontaktem, měřená přesnost |
| **Zdroj pro dohledání webu:** Google Custom Search API končí, stahování výsledků Googlu podmínky nepovolují, placené API stojí peníze | střední | vysoká | primárně vlastní odvození domény a ověření IČO, doplňkově placené API (výběr do konce listopadu) |
| **Weby blokující automatický přístup** | nízký | střední | respekt k `robots.txt`, šetrné tempo, takové firmy jdou do ruční kontroly |
| **Bezpečnost:** únik klíčů nebo dat o firmách | vysoký | nízká | klíče jen v `.env.local`, data mimo git, RLS v databázi, přístup jen serverovou rolí |
| **Právo, oslovení:** zákon č. 480/2004 Sb. vyžaduje u obchodních sdělení e-mailem předchozí souhlas adresáta a chrání fyzické i právnické osoby | vysoký | střední | žádné hromadné e-maily, kanál oslovení je otevřené rozhodnutí |
| **Právo, GDPR:** živnostníci jsou fyzické osoby a údaje z veřejného registru jsou pořád osobní údaje | střední | střední | MVP jen s.r.o., živnostníci až po pilotu |
| **Firmy nebudou reagovat:** podnikatelé jsou unavení z nabídek AI webů | střední | střední | osobní oslovení s konkrétním nálezem, sledovat, co funguje, a přizpůsobit se |
