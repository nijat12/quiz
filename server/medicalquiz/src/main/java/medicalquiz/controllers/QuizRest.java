package medicalquiz.controllers;

import com.owlike.genson.Genson;
import medicalquiz.models.Quiz;
import medicalquiz.models.QuizQuestion;
import medicalquiz.repos.QuizQuestionRepo;
import medicalquiz.repos.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.json.Json;
import javax.websocket.server.PathParam;
import java.util.List;

/**
 * Created by david492000 on 8/25/15.
 */
@RestController
@RequestMapping("/api/quiz")
public class QuizRest {


    @Autowired
    QuizRepo repo;

    @Autowired
    QuizQuestionRepo questions;

    @RequestMapping(method = RequestMethod.GET)
    public List<Quiz> query(){

       return repo.findAll();
    }


    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    public ResponseEntity<Quiz> get(@PathVariable String id){

      Quiz quiz = repo.findOne(id);

      return new ResponseEntity<Quiz>(quiz, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Quiz> create(@RequestBody Quiz quiz){

        Quiz saved = repo.save(quiz);

        return new ResponseEntity<Quiz>(saved, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.POST, value = {"{id}/question"})
    public ResponseEntity<QuizQuestion> addQuestion(@RequestBody QuizQuestion question, @PathVariable String id){

        QuizQuestion savedQuestion = questions.save(question);

        Quiz quiz = repo.findOne(id);
        quiz.addQuestion(question.getId());

        repo.save(quiz);
        return new ResponseEntity<QuizQuestion>(savedQuestion, HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.POST, value = {"{id}/question/bulk"})
    public ResponseEntity<String> addQuestionBulk(@RequestBody List<QuizQuestion> list, @PathVariable String id){

        QuizQuestion savedQuestion = null;
        Quiz quiz = repo.findOne(id);
        for(QuizQuestion question: list){
            savedQuestion = questions.save(question);
            quiz.addQuestion(question.getId());
        }
        repo.save(quiz);

        String json = new Genson().serialize(Json.createObjectBuilder().add("created", true).build());

        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = {"{id}/question/delete"})
    public ResponseEntity<String> addQuestionBulk(@RequestBody QuizQuestion question, @PathVariable String id){


        Quiz quiz = repo.findOne(id);
        quiz.deleteQuestion(question.getId());
        repo.save(quiz);
        questions.delete(question);

        String json = new Genson().serialize(Json.createObjectBuilder().add("deleted", true).build());

        return new ResponseEntity<String>(json, HttpStatus.OK);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = {"{id}/question/delete/bulk"})
    public ResponseEntity<String> deletedQuestionBulk(@RequestBody List<QuizQuestion> list, @PathVariable String id){

        QuizQuestion savedQuestion = null;
        Quiz quiz = repo.findOne(id);
        for(QuizQuestion question: list){
            quiz.deleteQuestion(question.getId());
            questions.delete(question);
        }
        repo.save(quiz);

        String json = new Genson().serialize(Json.createObjectBuilder().add("deleted", true).build());

        return new ResponseEntity<String>(json, HttpStatus.OK);
    }



}
