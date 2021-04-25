import json
import csv
from scipy import spatial
import pandas as pd

le_dict = ""
embedding_dict = ""
dataset_b = ""
dataset_m = ""

with open('le_dict.json') as f:
    le_dict = json.load(f)
f.close()

with open('embedding_dict.json') as f:
    embedding_dict = json.load(f)
f.close()

with open('dataset-b.csv', encoding="utf8", newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    dataset_b = list(reader)
f.close()

with open('dataset-m.csv', encoding="utf8", newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    dataset_m = list(reader)
f.close()

def extractAllEmbeddings(dataset):
    embeddings = list()

    for row in dataset:
        apkName = row[0]
        elementId = row[1]
        permission = row[3]
        layout_width = row[4]
        layout_height = row[5]
        textColor = row[6]
        text = row[7]
        textSize = row[8]
        src_image_text = row[9]
        background_image_text = row[10]
        src_image = row[11:1291]
        if len(row) > 1291:
            background_image = row[1291:2571]
        else:
            background_image = [0.0]*1280

        identifier = f'{apkName}-{elementId}-{permission}'
        elementId_embeddings = embedding_dict["elemID"][str( le_dict["elemID"][elementId] )]
        permission_embeddings = embedding_dict["permission"][str( le_dict["permission"][permission] )]

        if layout_width != '':
            layout_width_embeddings = embedding_dict["layout_width"][str( le_dict["layout_width"][layout_width] )]
        else:
            layout_width_embeddings = [0.0]*13

        if layout_height != '':
            layout_height_embeddings = embedding_dict["layout_height"][str( le_dict["layout_height"][layout_height] )]
        else:
            layout_height_embeddings = [0.0]*15

        if textColor != '':
            textColor_embeddings = embedding_dict["textColor"][str( le_dict["textColor"][textColor] )]
        else:
            textColor_embeddings = [0.0]*11

        if text != '':
            text_embeddings = embedding_dict["text"][str( le_dict["text"][text] )]
        else:
            text_embeddings = [0.0]*37

        if textSize != '':
            textSize_embeddings = embedding_dict["textSize"][str( le_dict["textSize"][textSize] )]
        else:
            textSize_embeddings = [0.0]*13

        if src_image_text != '':
            src_image_text_embeddings = embedding_dict["src_image_text"][str( le_dict["src_image_text"][src_image_text] )]
        else:
            src_image_text_embeddings = [0.0]*7

        if background_image_text != '':
            background_image_text_embeddings = embedding_dict["background_image_text"][str( le_dict["background_image_text"][background_image_text] )]
        else:
            background_image_text_embeddings = [0.0]*1

        if src_image[0] != '':
            src_image_embeddings = src_image
        else:
            src_image_embeddings = [0.0]*1280

        if background_image[0] != '':
            background_image_embeddings = background_image
        else:
            background_image_embeddings = [0.0]*1280

        combined_embeddings = elementId_embeddings + layout_width_embeddings + layout_height_embeddings + textColor_embeddings + text_embeddings + textSize_embeddings + src_image_text_embeddings + background_image_text_embeddings + src_image_embeddings + background_image_embeddings
        
        embeddings.append([identifier, combined_embeddings])
    
    return embeddings

benign_vectors = extractAllEmbeddings(dataset_b)
malicious_vectors = extractAllEmbeddings(dataset_m)

cosim_list = []

for vector_m in malicious_vectors:
    for vector_b in benign_vectors:
        vectorb = pd.to_numeric(vector_b[1])
        vectorm = pd.to_numeric(vector_m[1])

        result = 1 - spatial.distance.cosine(vectorm, vectorb)

        cosim_list.append([result, vector_m[0], vector_b[0]])
        
        # if result > 0.7:
        #     print(f'Consine Similarity of {vector_m[0]} and {vector_b[0]} is {result}')
    
jsonStr = json.dumps(cosim_list)
f = open("cosim_list_2.json", "w")
f.write(jsonStr)
f.close()
print(cosim_list)