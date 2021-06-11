package selfed.spring.appsample.jobsearch.controller.errorhandling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import selfed.spring.appsample.jobsearch.model.Job;
import selfed.spring.appsample.jobsearch.repository.JobRepository;

import java.util.UUID;

import static selfed.spring.appsample.jobsearch.controller.errorhandling.ValidationException.badRequest;

@Component
public class Validator {

    @Autowired
    private JobRepository jobRepository;

    public void checkJobId(
            UUID jobId
    ) throws ValidationException {

        if (jobId == null) {
            throw badRequest("Не указан jobId");
        }
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            throw badRequest("Неверный jobId");
        }
    }

    private void checkJobName(String name, boolean optinal) throws ValidationException {
        if (name == null || name.trim().isEmpty()) {
            if (optinal) {
                return;
            }
            throw badRequest("Не указано название вакансии");
        }
        if (name.trim().length() < 4) {
            throw badRequest("Слишком короткое название вакансии");
        }
    }

    private void checkCompanyName(String name, boolean optinal) throws ValidationException {
        if (name == null || name.trim().isEmpty()) {
            if (optinal) {
                return;
            }
            throw badRequest("Не указано название компании");
        }
        if (name.trim().length() < 2) {
            throw badRequest("Слишком короткое название компании");
        }
    }

    public void checkEditJob(Job job, UUID id) throws ValidationException {
        checkJobId(id);
        checkJobName(job.getName(), true);
        checkCompanyName(job.getCompanyName(), true);
    }

    public void checkNewJob(Job job) throws ValidationException {
        checkJobName(job.getName(), false);
        checkCompanyName(job.getCompanyName(), false);
    }
}
