import json

cosim_list = list()

with open('cosim_list_2.json') as f:
    cosim_list = json.load(f)
f.close()

sorted_list = sorted(cosim_list, reverse=True)

for row in sorted_list[:10]:
    print(row)