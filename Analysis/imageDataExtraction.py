import torch
import torchvision
import torchvision.models as models
from PIL import Image
from efficientnet_pytorch import EfficientNet
import json
import vision
import pandas as pd

torch.set_printoptions(threshold=5000)

# Load the pretrained model
#model = models.resnet18(pretrained=True)
model = EfficientNet.from_pretrained('efficientnet-b0')

# Use the model object to select the desired layer
#layer = model._modules.get('avgpool')
layer = model._modules.get("_dropout")

# Set model to evaluation mode
model.eval()

transforms = torchvision.transforms.Compose([
    torchvision.transforms.Resize(256),
    torchvision.transforms.CenterCrop(224),
    torchvision.transforms.ToTensor(),
    torchvision.transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

def get_vector(image):
    # Create a PyTorch tensor with the transformed image
    t_img = transforms(image)
    # Create a vector of zeros that will hold our feature vector
    # The 'avgpool' layer has an output size of 512
    my_embedding = torch.zeros(1280)

    # Define a function that will copy the output of a layer
    def copy_data(m, i, o):
        my_embedding.copy_(o.flatten())                 # <-- flatten

    # Attach that function to our selected layer
    h = layer.register_forward_hook(copy_data)
    # Run the model on our transformed image
    with torch.no_grad():                               # <-- no_grad context
        model(t_img.unsqueeze(0))                       # <-- unsqueeze
    # Detach our copy function from the layer
    h.remove()
    # Return the feature vector
    return my_embedding

data = ""
visionData = ""
outputData = []

################

# uniqueResource = set()

###############

with open('data-m.json') as json_file:
    data = json.load(json_file)
json_file.close()

with open('visionData-m.json') as json_file:
    visionData = json.load(json_file)
json_file.close()

for row in data:
    UIelementData = row[4]
    src_image_text = ""
    background_image_text = ""

    layout_width = ""
    layout_height = ""
    textColor = ""
    text = ""
    textSize = ""
    srcImageVector = [""]*1280
    backgroundImageVector = [""]*1280

    if "src" in UIelementData:
        imagePath = UIelementData["src"][1]
        if imagePath != "No Path":
            img = Image.open(imagePath).convert('RGB')
            #uniqueResource.add(imagePath)
            imageVector = get_vector(img)
            srcImageVector = imageVector.tolist()
            # text_list = vision.visionAPI(imagePath)
            text_list = visionData[imagePath]
            if len(text_list) > 0:
                src_image_text = text_list[0][0].replace("\n", "")
            else:
                src_image_text = ""

    if "background" in UIelementData:
        imagePath = UIelementData["background"][1]
        if imagePath != "No Path":
            img = Image.open(imagePath).convert('RGB')
            #uniqueResource.add(imagePath)
            imageVector = get_vector(img)
            backgroundImageVector = imageVector.tolist()
            # text_list = vision.visionAPI(imagePath)
            text_list = visionData[imagePath]
            if len(text_list) > 0:
                background_image_text = text_list[0][0].replace("\n", "")
            else:
                background_image_text = ""

    if "layout_width" in UIelementData:
        layout_width = UIelementData["layout_width"]

    if "layout_height" in UIelementData:
        layout_height = UIelementData["layout_height"]

    if "textColor" in UIelementData:
        textColor = UIelementData["textColor"]

    if "text" in UIelementData:
        text = UIelementData["text"]

    if "textSize" in UIelementData:
        textSize = UIelementData["textSize"]

    outputRow = [row[0], row[1], row[2], row[3], layout_width, layout_height, textColor, text, textSize, src_image_text, background_image_text] + srcImageVector + backgroundImageVector
    outputData.append(outputRow)

df = pd.DataFrame(outputData)
df.to_csv('dataset-m.csv', index=False, header=False)

# file_name = 'test_photo.jpg'
# image_path = f'.\Images\{file_name}'
# img = Image.open(image_path)

# pic_vector = get_vector(img)
# print(pic_vector)

# f = open("demofile2.txt", "w")
# f.write(str(pic_vector))
# f.close()

#############################################################

# uniqueResource = list(uniqueResource)
# uniqueResourceDict = dict()

# for path in uniqueResource:
#     text_list = vision.visionAPI(path)
#     uniqueResourceDict[path] = text_list

# jsonStr = json.dumps(uniqueResourceDict)
# print(jsonStr)