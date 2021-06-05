package selfed.spring.appsample.jobsearch.controller.errorhandling;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import selfed.spring.appsample.jobsearch.repository.JobRepository;
import selfed.spring.appsample.jobsearch.model.Job;

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
}
