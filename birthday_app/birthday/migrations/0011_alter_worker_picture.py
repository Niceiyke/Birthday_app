# Generated by Django 5.1.2 on 2024-11-13 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('birthday', '0010_alter_worker_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='worker',
            name='picture',
            field=models.ImageField(blank=True, null=True, upload_to='workers/'),
        ),
    ]
