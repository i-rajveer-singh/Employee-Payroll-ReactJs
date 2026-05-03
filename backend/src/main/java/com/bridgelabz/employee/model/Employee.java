package com.bridgelabz.employee.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    private Long id;
    private String name;
    private int salary;
    private String gender;
    private List<String> department;
    private LocalDate startDate;
    private String note;
    private String profilePic;
}
