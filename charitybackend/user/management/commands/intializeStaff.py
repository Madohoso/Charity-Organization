from django.core.management.base import BaseCommand
from django.contrib.auth.models import Permission , Group
from django.db.models import Q

class Command(BaseCommand):

    help = 'intialize staff module by creating staff group and assign Item permission for it'

    def handle(self, *args, **options):
        permisions = Permission.objects.filter(Q(codename__contains="item") | Q(codename__contains="category") )
        try:
            group = Group.objects.get(name="staff")
        except:
            group = Group(name="staff")
            group.save()
        group.permissions.set(permisions)
