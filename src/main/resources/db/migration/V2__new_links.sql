create table jobsearch.job_link(
    id uuid primary key,
    job_id uuid not null,
    link text not null,
    constraint fk_job foreign key(job_id) references jobsearch.job(id) on delete cascade
);