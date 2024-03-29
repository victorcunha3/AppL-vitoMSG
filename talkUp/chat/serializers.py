from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Usuario, Perfil, Publicacao, Curtida, Comentario, Mensagem
from rest_framework.authentication import get_user_model
from rest_framework import serializers
from rest_framework.validators import ValidationError
from django.utils import timezone

class PerfilSerializer(ModelSerializer):
    class Meta:
        model = Perfil
        fields = ['bio', 'data_nascimento']

Usuario = get_user_model()

class UsuarioSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'password')

    def validate_email(self, value):
        if Usuario.objects.filter(email=value).exists():
            raise ValidationError('Este email já está cadastrado')
        return value
    
    def create(self, validated_data):
        usuario = Usuario.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
            )
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario

class CurtidaSerializer(ModelSerializer):

    class Meta:
        model = Curtida
        fields = '__all__'

class ComentarioSerializer(ModelSerializer):
    autor = serializers.CharField(source='usuario.username', read_only=True)
    
    class Meta:
        model = Comentario
        fields = '__all__'
        #fields = ['conteudo', 'autor']

class PublicacaoSerializer(ModelSerializer):
    comentarios = SerializerMethodField()
    autor = serializers.CharField(source='autor.username', read_only=True)

    class Meta:
        model = Publicacao
        fields = '__all__'
    
    def get_comentarios(self, publicacao):
        comentarios_relacionados = Comentario.objects.filter(publicacao=publicacao)
        comentarios_serializers = ComentarioSerializer(comentarios_relacionados, many=True)
        return comentarios_serializers.data


class MensagemSerializer(serializers.ModelSerializer):
    destinatario_id = serializers.IntegerField(write_only=True)
    data_envio = serializers.SerializerMethodField()

    class Meta:
        model = Mensagem
        fields = ['id', 'remetente', 'destinatario_id', 'conteudo', 'data_envio', 'lida']

    def validate_destinatario_id(self, value):
        if value == self.context['request'].user.id:
            raise serializers.ValidationError("Você não pode enviar mensagens para si mesmo.")
        return value

    def create(self, validated_data):
        validated_data['remetente'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_data_envio(self, obj):
        timezone_aware_date = timezone.localtime(obj.data_envio)
        return timezone_aware_date.strftime("%d/%m/%Y %H:%M:%S")


