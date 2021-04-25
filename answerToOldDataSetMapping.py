import csv
import pandas as pd
import spacy

googlePlayMetaData = {
    "activesg": {
        "category": "Sports",
        "description": """ActiveSG

Download this free mobile app and start exploring sports and activity venues located throughout Singapore. Designed for smartphone users to make searches, reservations, registrations, purchases and quick payments, all in one convenient, feature-rich app. Real-time access to all facilities and programmes made available to the public by Sport Singapore.


Key features:

All user types
Registered users. Verified members. Supplementary (family) accounts. Junior (under-16) members. All can use ActiveSG with varying privileges.

Smart search
Search for a sports facility nearby, view its location and check its amenities. Ask the app to recommend best possible venues for your interests.

End-to-end booking
Venue, date and time selection. Course registrations. Event sign-ups. Shopping cart with options for add-on items. Payments, cancellations and refunds.

One-touch booking
The app remembers all your previous bookings so you can grab your favourite slots the next time round. No need to retrace your steps.

Virtual ID
Check in and check out of a swim or gym facility, by scanning the QR code on your mobile phone screen (after buying an entry pass)."""
    },
    "onemap": {
        "category": "Maps & Navigation",
        "description": """New OneMap is the authoritative national map of Singapore with the most detailed and timely updated information developed by the Singapore Land Authority. There are also many useful day-to-day information and services contributed by government agencies.

Features of OneMap:

SEARCH: Search for addresses with postal codes and building names.

NAVIGATION: Get driving and public transport directions with walking routes.

FIND NEARBY INFORMATION: Locate nearby amenities and government information.

MAP STYLES: Select from a range of base maps.

FREE TO USE: All maps and features are free to use. No in-app purchases.
If you have any questions or feedback, please drop us an email at onemap@sla.gov.sg

Follow us on Facebook: www.facebook.com/OneMap"""
    },
    "myenv": {
        "category": "Weather",
        "description": """The myENV App is a one-stop platform in Singapore for environmental, water and food information at your fingertips.

It provides a comprehensive suite of information and services from the Ministry of Sustainability and the Environment (MSE) which covers weather, air quality, dengue hot spots, water level, flood, water disruption, hawker centre, food hygiene, and recycling. Users can also report feedback to MSE and its agencies through this app.

• Access real-time information on Singapore’s weather and receive push-notification alerts when heavy rain occurs

• View latest PSI & hourly PM2.5 information

• Locate dengue clusters

• Search for hawker centre

• View the food alerts and recall related information

• Obtain useful food hygiene related information such as Food Establishment Hygiene Grades and list of licensed food caterers

• Get alerted on environmental situations such as earthquake, drain water level, flash floods, lightning and haze

• View the water supply disruption information

• Convenience of providing feedback to NEA, PUB and SFA

• Save locations and personalise the relevant information you wish to see for each location

myENV app will need access to certain features on your phone for the following reasons:

Calendar
This allows myENV to provide you more accurate information events, alerting you on weather and environmental conditions before your event

Location
Allowing myENV to use location will allow the app to serve you location-specific information (e.g weather, dengue)

Location When In Use
Allowing myENV to use location will allow the app to serve you location-specific information (e.g weather, dengue)

Location Always and When In Use
This allows myENV to use your location to understand your location patterns, so we can provide you more accurate suggestions based on your locations

Photos/Media/Files
Allow you to save photographs taken with myENV app in your phone and to attach them when you file a report to NEA/PUB/SFA

Camera
Access the phone's camera if you wish to attach a photograph while making a Report to NEA/PUB/SFA

Microphone
Required to record videos"""
    },
    "policesg": {
        "category": "News & Magazines",
        "description": """Police@SG is the initiative from the Singapore Police Force, which gives members of public access to useful information on the go. With Police@SG, everyone will have the following services at their fingertips:

- Read the latest crime news, police appeals for information and missing persons
- Locate the nearest police station from your current location
- Share content on Facebook and Twitter
- Links to Singapore Police Force homepage, recruitment and social media sites
- Submit information or respond to police appeals via our information submission portal "i-Witness"

The Singapore Police Force - A force for the Nation"""
    },
    "nlbmobile": {
        "category": "Books & Reference",
        "description": """This application is brought to you by the National Library Board, a Singapore Government Agency.

Discover a world of learning with the NLB Mobile app, anywhere, anytime:

• Read ebooks and listen to audiobooks
• Read current eMagazines and eNewspapers
• Access online courses
• Borrow physical library items using your mobile device
• Discover new digital resources and sign in to our websites easily with QR Login
• Manage your library account, and also your family’s accounts"""
    }
}


dataset_old = ""
answerMapping = ""

dataset_old_dict = dict()
dataset_new = list()

with open('dataset-old.csv', encoding="utf8", newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    dataset_old = list(reader)
f.close()

with open('AnswerMapping.csv', encoding="utf8", newline='') as f:
    reader = csv.reader(f, delimiter=',', quotechar='"')
    answerMapping = list(reader)
f.close()

for row in dataset_old:
    key = f"{row[0]}--{row[1]}--{row[2]}"
    dataset_old_dict[key] = row

nlp = spacy.load('en_core_web_md')
#python -m spacy download en_core_web_md

for row in answerMapping:
    score = float(row[1])
    permission = row[3]
    key = f"{row[4]}--{row[5]}--{row[6]}"

    if key in dataset_old_dict:
        datarow = dataset_old_dict[key]
        new_datarow = datarow
        new_datarow[3] = permission

        if score >= 70 or score <= 30:
            appName = row[4].split('_v')[0]
            text = nlp( googlePlayMetaData[appName.lower()]["description"])
            featureVector = text.vector
            category = googlePlayMetaData[appName.lower()]["category"]
            new_datarow = [category] + featureVector.tolist() + new_datarow
        # else:
        #     new_datarow = ['1'] + new_datarow

            dataset_new.append(new_datarow)

df = pd.DataFrame(dataset_new)
df.to_csv('dataset-result-benign-only.csv', index=False, header=False)