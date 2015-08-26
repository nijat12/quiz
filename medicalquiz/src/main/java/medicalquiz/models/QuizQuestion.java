package medicalquiz.models;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by david492000 on 8/20/15.
 */
public class QuizQuestion implements Serializable {
    @Id
    private String id;

    private String label;

    private String description;

    private Date created;

    private Object configuration;

   // private List<MediaFile> mediaFiles

    public QuizQuestion() {

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Object getConfiguration() {
        return configuration;
    }

    public void setConfiguration(Object configuration) {
        this.configuration = configuration;
    }
}
