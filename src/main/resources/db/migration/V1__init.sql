create schema jobsearch;

create table jobsearch.job(
    id uuid primary key,
    name text not null,
    company_name text not null,
    link text not null,
    notes text not null,
    worked bool not null,
    created_at bigint not null,
    updated_at bigint not null
);