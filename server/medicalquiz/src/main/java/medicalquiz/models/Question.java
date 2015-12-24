package medicalquiz.models;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by david492000 on 12/23/15.
 */
public class Question {
    @Id
    private String id;

    private String caseId;

    private String label;

    private String answer;

    private String images;

    private List<Explanation> explanations = new ArrayList<Explanation>();

    public Question() {
    }

    public String getId() {
        return id;
    }



    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public List<Explanation> getExplanations() {
        return explanations;
    }

    public void setExplanations(List<Explanation> explanations) {
        this.explanations = explanations;
    }

    public String getCaseId() {
        return caseId;
    }

    public void setCaseId(String caseId) {
        this.caseId = caseId;
    }
}
