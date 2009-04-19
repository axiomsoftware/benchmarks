from django.http import HttpResponse
from benchmarks.models import Page
import time

def helloworld(request):
    return HttpResponse("Here's the text of the Web page.")

def insertNpages(n, start=0):
    max = start+n
    for i in range(start, max):
        page = Page(title=" ".join(["Page ",str(i)]), content="Some content")
        page.save()

def write_response(start, end, iters):
    res = []
    res.append("Start")
    res.append(str(start))
    res.append("End")
    res.append(str(end))
    res.extend(["Took ",str((end-start))," seconds. That's ",str(((end-start)/iters))," seconds per save. And, ", str((iters/(end - start))), " saves per second."])
    return HttpResponse(" ".join(res))
    
def insert1000pages(request):
    n = 1000
    start = time.time() #in seconds
    insertNpages(n)
    end = time.time() #in seconds
    return write_response(start, end, n)

def insert30000pages(request):
    n = 30000
    start = time.time() #in seconds
    insertNpages(n)
    end = time.time() #in seconds
    return write_response(start, end, n)

def countPageObjects(request):
    start = time.time()
    count = len(Page.objects.all())
    end = time.time()
    return HttpResponse("Number of Page objects found: " + str(count) + ". Took " + str((end-start)) + " seconds.")

def testloops(request):
    r = range(1000000)
    start = time.time()
    for i in r:
        o = r[i]
    end = time.time()
    return HttpResponse(" ".join(["For loop took ",str((end-start)), "seconds. That's ", str((end-start)/1000000), " seconds per iteration."]))
