package com.elowen.jobportal.notification.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Bean
    public Queue notificationQueue() {
        return new Queue("notification-queue", true);
    }

    @Bean
    public Queue jobNotificationQueue() {
        return new Queue("job-notification-queue", true);
    }

    @Bean
    public TopicExchange applicationExchange() {
        return new TopicExchange("application-exchange");
    }

    @Bean
    public TopicExchange jobExchange() {
        return new TopicExchange("job-exchange");
    }

    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange applicationExchange) {
        return BindingBuilder.bind(notificationQueue).to(applicationExchange).with("application.submitted");
    }

    @Bean
    public Binding jobNotificationBinding(Queue jobNotificationQueue, TopicExchange jobExchange) {
        return BindingBuilder.bind(jobNotificationQueue).to(jobExchange).with("job.posted");
    }
}
