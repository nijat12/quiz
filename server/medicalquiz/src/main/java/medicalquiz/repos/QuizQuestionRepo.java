package medicalquiz.repos;

import medicalquiz.models.QuizQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by david492000 on 8/20/15.
 */
public interface QuizQuestionRepo extends MongoRepository<QuizQuestion, String>{

}
