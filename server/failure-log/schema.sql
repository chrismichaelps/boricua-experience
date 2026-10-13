-- One row per server failure the site reports: when, what was asked, how it answered, and why.
create table if not exists failures (
  id integer primary key autoincrement,
  at text not null,
  release text not null default '',
  method text not null,
  path text not null,
  status integer not null,
  elapsed_ms integer not null default 0,
  reason text not null default ''
);
create index if not exists failures_at on failures (at);
create index if not exists failures_path on failures (path, at);
