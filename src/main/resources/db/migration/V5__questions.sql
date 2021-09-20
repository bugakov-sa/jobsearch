create table jobsearch.question(
    id uuid primary key,
    job_id uuid not null,
    question text not null,
    notes text not null,
    worked bool not null,
    constraint fk_job foreign key(job_id) references jobsearch.job(id) on delete cascade
);