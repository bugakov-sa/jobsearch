package selfed.spring.appsample.jobsearch.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import selfed.spring.appsample.jobsearch.model.Job;

import java.util.List;
import java.util.UUID;

public interface JobRepository extends PagingAndSortingRepository<Job, UUID> {

    List<Job> findAll(Sort sort);
}
