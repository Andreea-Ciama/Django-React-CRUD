from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from .models import Employee, Task

class EmployeeAPITestCase(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create_user(username='venu', password='user1234')

        # Create some test employees
        self.employee1 = Employee.objects.create(eid='123', ename='John Doe', email='john.doe@example.com', phone='1234567890')
        self.employee2 = Employee.objects.create(eid='456', ename='Jane Smith', email='jane.smith@example.com', phone='0987654321')

        # Create some test tasks
        self.task1 = Task.objects.create(title='Task 1', description='Description 1', status='PENDING', employeeID='123')
        self.task2 = Task.objects.create(title='Task 2', description='Description 2', status='IN_PROGRESS', employeeID='456')

        # Create an API client to make requests
        self.client = APIClient()
        
        # Authenticate the user and get the JWT token
        response = self.client.post('/token-auth/', {'username': 'venu', 'password': 'user1234'})
        token = response.data['token']

        # Set the JWT token in the request header
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {token}')

    def test_get_all_employees(self):
        response = self.client.get('/api/employees/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)  

    def test_create_employee(self):
        data = {'eid': '789', 'ename': 'Test Employee', 'email': 'test@example.com', 'phone': '9876543210'}
        response = self.client.post('/api/employees/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_employee(self):
        valid_payload = {'eid': '123', 'ename': 'Updated John Doe', 'email': 'updated.john.doe@example.com', 'phone': '1234567890'}
        response = self.client.put('/api/employees/{}/'.format(self.employee1.pk), valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_delete_employee(self):
        response = self.client.delete('/api/employees/{}/'.format(self.employee2.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_all_tasks(self):
        response = self.client.get('/api/employees/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # Assuming you have 2 test tasks

    def test_create_task(self):
        data = {'title': 'Test Task', 'description': 'Test Description', 'status': 'PENDING', 'employeeID': 'EMP001'}
        response = self.client.post('/api/employees/tasks/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_task(self):
        valid_payload = {'title': 'Updated Task', 'description': 'Updated Description', 'status': 'IN_PROGRESS', 'employeeID': '456'}
        response = self.client.put('/api/employees/tasks/{}/'.format(self.task1.pk), valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_task(self):
        response = self.client.delete('/api/employees/tasks/{}/'.format(self.task2.pk))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
