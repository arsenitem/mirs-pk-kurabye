from django.db import models


class Report(models.Model):
    UNDEFINED = 'Неопределено'
    OVERGROWN = 'Заросло'
    BORDER_CHANGE = 'Изменение границ'
    VALUE_TYPES = (
        (UNDEFINED, UNDEFINED),
        (OVERGROWN, OVERGROWN),
        (BORDER_CHANGE, BORDER_CHANGE),
    )
    status = models.CharField(max_length=20, choices=VALUE_TYPES)
    area = models.CharField(max_length=256)
    coordinates = models.CharField(max_length=256)
    image_link = models.CharField(max_length=256)
