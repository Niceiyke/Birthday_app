# Generated by Django 5.1.2 on 2024-11-04 10:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('birthday', '0003_employee_background_music'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('background_image', models.ImageField(blank=True, null=True, upload_to='backgrounds/')),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('picture', models.ImageField(upload_to='workers/')),
                ('background_music', models.FileField(blank=True, null=True, upload_to='music/')),
            ],
        ),
        migrations.DeleteModel(
            name='Employee',
        ),
        migrations.AlterField(
            model_name='music',
            name='title',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='adminsettings',
            name='background_music_files',
            field=models.ManyToManyField(blank=True, to='birthday.music'),
        ),
    ]
