package medicalquiz.models;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Created by david492000 on 8/25/15.
 */
public class Quiz {

    @Id
    private String id;

    private String name;

    private String description;

    private HashSet<String> questionIds;

    private ArrayList<MediaFile> files;

    public Quiz(){}

    public String getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public List<MediaFile> getFiles() {
        return files;
    }

    public void setFiles(ArrayList<MediaFile> files) {
        this.files = files;
    }

    public boolean addQuestion(String questionId){
        if(questionIds == null)
            questionIds = new HashSet<String>();

        return questionIds.add(questionId);
    }

    public boolean deleteQuestion(String questionId){
        if(questionIds == null)
           return false;

        return  questionIds.remove(questionId);
    }


}
