from rest_framework import serializers
from employees.models import Employee, Task
from django.db import models

class EmployeeSerializer(serializers.ModelSerializer):
    # Meta data is important to serialize the fields in Employee Model
    class Meta:
        model = Employee
        fields = ['pk', 'eid', 'ename', 'email', 'phone']

class TaskSerializer(serializers.ModelSerializer):
    #employee = EmployeeSerializer()  # Include serializerul pentru Employee

    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'due_date', 'status', 'employeeID']

