package com.bridgelabz.employee.service;

import com.bridgelabz.employee.dto.EmployeeDTO;
import com.bridgelabz.employee.model.Employee;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    private final List<Employee> employeeList = new ArrayList<>();
    private long currentId = 1;

    public List<Employee> getAllEmployees() {
        return employeeList;
    }

    public Employee getEmployeeById(Long id) {
        return employeeList.stream().filter(emp -> emp.getId().equals(id)).findFirst().orElse(null);
    }

    public Employee createEmployee(EmployeeDTO employeeDTO) {
        Employee emp = new Employee();
        emp.setId(currentId++);
        updateEmployeeData(emp, employeeDTO);
        employeeList.add(emp);
        return emp;
    }

    public Employee updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee emp = getEmployeeById(id);
        if (emp != null) {
            updateEmployeeData(emp, employeeDTO);
        }
        return emp;
    }

    public boolean deleteEmployee(Long id) {
        Employee emp = getEmployeeById(id);
        if (emp != null) {
            employeeList.remove(emp);
            return true;
        }
        return false;
    }

    private void updateEmployeeData(Employee emp, EmployeeDTO dto) {
        emp.setName(dto.getName());
        emp.setSalary(dto.getSalary());
        emp.setGender(dto.getGender());
        emp.setDepartment(dto.getDepartment());
        emp.setStartDate(dto.getStartDate());
        emp.setNote(dto.getNote());
        emp.setProfilePic(dto.getProfilePic());
    }
}
