from django.conf.urls.defaults import *
from benchmarks.views import helloworld

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       (r'^helloworld/', helloworld),
)
