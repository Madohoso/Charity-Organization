from django.core.management.base import BaseCommand

class Command(BaseCommand):

    help = 'intialize staff module by creating staff group and assign Item permission for it'

    def handle(self, *args, **options):
        # Permission.objects.filter(codename__contains="myuser")
        pass
