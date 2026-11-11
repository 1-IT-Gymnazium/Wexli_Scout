-- Firmy načtené z ARES. IČO je přirozený klíč, takže opakovaný import nevytvoří duplicity.
create table public.companies (
  ico            char(8) primary key check (ico ~ '^[0-9]{8}$'),
  name           text        not null,
  nace_codes     text[]      not null default '{}',
  legal_form     text,
  address        text,
  municipality   text,
  imported_at    timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index companies_nace_idx on public.companies using gin (nace_codes);
create index companies_municipality_idx on public.companies (municipality);

-- Přístup jen přes server (service role); veřejný klíč nevidí nic.
alter table public.companies enable row level security;

-- Tabulky se automaticky nezpřístupňují přes API, práva dáváme ručně: jen serverová role.
grant select, insert, update, delete on public.companies to service_role;
