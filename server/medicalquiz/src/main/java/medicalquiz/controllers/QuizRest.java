package medicalquiz.controllers;

import medicalquiz.repos.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by david492000 on 8/25/15.
 */
@RestController
@RequestMapping("/api/quiz")
public class QuizRest {


    @Autowired
    QuizRepo repo;






}
