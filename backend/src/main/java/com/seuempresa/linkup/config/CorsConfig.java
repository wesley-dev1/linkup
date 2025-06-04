package com.seuempresa.linkup.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")          // rotas liberadas
                .allowedOrigins(
                        "http://localhost:8081",    // Expo Web
                        "http://192.168.0.23:8081", // outro host se precisar
                        "exp://*",                  // apps Expo Go (opcional)
                        "*")                        // ou * em dev
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
