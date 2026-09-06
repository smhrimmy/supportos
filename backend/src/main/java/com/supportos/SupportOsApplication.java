package com.supportos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SupportOsApplication {
    public static void main(String[] args) {
        SpringApplication.run(SupportOsApplication.class, args);
    }
}
