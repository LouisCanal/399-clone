# Generated by Django 4.2.4 on 2023-10-22 01:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0030_merge_20231021_2103'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='cover_photo',
            field=models.ImageField(default='profile_banners/default.jpg', upload_to='profile_banners'),
        ),
    ]
