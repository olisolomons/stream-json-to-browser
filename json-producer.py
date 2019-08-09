import json
import sys
import time

i=1
while True:
    i+=1
    print(json.dumps({"a":i,"b":{"a":1,"b":{"a":1,"b":{"a":1,"b":2}}}}))
    sys.stdout.flush()
    time.sleep(3)
