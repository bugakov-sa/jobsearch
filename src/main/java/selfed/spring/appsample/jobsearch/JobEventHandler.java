package selfed.spring.appsample.jobsearch;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import selfed.spring.appsample.jobsearch.model.Job;

import java.util.UUID;

@Component
@RepositoryEventHandler
public class JobEventHandler {

    @HandleBeforeCreate
    public void beforeJobCreate(Job job) {
        job.setId(UUID.randomUUID().toString());
        job.setCreatedAt(System.currentTimeMillis());
    }
}
