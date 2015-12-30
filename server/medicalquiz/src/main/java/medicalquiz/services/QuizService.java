package medicalquiz.services;

import medicalquiz.models.Case;
import medicalquiz.models.Quiz;
import medicalquiz.repos.CaseRepo;
import medicalquiz.repos.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by david492000 on 12/28/15.
 */
@Service
public class QuizService {

    @Autowired
    QuizRepo quizes;

    @Autowired
    CaseRepo cases;

    public Case addCase(String quizId, Case quizCase){
        Quiz quiz = quizes.findOne(quizId);

        if(quiz == null)
        {
            return null;
        }
        quizCase.setQuizId(quiz.getId());
        quizCase = cases.save(quizCase);
        quiz.getCases().add(quizCase.getId());
        quizes.save(quiz);

        return quizCase;
    }

}
