# Generated by Django 5.1.2 on 2024-11-05 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('birthday', '0006_sideimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='worker',
            name='id',
        ),
        migrations.AddField(
            model_name='worker',
            name='email',
            field=models.EmailField(default='a@a.com', max_length=100, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
