package com.elowen.jobportal.search.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Document(indexName = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobDocument {

    @Id
    private String id;

    @Field(type = FieldType.Long)
    private Long jobId;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String title;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String company;

    @Field(type = FieldType.Keyword)
    private String location;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Text)
    private String salary;

    @Field(type = FieldType.Text)
    private String experience;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String description;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String requirements;

    @Field(type = FieldType.Keyword)
    private String jobType;

    @Field(type = FieldType.Boolean)
    private Boolean featured;

    @Field(type = FieldType.Integer)
    private Integer views;

    @Field(type = FieldType.Integer)
    private Integer applicationsCount;

    @Field(type = FieldType.Date)
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date)
    private LocalDateTime expiresAt;
}
