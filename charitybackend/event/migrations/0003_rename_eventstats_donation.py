# Generated by Django 4.1.4 on 2022-12-31 19:36

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('event', '0002_eventstats_amount'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Eventstats',
            new_name='Donation',
        ),
    ]
