package com.elowen.jobportal.search.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue jobSearchQueue() {
        return new Queue("job-search-queue", true);
    }

    @Bean
    public TopicExchange jobExchange() {
        return new TopicExchange("job-exchange");
    }

    @Bean
    public Binding jobSearchBinding(Queue jobSearchQueue, TopicExchange jobExchange) {
        return BindingBuilder.bind(jobSearchQueue).to(jobExchange).with("job.posted");
    }
}
