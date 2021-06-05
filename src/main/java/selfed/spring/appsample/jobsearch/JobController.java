package selfed.spring.appsample.jobsearch;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.rest.webmvc.support.RepositoryEntityLinks;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.*;
import selfed.spring.appsample.jobsearch.model.ErrorResponse;
import selfed.spring.appsample.jobsearch.model.Job;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RepositoryRestController
public class JobController {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private RepositoryEntityLinks entityLinks;

    @GetMapping("/jobs/search/custom")
    public ResponseEntity customSearch(
            @RequestParam String vacancyNameLike
    ) {
        List<Job> jobs = jobRepository.findByVacancyNameLike(vacancyNameLike);

        List<EntityModel<Job>> jobModels = jobs.stream()
                .map(job -> {
                    EntityModel<Job> res = EntityModel.of(job);
                    res.add(entityLinks.linkToItemResource(Job.class, job.getId()).withSelfRel());
                    return res;
                })
                .collect(Collectors.toList());
        CollectionModel<EntityModel<Job>> model = CollectionModel.of(jobModels);
        model.add(linkTo(methodOn(JobController.class).customSearch(vacancyNameLike)).withSelfRel());

        return ResponseEntity.ok(model);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity handleValidationError(Exception e) {
        return ResponseEntity.badRequest().body(new ErrorResponse(e));
    }
}
