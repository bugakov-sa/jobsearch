package selfed.spring.appsample.jobsearch.model;

import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity(name = "job")
@Data
public class Job {

    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    @Column(name = "company_name")
    private String companyName;
    private String notes;
    private Boolean worked;
    @Column(name = "created_at")
    private Long createdAt;
    @Column(name = "updated_at")
    private Long updatedAt;

    @OneToMany(
            mappedBy = "job",
            fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL},
            orphanRemoval = true
    )
    private List<JobLink> links;

    @PrePersist
    public void beforeCreate() {
        createdAt = System.currentTimeMillis();
        updatedAt = createdAt;
    }

    @PreUpdate
    public void beforeUpdate() {
        updatedAt = System.currentTimeMillis();
    }
}
