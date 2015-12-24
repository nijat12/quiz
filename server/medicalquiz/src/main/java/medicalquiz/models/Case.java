package medicalquiz.models;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by david492000 on 12/23/15.
 */
public class Case {
    @Id
    private String id;

    private String quizId;

    private String status;

    private List<String> images = new ArrayList<String>();

    private List<Question> questions = new ArrayList<Question>();

    public Case() {
    }

    public String getId() {
        return id;
    }



    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }
}
