package com.ssafy.foss.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info().title("foss API 명세서").description(
                        "<h3>foss API Reference for Developers</h3>foss API<br>")
                .version("v1");

        return new OpenAPI().components(new Components()).info(info);
    }

    @Bean
    public GroupedOpenApi allApi() {
        return GroupedOpenApi.builder().group("foss-all").pathsToMatch("/**/**").build();
    }

    @Bean
    public GroupedOpenApi memberApi() {
        return GroupedOpenApi.builder().group("foss-member").pathsToMatch("/member/**").build();
    }

    @Bean
    public GroupedOpenApi feedbackApi() {
        return GroupedOpenApi.builder().group("foss-feedback").pathsToMatch("/feedback/**").build();
    }

    @Bean
    public GroupedOpenApi reviewApi() {
        return GroupedOpenApi.builder().group("foss-review").pathsToMatch("/review/**").build();
    }

    @Bean
    public GroupedOpenApi scheduleApi() {
        return GroupedOpenApi.builder().group("foss-schedule").pathsToMatch("/schedule/**").build();
    }

    @Bean
    public GroupedOpenApi userApi() {
        return GroupedOpenApi.builder().group("foss-notification").pathsToMatch("/notification/**").build();
    }
}

