package medicalquiz.repos;

import medicalquiz.models.Case;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by david492000 on 12/28/15.
 */
public interface CaseRepo extends MongoRepository<Case, String> {
}
