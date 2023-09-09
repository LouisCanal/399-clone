# Generated by Django 4.2.4 on 2023-09-05 00:42

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_group_name_post_author_alter_usergroup_join_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='post',
            name='post_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 5, 12, 42, 41, 255328)),
        ),
        migrations.AlterField(
            model_name='usergroup',
            name='join_date',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 5, 12, 42, 41, 256429)),
        ),
        migrations.CreateModel(
            name='TagPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.post')),
                ('tag', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.tag')),
            ],
        ),
        migrations.AddField(
            model_name='tag',
            name='posts',
            field=models.ManyToManyField(through='polls.TagPost', to='polls.post'),
        ),
        migrations.AddField(
            model_name='post',
            name='tags',
            field=models.ManyToManyField(through='polls.TagPost', to='polls.tag'),
        ),
    ]
