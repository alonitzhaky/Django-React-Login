from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Product


# Create your views here.

# Login View + Token creation
class MyTokenObtainPairSerializer(TokenObtainPairSerializer): 
    @classmethod
    def get_token(cls, user): 
        token = super().get_token(user)
        token['username'] = user.username
        return token

class MyTokenObtainPairView(TokenObtainPairView): 
    serializer_class = MyTokenObtainPairSerializer

# Example View
@api_view(["GET"])
def index(request):
    return Response("Hello")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def test(request):
    return Response("Test")

# Register a new user (create_user() must contain _user, without it - the user will be added without encryption.)
@api_view(["POST"])
def register(request): 
    user = User.objects.create_user(
        username=request.data['username'],
        email=request.data['email'], 
        password=request.data['password'] 
    )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("Created.")

@api_view(['GET','POST','DELETE','PUT','PATCH'])
@permission_classes([IsAuthenticated])
def products(request):
    if request.method =='GET':
        user = request.user
        array = []
        # for product in Product.objects.all(): # For all products, not related to each user
        for product in user.product_set.all(): # Per logged user
            array.append({"id": product.id, "name": product.desc, "price": product.price})
        return Response(array)
    # if request.method =='POST':
    #     print(type( request.user))
    #     Task.objects.create(title =request.data["title"],description=request.data["description"],completed= request.data["completed"],user=request.user)
    #     return Response ("post...")
 
