from rest_framework import serializers

from .models import Report


class ReportSerializer(serializers.Serializer):
    status = serializers.ChoiceField(choices=Report.VALUE_TYPES)
    area = serializers.CharField(max_length=256)
    coordinates = serializers.CharField(max_length=256)
    image_link = serializers.CharField(max_length=256)

    def create(self, validated_data):
        return Report.objects.create(**validated_data)
