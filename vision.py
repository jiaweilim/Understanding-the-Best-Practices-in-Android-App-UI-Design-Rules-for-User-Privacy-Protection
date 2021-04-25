import os, io
from google.cloud import vision
from PIL import Image

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'service_account_token.json'

client = vision.ImageAnnotatorClient()

#file_name = 'test_photo.jpg'
# file_name = 'ssc_footer_buy.png'
# imagePath = f'.\Images\{file_name}'

def visionAPI(imagePath):

    with io.open(imagePath, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.document_text_detection(image=image,image_context={"language_hints": ["en"]}) 

    texts = response.text_annotations

    text_list = []

    for text in texts:
        description=text.description

        Top_Left = text.bounding_poly.vertices[0]
        Top_Right = text.bounding_poly.vertices[1] 
        Bottom_Left = text.bounding_poly.vertices[2]
        Bottom_Right = text.bounding_poly.vertices[3]

        text_list.append([description, (Top_Left.x,Top_Left.y), (Top_Right.x,Top_Right.y), (Bottom_Left.x,Bottom_Left.y), (Bottom_Right.x,Bottom_Right.y)])
    
    return text_list

# print(visionapi(imagePath))
# im = Image.open(image_path)

# text_list = [['Add photo*\n(Max 3 photos)\n', (14, 55), (90, 55), (90, 84), (14, 84)], ['Add', (14, 55), (39, 55), (39, 67), (14, 67)], ['photo*', (46, 55), (90, 56), (90, 71), (46, 70)], ['(Max', (14, 74), (36, 74), (36, 84), (14, 84)], ['3', (40, 74), (44, 74), (44, 82), (40, 82)], ['photos)', (49, 74), (84, 74), (84, 84), (49, 84)]]
