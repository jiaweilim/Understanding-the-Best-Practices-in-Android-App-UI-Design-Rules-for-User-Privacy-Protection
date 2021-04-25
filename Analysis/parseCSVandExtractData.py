import glob
import os
import csv
import json
import parseXML

uiElementList = []

def findPath(apk, name):

    directoryName = apk.replace("_apkpure.com.apk", "")
    folderName = apk.replace(".apk", "")
    workingDirectory = f"C:\\research\\Analysis\\APK-Malicious\\{folderName}"
    #\\{folderName}"

    os.chdir(workingDirectory)

    paths = []

    filename = name.replace("@drawable/", "")

    for file in glob.iglob('**/*', recursive=True):
        if filename in file:
            if any(filetype in file for filetype in [".png", ".jpg", ".gif", ".bmp", ".webp"]):
                paths = [file] + paths

    if len(paths) == 0:
        filepath = "No Path"
    else:
        filepath = workingDirectory + "\\" + paths[0]

    return filepath

def extractElementData(apk, xml, eid):

    directoryToXML = []

    absolute_path = os.path.dirname(os.path.abspath(__file__))
    directoryName = apk.replace("_apkpure.com.apk", "")
    folderName = apk.replace(".apk", "")
    workingDirectory = f"C:\\research\\Analysis\\APK-Malicious\\{folderName}"
    #\\{folderName}"

    os.chdir(workingDirectory)
  
    for file in glob.iglob('**/*', recursive=True):
        if file.endswith(xml):
            directoryToXML.append(file)

    filename = f"{workingDirectory}\\{directoryToXML[0]}"

    layoutDetails = dict()
    content = ""
 
    with open(filename, encoding="utf8") as f:
        content = f.read()
    f.close()
        
    if eid in content:
        layoutDetails = parseXML.parse(eid, filename)

    return layoutDetails

data = ""
with open('m16_permission_FULL.csv', encoding="utf8", newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    data = list(reader)
f.close()

prevEid = ""
prevPermission = ""

for row in data[1:]:
    xml = row[3]
    eid = row[2]
    apk = row[0]
    permission = row[6].split(".")[-1][:-1]

    if len(eid) >= 1 and len(xml) >= 1 and len(row[1]) >= 1 and eid[0] != '~' and xml[0] != '~' and row[1][0] != '~':
        if permission != prevPermission or (permission == prevPermission and eid != prevEid):
            
            # Retrieve UI Element XML Data for each relevant UI Element
            layoutDetails = extractElementData(apk, xml, eid)
            outputLayoutDetails = dict()
            for key in layoutDetails:
                if key == "src" or key == "background":
                    path = findPath(apk, layoutDetails[key])
                    outputLayoutDetails[key] = [layoutDetails[key], path]
                else:
                    outputLayoutDetails[key] = layoutDetails[key]
            uiElementList.append([apk, eid, xml, permission, outputLayoutDetails])
            print([apk, eid, xml, permission, outputLayoutDetails])

            prevEid = eid
            prevPermission = permission

jsonStr = json.dumps(uiElementList)
print(jsonStr)
g = open("data.json", "w")
g.write(jsonStr)
g.close()