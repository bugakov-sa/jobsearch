package selfed.spring.appsample.jobsearch.model;

import lombok.Data;

import java.util.Optional;

@Data
public class ErrorResponse {

    private String cause;
    private String message;

    public ErrorResponse(Exception e) {
        this.message = e.getMessage();
        this.cause = Optional.ofNullable(e.getCause()).map(Throwable::toString).orElse(null);
    }
}
