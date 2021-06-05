package selfed.spring.appsample.jobsearch.controller.errorhandling;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@AllArgsConstructor
public class ValidationException extends Exception {
    private HttpStatus status;
    private String message;

    public static ValidationException badRequest(String message) {
        return new ValidationException(HttpStatus.BAD_REQUEST, message);
    }

    public static ValidationException forbidden() {
        return new ValidationException(HttpStatus.FORBIDDEN, "Недостаточно прав");
    }

    public ResponseEntity responseEntity() {
        return ResponseEntity.status(status).body(message);
    }
}
