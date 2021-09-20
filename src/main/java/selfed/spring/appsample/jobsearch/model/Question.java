package selfed.spring.appsample.jobsearch.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity(name = "question")
@Data
public class Question {
    @Id
    @GeneratedValue
    private UUID id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    private Job job;
    private String question;
    private Boolean worked;
    private String notes;
}
