from django.conf.urls.defaults import *
from benchmarks.views import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
                       (r'^helloworld/', helloworld),
                       (r'^insert1000pages/', insert1000pages),
                       (r'^insert30000pages/', insert30000pages),
)
