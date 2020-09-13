from rest_framework import viewsets
from rest_framework.response import Response

from . import models, serializers


class ReportViewSet(viewsets.ViewSet):
    def list(self, request):
        queryset = models.Report.objects.all()
        serializer_class = serializers.ReportSerializer(queryset, many=True)
        return Response(serializer_class.data)
