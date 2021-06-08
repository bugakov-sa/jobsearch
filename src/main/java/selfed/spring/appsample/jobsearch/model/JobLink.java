package selfed.spring.appsample.jobsearch.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "job_link")
@Data
public class JobLink {
    @Id
    @GeneratedValue
    private UUID id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    private String link;
}
