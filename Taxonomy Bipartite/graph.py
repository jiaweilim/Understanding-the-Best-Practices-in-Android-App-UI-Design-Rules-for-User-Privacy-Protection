import networkx as nx
import matplotlib.pyplot as plt

permissionArr = []
purposeArr = []
edge = []

# CatPurpose_To_AppDesc
# with open('CatPurpose.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in permissionArr:
#            permissionArr.append(line.rstrip('\n'))

# with open('AppDesc.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in purposeArr:
#            purposeArr.append(line.rstrip('\n'))
           
# with open('edge_CatPurpose_To_AppDesc.txt', 'r') as f:
#     for line in f:
#         items = line.rstrip('\n').split(",")
#         output = (items[0], items[1], 1.0)
#         edge.append(output)

# Group_To_AppDesc
# with open('Group.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in permissionArr:
#            permissionArr.append(line.rstrip('\n'))

# with open('AppDesc.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in purposeArr:
#            purposeArr.append(line.rstrip('\n'))
           
# with open('edge_Group_To_AppDesc.txt', 'r') as f:
#     for line in f:
#         items = line.rstrip('\n').split(",")
#         output = (items[0], items[1], 1.0)
#         edge.append(output)

# Permission_To_Group
with open('Permission.txt', 'r') as f:
    for line in f:
       if line.rstrip('\n') not in permissionArr:
           permissionArr.append(line.rstrip('\n'))

with open('Group.txt', 'r') as f:
    for line in f:
       if line.rstrip('\n') not in purposeArr:
           purposeArr.append(line.rstrip('\n'))
           
with open('edge_Permission_To_Group.txt', 'r') as f:
    for line in f:
        items = line.rstrip('\n').split(",")
        output = (items[0], items[1], 1.0)
        edge.append(output)

# Group_To_CatPurpose
# with open('Group.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in permissionArr:
#            permissionArr.append(line.rstrip('\n'))

# with open('CatPurpose.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in purposeArr:
#            purposeArr.append(line.rstrip('\n'))
           
# with open('edge_Group_To_CatPurpose.txt', 'r') as f:
#     for line in f:
#         items = line.rstrip('\n').split(",")
#         output = (items[0], items[1], 1.0)
#         edge.append(output)

# Permission_To_CatGroup
# with open('PermissionFull.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in permissionArr:
#            permissionArr.append(line.rstrip('\n'))

# with open('CatGroup.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in purposeArr:
#            purposeArr.append(line.rstrip('\n'))
           
# with open('edge_Permission_To_CatGroup.txt', 'r') as f:
#     for line in f:
#         items = line.rstrip('\n').split(",")
#         output = (items[0], items[1], 1.0)
#         edge.append(output)

# CatGroup_To_CatPurpose
# with open('CatGroup.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in permissionArr:
#            permissionArr.append(line.rstrip('\n'))

# with open('CatPurpose.txt', 'r') as f:
#     for line in f:
#        if line.rstrip('\n') not in purposeArr:
#            purposeArr.append(line.rstrip('\n'))
           
# with open('edge_CatGroup_To_CatPurpose.txt', 'r') as f:
#     for line in f:
#         items = line.rstrip('\n').split(",")
#         output = (items[0], items[1], 1.0)
#         edge.append(output)

B = nx.Graph()
B.add_nodes_from(permissionArr, bipartite=0)
B.add_nodes_from(purposeArr, bipartite=1)
B.add_weighted_edges_from(edge)

print(B.edges(data=True))

pos = {node:[0, i] for i,node in enumerate(permissionArr)}
pos.update({node:[1, i] for i,node in enumerate(purposeArr)})
nx.draw(B, pos, with_labels=False)
for p in pos:  # raise text positions
    pos[p][1] += 0.25
nx.draw_networkx_labels(B, pos)
x_values, y_values = zip(*pos.values())
x_max = max(x_values)
x_min = min(x_values)
x_margin = (x_max - x_min) * 0.25
plt.xlim(x_min - x_margin, x_max + x_margin)

plt.show()