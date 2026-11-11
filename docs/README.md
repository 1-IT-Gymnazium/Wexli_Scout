# Dokumentace Wexli Scout

Školní softwarový projekt. Fakta o ARES a vyhledávacích službách jsou ověřená k 8. 11. 2026.

| Soubor | Obsah |
|---|---|
| [01-project-charter.md](01-project-charter.md) | problém, cílové skupiny, rozsah MVP, milníky, kritéria úspěchu, rizika |
| [02-architektura.md](02-architektura.md) | stack, schéma komponent, stavy firmy, datový model, import z ARES, dohledání a hodnocení webu, bezpečnost |
| [03-user-flow-a-use-cases.md](03-user-flow-a-use-cases.md) | průchod provozovatele a příjemce reportu, 3 use cases |
| [04-business-a-pr.md](04-business-a-pr.md) | jak nástroj vydělává, co změřím v pilotu, další možnosti, PR |

## Otevřená rozhodnutí

| Rozhodnutí | Návrh | Do kdy |
|---|---|---|
| Zdroj pro dohledání webu | vlastní odvození domény z názvu firmy a ověření IČO, doplňkově vyhledávací API (kandidát Brave Search API) | konec listopadu 2026 |
| Kanál oslovení | telefon, osobně nebo dopis, e-mail jen se souhlasem adresáta | před pilotem (březen 2027) |
| Strop „nejistých“ výsledků detekce | nejvýš 20 % vzorku | konec prosince 2026 |
| Heuristiky stáří webu | rok v patičce, verze CMS, zastaralé knihovny | leden 2027 |
| Rozšíření na živnostníky | až po pilotu a po vyřešení GDPR | duben 2027 |
| Nasazení na internet | mimo MVP, nástroj běží lokálně | po dubnu 2027 |
