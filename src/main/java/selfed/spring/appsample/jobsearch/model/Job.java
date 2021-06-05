package selfed.spring.appsample.jobsearch.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Job {

    @Id
    private String id;
    private Vacancy vacancy;
    private String companyName;
    private String dialogDescription;
    private Boolean bugsProcessed;
    private Long createdAt;

    public String getTechId() {
        return id;
    }
}
