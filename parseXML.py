import json
import xmltodict

returnvalue = dict()

# Parse the XML given the path to it and the Element ID as the search value
def parse(searchValue, path):

    data_dict = dict()

    with open(path, encoding='utf-8') as xml_file:
        data_dict = xmltodict.parse(xml_file.read(), encoding='utf-8')
    xml_file.close()

    tagID = "@id/" + searchValue
    result = find(tagID, data_dict)
    return result

# Find searchValue (Element ID) in the dictionary (XML Layout File represented in a dict)
def find(searchValue, dictionary):
    for key in dictionary:
        value = dictionary[key]

        if isinstance(value, dict):
            find(searchValue, dictionary[key])

        elif isinstance(value, list):
            for item in value:
                find(searchValue, item)

        # Extract XML Data if the Android ID is the Element ID
        elif value == searchValue and key == "@android:id":
            global returnvalue
            returnvalue = extractData(dictionary)

    return returnvalue

# Extract XML Data for the relevant Element
def extractData(dictionary):
    output = dict()

    if "@android:layout_width" in dictionary:
        output["layout_width"] = dictionary["@android:layout_width"]

    if "@android:layout_height" in dictionary:
        output["layout_height"] = dictionary["@android:layout_height"]

    if "@android:textColor" in dictionary:
        output["textColor"] = dictionary["@android:textColor"]

    if "@android:text" in dictionary:
        output["text"] = dictionary["@android:text"]

    if "@android:textSize" in dictionary:
        output["textSize"] = dictionary["@android:textSize"]

    if "@android:background" in dictionary:
        if "@" in dictionary["@android:background"]:
            output["background"] = dictionary["@android:background"]

    if "@android:src" in dictionary:
        output["src"] = dictionary["@android:src"]

    # Can be nested
    for key in dictionary:
        value = dictionary[key]

        if isinstance(value, dict):
            output.update(extractData(dictionary[key]))

    return output




# test_data_source = [['LLHaltViewClickable', 'activity_home.xml'],
# ['LLNavBuy', 'include_homepage_bottom.xml'],
# ['LLNavFacilities', 'include_homepage_bottom.xml'],
# ['LLNavMyHealth', 'include_homepage_bottom.xml'],
# ['LLNavProgrammes', 'include_homepage_bottom.xml'],
# ['btnAddMember', 'fragment_add_member.xml'],
# ['btnDeleteMember', 'fragment_add_member.xml'],
# ['btnInfo', 'cell_home.xml'],
# ['btnInterestSkip', 'fragment_interest.xml'],
# ['btnLeaderBoard', 'fragment_challenge_details.xml'],
# ['cv', 'whats_on_list_item_layout.xml'],
# ['ivCenterActivesgMenu', 'include_homepage_bottom.xml'],
# ['ivLogOut', 'activity_main.xml'],
# ['ivQrcode2', 'fragment_new_passe_vpimageview.xml'],
# ['rlProgrammeCategoryContainer', 'program_category_list_item_layout.xml'],
# ['tvAmount', 'gift_card_amount_list_item_layout.xml'],
# ['tvLogOut', 'activity_main.xml'],
# ['tvProgrammeName', 'program_list_item_layout.xml'],
# ['tvRnR', 'event_detail_footer.xml']]





# for itemlist in test_data_source:
#     print("=================================")
    
#     searchValue = itemlist[0]
#     data_source = itemlist[1]

#     print(f"searching for {searchValue} in {data_source}")

#     with open(data_source) as xml_file:
#         data_dict = xmltodict.parse(xml_file.read())
#     # xml = open(data_source,'r').read()
#     # data = BeautifulSoup(xml, features="xml")
#     #tagid = "@id/LLNavBuy"

#     #json_data = json.dumps(data_dict)

#     tagID = "@id/" + searchValue    
#     find(tagID, data_dict)