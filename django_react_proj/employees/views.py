from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Employee,Task
from .serializers import *

# Create your views here.
# When GET Request or POST Request is sent to API
@api_view(['GET', 'POST'])
def employees_list(request):
    # If GET Request is received
    if request.method == 'GET':
        data = Employee.objects.all()
        serializer = EmployeeSerializer(data, context = {'request' : request}, many = True)
        return Response(serializer.data)
    # If POST Request is received
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status = status.HTTP_201_CREATED)

        return Response(status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def employee_ids(request):
    if request.method == 'GET':
        employee_ids = Employee.objects.values_list('eid', flat=True)
        return Response(employee_ids)

# When PUT Request or DELETE Request is sent to API
@api_view(['PUT', 'DELETE'])
def employees_detail(request, pk):
    try:
        employee = Employee.objects.get(pk = pk);
    except Employee.DoesNotExist:
        return Response(status = status.HTTP_400_BAD_REQUEST)
    # Employee whose details are to be edited or deleted, is stored in employee object
    # If PUT Request is received
    if request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data = request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # If PUT Request is received
    elif request.method == 'DELETE':
        # Delete above fetched employee object
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def tasks_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def tasks_detail(request, id):
    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password, email=email)
    token, created = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'username': user.username}, status=status.HTTP_201_CREATED)

