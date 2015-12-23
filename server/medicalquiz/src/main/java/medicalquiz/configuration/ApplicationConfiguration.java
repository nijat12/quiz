package medicalquiz.configuration;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.document.DynamoDB;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Created by david492000 on 12/2/15.
 */
@Configuration
public class ApplicationConfiguration {


    @Value("${dynamoId}")
    String key;

    @Value("${dynamoSecret}")
    String password;

    @Bean
    public DynamoDB getDynamoDB(){

        return new DynamoDB(new AmazonDynamoDBClient(
                new BasicAWSCredentials(key,password)));

    }




}
