package com.br.notoriousGAME.apiNotoriousGAME.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Libera para todas as rotas
                .allowedOrigins("http://localhost:5173") // A porta do seu Front (Vite)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"); // Libera os métodos
    }
}
