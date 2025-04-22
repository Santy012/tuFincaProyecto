package com.gestion.tufinca;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TufincaApplication {
    public static void main(String[] args) {
        // Load .env file from the project root directory
        Dotenv dotenv = Dotenv.configure()
                .directory("../../")
                .ignoreIfMissing()  // Don't fail if .env is missing
                .load();

        // Set system properties from .env file
        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
        });

        SpringApplication.run(TufincaApplication.class, args);
    }
}