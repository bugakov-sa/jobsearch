package selfed.spring.appsample.jobsearch.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import selfed.spring.appsample.jobsearch.controller.errorhandling.ValidationException;
import selfed.spring.appsample.jobsearch.controller.errorhandling.Validator;
import selfed.spring.appsample.jobsearch.model.Job;
import selfed.spring.appsample.jobsearch.repository.JobRepository;

import java.util.Optional;
import java.util.UUID;

@RestController
public class JobController {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private Validator validator;

    @GetMapping(path = "/api/job")
    public ResponseEntity getJobs() {

        Iterable<Job> jobs = jobRepository.findAll(Sort.by("updatedAt").descending());
        return ResponseEntity.ok(jobs);
    }

    @GetMapping(path = "/api/job/{id}")
    public ResponseEntity getJob(@PathVariable UUID id) throws ValidationException {

        validator.checkJobId(id);

        Job job = jobRepository.findById(id).orElse(null);
        return ResponseEntity.ok(job);
    }

    @PostMapping(path = "/api/job")
    public ResponseEntity createJob(@RequestBody Job job) {

        //TODO: check fields

        job.setName(Optional
                .ofNullable(job.getName())
                .orElse("")

        );
        job.setCompanyName(Optional
                .ofNullable(job.getCompanyName())
                .orElse("")

        );
        job.setWorked(Optional
                .ofNullable(job.getWorked())
                .orElse(false)
        );
        job.setNotes(Optional
                .ofNullable(job.getNotes())
                .orElse("")
        );
        job.getLinks().forEach(jobLink -> jobLink.setJob(job));

        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

    @PutMapping(path = "/api/job/{id}")
    public ResponseEntity editJob(
            @RequestBody Job editJob, @PathVariable UUID id
    ) throws ValidationException {

        validator.checkJobId(id);
        //TODO: check other fields

        Job job = jobRepository.findById(id).orElse(null);
        job.setName(Optional
                .ofNullable(editJob.getName())
                .orElse(job.getName())

        );
        job.setCompanyName(Optional
                .ofNullable(editJob.getCompanyName())
                .orElse(job.getCompanyName())

        );
        job.setWorked(Optional
                .ofNullable(editJob.getWorked())
                .orElse(job.getWorked())
        );
        job.setNotes(Optional
                .ofNullable(editJob.getNotes())
                .orElse(job.getNotes())
        );
        if (editJob.getLinks() != null) {
            job.getLinks().clear();
            editJob.getLinks().forEach(jobLink -> {
                jobLink.setJob(job);
                job.getLinks().add(jobLink);
            });
        }

        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

    @DeleteMapping(path = "/api/job/{id}")
    public ResponseEntity deleteProject(
            @PathVariable UUID id
    ) throws ValidationException {

        validator.checkJobId(id);

        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
