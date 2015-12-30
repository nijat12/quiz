package medicalquiz;

import medicalquiz.repos.QuizRepo;
import mjson.Json;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.boot.test.WebIntegrationTest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

/**
 * Created by david492000 on 12/30/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = MedicalquizApplication.class)
@WebIntegrationTest
public class QuizIntegrationTest {

    @Autowired
    QuizRepo quizes;

    private RestTemplate restTemplate = new TestRestTemplate();

    final String host = "http://localhost:8080/api/";

    @Test
    public void testCreateQuiz(){
       Json json = Json.object();
       json.set("id", Json.nil());
       json.set("name", "Test x");
       json.set("status", "A");
       json.set("created", Json.nil());
       json.set("updated", Json.nil());

        HttpHeaders requestHeaders = new HttpHeaders();
        requestHeaders.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity<String>(json.toString(), requestHeaders);
        String url = host + "quiz";

        String response = restTemplate.postForObject(url,entity, String.class);

        Assert.assertNotNull(response);

    }

}
