# Generated by Django 4.2.2 on 2023-08-27 22:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0012_alter_comentario_publicacao_alter_comentario_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversa',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_mensagem_final', models.DateTimeField(blank=True, null=True)),
                ('participantes', models.ManyToManyField(related_name='conversas', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]