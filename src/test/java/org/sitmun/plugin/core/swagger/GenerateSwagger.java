package org.sitmun.plugin.core.swagger;

import com.google.common.io.Files;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.sitmun.plugin.core.annotation.SitmunApplication;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


import java.io.File;
import java.nio.charset.Charset;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GenerateSwagger {

  @LocalServerPort
  private int port;

  TestRestTemplate restTemplate = new TestRestTemplate();

  @Test
  public void generateSwagger() throws Exception {
    String response = restTemplate.getForObject("http://localhost:" + port + "/v2/api-docs", String.class);
    Files.write(response, new File("swagger.json"), Charset.defaultCharset());
  }
}

@SitmunApplication
@EnableSwagger2
@Import(SpringDataRestConfiguration.class)
class GenerateSwaggerPlugin {
  @Bean
  public Docket api() {
    return new Docket(DocumentationType.SWAGGER_2)
      .select()
      .apis(RequestHandlerSelectors.any())
      .paths(PathSelectors.any())
      .build();
  }
}
