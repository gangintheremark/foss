package com.ssafy.foss;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FossApplication {

    public static void main(String[] args) {
        SpringApplication.run(FossApplication.class, args);
    }
}
