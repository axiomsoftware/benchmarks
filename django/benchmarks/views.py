from django.http import HttpResponse

def helloworld(request):
    return HttpResponse("Here's the text of the Web page.")
