from django.contrib import admin
from .models import Product

# Register your models here.
admin.site.register(Product) # Registers the class to the admin panel on the server-side.
