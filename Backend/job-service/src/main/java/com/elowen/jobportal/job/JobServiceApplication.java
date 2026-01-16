package com.elowen.jobportal.job;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;

// WHY: EnableAsync allows @Async view tracking without blocking API responses
@SpringBootApplication
@EnableFeignClients
@EnableAsync
public class JobServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(JobServiceApplication.class, args);
    }
}
