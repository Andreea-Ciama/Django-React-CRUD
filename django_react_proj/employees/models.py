from django.db import models

# Create your models here.
class Employee(models.Model):
    eid = models.CharField(max_length=20)
    ename = models.CharField("Name", max_length=240)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.ename

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    due_date = models.DateField(null=True, blank=True)
    status_choices = [
        ('PENDING', 'Pending'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='PENDING')
    # If you want to use a foreign key to the Employee model, uncomment the next line
    # employee = models.ForeignKey(Employee, on_delete=models.CASCADE, null=True)
    employeeID = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']
