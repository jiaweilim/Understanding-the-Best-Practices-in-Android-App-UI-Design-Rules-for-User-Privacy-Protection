import pandas as pd
import numpy as np
import os
from sklearn import metrics, preprocessing
from sklearn.model_selection import train_test_split
from tensorflow.keras import layers
from tensorflow.keras import optimizers
from tensorflow.keras.models import Model, load_model
from scipy import spatial
import json

def get_model(data, catcols):    
    inputs = []
    outputs = []
    for c in catcols:
        num_unique_values = int(data[c].nunique())
        embed_dim = int(min(np.ceil((num_unique_values)/2), 50))
        inp = layers.Input(shape=(1,))
        out = layers.Embedding(num_unique_values + 1, embed_dim, name=c)(inp)
        out = layers.SpatialDropout1D(0.3)(out)
        out = layers.Reshape(target_shape=(embed_dim, ))(out)
        inputs.append(inp)
        outputs.append(out)
    
    x = layers.Concatenate()(outputs)
    x = layers.BatchNormalization()(x)
    
    x = layers.Dense(300, activation="relu")(x)
    x = layers.Dropout(0.3)(x)
    x = layers.BatchNormalization()(x)
    
    x = layers.Dense(300, activation="relu")(x)
    x = layers.Dropout(0.3)(x)
    x = layers.BatchNormalization()(x)
    
    y = layers.Dense(1, activation="softmax")(x)

    model = Model(inputs=inputs, outputs=y)
    return model

data1 = pd.read_csv("dataset-b-reduced.csv", engine='python', dtype=str)
data2 = pd.read_csv("dataset-m-reduced.csv", engine='python', dtype=str)
data = pd.concat([data1, data2]).reset_index(drop=True)

features = [x for x in data.columns if x not in ["id", "target"]]

le_dict = {}
# encode all the categorical data
# fill in "-1" for missing values
for feat in features:
    lbl_enc = preprocessing.LabelEncoder()
    data[feat] = lbl_enc.fit_transform(data[feat].fillna("-1").astype(str).values)
    le_dict[feat] = dict(zip(lbl_enc.classes_, lbl_enc.transform(lbl_enc.classes_)))

def myconverter(obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, datetime.datetime):
            return obj.__str__()

jsonStr = json.dumps(le_dict, default=myconverter)
f = open("le_dict.json", "w")
f.write(jsonStr)
f.close()

my_model = get_model(data, features)
my_model.compile(loss='binary_crossentropy', optimizer='adam')

all_embeddings_dict = dict()
for feat in features:
    # my_model.get_layer("elemID ").get_weights()
    embeddings = {idx:my_model.get_layer(feat).get_weights()[0][idx] for w, idx in le_dict[feat].items()}
    embedding_df = pd.DataFrame(embeddings)

    embeddings_dict = dict()
    index = 0
    for row in embedding_df:
        embeddings_dict[str(index)] = list(embedding_df[index])
        index += 1
    
    all_embeddings_dict[feat] = embeddings_dict

jsonStr = json.dumps(all_embeddings_dict, default=myconverter)
f = open("embedding_dict.json", "w")
f.write(jsonStr)
f.close()