package medicalquiz.controllers;

import medicalquiz.models.QuizQuestion;
import medicalquiz.repos.QuizQuestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by david492000 on 8/20/15.
 */
@RestController
@RequestMapping("/api/quiz/v1")
public class QuizQuestionRest {

    @Autowired
    QuizQuestionRepo repo;


    @RequestMapping(method = RequestMethod.GET)
    public List<QuizQuestion> list(){

        return repo.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public QuizQuestion create(@RequestBody QuizQuestion obj){

        return repo.save(obj);
    }
}
