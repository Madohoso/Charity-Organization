from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group,Permission
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin  
from .forms import UserAdminCreationForm, UserAdminChangeForm
from django.contrib.auth.models import Permission 

User = get_user_model()


# admin.site.unregister(Group)
admin.site.site_header = "Charity organization"
admin.site.site_title = "Charity organization"

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm


    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['email', 'is_active', 'is_staff' ,'is_superuser','last_login']
    list_filter = ['is_superuser']
    fieldsets = (
        (None, {'fields': ('email', 'password','is_active',)}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_superuser',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name','is_staff' ,'password', 'password_2')}
        ),
    )
    search_fields = ['email']
    ordering = ['email']
    filter_horizontal = ()




admin.site.register(User, UserAdmin)
admin.site.register(Permission)