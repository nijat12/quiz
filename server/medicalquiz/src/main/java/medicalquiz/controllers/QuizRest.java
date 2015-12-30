package medicalquiz.controllers;

import medicalquiz.models.Case;
import medicalquiz.models.Quiz;
import medicalquiz.repos.QuizRepo;
import medicalquiz.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

/**
 * Created by david492000 on 8/25/15.
 */
@RestController
@RequestMapping("/api/quiz")
public class QuizRest {


    @Autowired
    QuizRepo repo;

    @Autowired
    QuizService quizService;


    public Quiz createQuiz(@RequestBody @Valid Quiz quiz){

        quiz.setCreated(new Date());

        return repo.save(quiz);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/{id}/cases")
    public ResponseEntity<Case> addCaseToQuiz(@RequestBody @Valid Case quizCase, @PathVariable String id){

        quizCase = quizService.addCase(id, quizCase);
        if(quizCase != null)
        {
            return new ResponseEntity<Case>(quizCase, HttpStatus.BAD_REQUEST);
        }


        return new ResponseEntity<Case>(quizCase, HttpStatus.OK);

    }




}
