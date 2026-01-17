package com.elowen.jobportal.consultant;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableFeignClients
@EnableJpaAuditing
@ComponentScan(basePackages = "com.elowen.jobportal.consultant")
public class ConsultantServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConsultantServiceApplication.class, args);
    }
}
