package selfed.spring.appsample.jobsearch.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
    @Fetch(value = FetchMode.SUBSELECT)
    private List<JobLink> links;
    @OneToMany(
            mappedBy = "job",
            fetch = FetchType.EAGER,
            cascade = {CascadeType.ALL},
            orphanRemoval = true
    )
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Question> questions;

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
