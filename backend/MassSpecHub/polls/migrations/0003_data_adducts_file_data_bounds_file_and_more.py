# Generated by Django 4.2.4 on 2023-08-30 00:31

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_group_alter_customuser_options_usergroup_permissions_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='data',
            name='adducts_file',
            field=models.FileField(default='test.csv', upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.AddField(
            model_name='data',
            name='bounds_file',
            field=models.FileField(default='test.csv', upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.AddField(
            model_name='data',
            name='compounds_file',
            field=models.FileField(default='test.csv', upload_to='', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['xlsx', 'csv'])]),
        ),
        migrations.CreateModel(
            name='PostAnalysis',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('result_df', models.JSONField()),
                ('associated_post', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='polls.post')),
                ('data_input', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='polls.data')),
            ],
        ),
    ]
