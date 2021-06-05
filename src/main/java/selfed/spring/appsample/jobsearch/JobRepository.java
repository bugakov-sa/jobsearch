package selfed.spring.appsample.jobsearch;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RestResource;
import selfed.spring.appsample.jobsearch.model.Job;

import java.util.List;

public interface JobRepository extends PagingAndSortingRepository<Job, String> {

    @RestResource(path = "params")
    List<Job> findByVacancyNameLike(
            String vacancyName);
}
