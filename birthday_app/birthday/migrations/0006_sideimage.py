# Generated by Django 5.1.2 on 2024-11-05 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('birthday', '0005_worker_birthday_worker_department_worker_last_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='SideImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.ImageField(upload_to='images/')),
                ('title', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]
