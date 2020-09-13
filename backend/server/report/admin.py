from django.contrib import admin

from .models import Report


@admin.register(Report)
class BlogRatingAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Report._meta.fields]

    class Meta:
        model = Report
