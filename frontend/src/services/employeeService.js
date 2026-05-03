const API_BASE_URL = "http://localhost:8080/employees";

class EmployeeService {
    async getAllEmployees() {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch employees');
        return await response.json();
    }

    async getEmployeeById(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch employee');
        return await response.json();
    }

    async createEmployee(employeeData) {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to create employee');
        return await response.json();
    }

    async updateEmployee(id, employeeData) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        if (!response.ok) throw new Error('Failed to update employee');
        return await response.json();
    }

    async deleteEmployee(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Failed to delete employee');
        return await response.json();
    }
}

export default new EmployeeService();
