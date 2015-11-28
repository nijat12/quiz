package medicalquiz.repos;

import medicalquiz.models.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by david492000 on 8/25/15.
 */
public interface QuizRepo extends MongoRepository<Quiz, String> {
}
