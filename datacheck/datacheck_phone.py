#!/usr/bin/python
"""
With this module we check the OpenStreetMap data.
"""

import datetime  # for the timestamp
import json  # read and write json
from urllib.parse import urlparse  # to check phone numbers
import requests  # to check if websites are reachable

# ### constants ###
# the actual date and time
TIMESTAMP = str(datetime.datetime.now())
# the actual date
DATE = str(datetime.date.today())
# the raw overpass output file (useful for later use)
OVERPASS_FILE = "../data/overpass.json"
VEGGIEPLACES_CHECK_RESULT_FILE = "../data/check_results_phone.geojson"  # check results

# Get the OSM data.
def get_osm_data():
    """
    Open overpass data file.
    """
    with open(OVERPASS_FILE, encoding="utf-8") as overpass_json_file:
        # Get overpass data
        overpass_data = json.load(overpass_json_file)
    return overpass_data


def check_data(data):

    places_data_checks = {
        "_timestamp": TIMESTAMP,
        "type": "FeatureCollection",
        "features": [],
        "line-by-line": "",
    }

    # Variables to print progress in the console
    osm_elements_number = len(data["elements"])

    # Go through every osm element and put the information into a new places element.
    for osm_element in data["elements"]:

        osm_element_index = data["elements"].index(osm_element) + 1

        print(osm_element_index, " / ", osm_elements_number, "\t")
        element_id = osm_element["id"]
        element_type = osm_element["type"]
        tags = osm_element.get("tags", {})

        place_check_obj = {"type": "Feature"}
        place_check_obj["geometry"] = {}

        if element_type == "node":
            place_check_obj["geometry"]["type"] = "Point"
            lat = osm_element.get("lat", None)
            lon = osm_element.get("lon", None)
            place_check_obj["geometry"]["coordinates"] = [lon, lat]
        elif element_type == "way" or element_type == "relation":
            place_check_obj["geometry"]["type"] = "LineString"
            # get the coordinates from the center of the object
            center_coordinates = osm_element.get("center", None)
            lat = center_coordinates.get("lat", None)
            lon = center_coordinates.get("lon", None)
            place_check_obj["geometry"]["coordinates"] = [[lon, lat]]
        

        place_check_obj["properties"] = {}
        place_check_obj["properties"]["id"] = element_id
        place_check_obj["properties"]["type"] = element_type
        place_check_obj["properties"]["issue"] = ""

        # Name
        if "name" in tags:
            name = tags["name"]
            place_check_obj["properties"]["name"] = name
        else:
            # If there is no name, take the english if exists
            if "name:en" in tags:
                name = tags["name:en"]
            # If it is a vending machine, name it "vending machine"
            elif tags.get("amenity", "") == "vending_machine":
                name = "vending machine"
            else:
                # If there is no name given from osm, we build one
                name = f"{element_type} {element_id}"
        # Double quotes could escape code, so we have to replace them:
        name = name.replace('"', "”").replace("'", "´")
        place_check_obj["properties"]["name"] = name

        # Phone
        if "contact:phone" in tags:
            tag_name = "contact:phone"
            check_phone_number(place_check_obj, tag_name, tags)
        if "contact:mobile" in tags:
            tag_name = "contact:mobile"
            check_phone_number(place_check_obj, tag_name, tags)
        if "phone" in tags:
            tag_name = "phone"
            check_phone_number(place_check_obj, tag_name, tags)

        # Only use elements with issues
        if place_check_obj["properties"]["issue"] != "":

            if places_data_checks["line-by-line"] != "":
                places_data_checks["line-by-line"] += "\n"
            out_str = '{"type":"FeatureCollection","features":[' + str(place_check_obj).replace("'", '"') + "]}"

            places_data_checks["line-by-line"] += out_str
    print(osm_elements_number, " elements.")

    return places_data_checks["line-by-line"]


def check_phone_number(place_check_obj, tag_name, tags):
    """Validate phone numbers.

    Args:
        place_check_obj (object): Object to collect the results.
        tag_name (string): Name of the tag that contains the phone number.
        tags (object): All tags of a place.
    """

    phone_numbers = tags.get(tag_name, "")
    phone_numbers = phone_numbers.replace("; ", ";")
    phone_numbers = phone_numbers.split(";")

    for number in phone_numbers:
        if not number.startswith("+"):
            place_check_obj["properties"]["issue"] = "Phone number"


def main():

    # Call the functions to get and write the osm data.
    osm_data = get_osm_data()

    # Write data
    if osm_data is not None:
        check_result = check_data(osm_data)

        # Write check result file in pretty format
        outfile = open(VEGGIEPLACES_CHECK_RESULT_FILE, "w", encoding="utf-8")
        outfile.write(check_result)
        outfile.close()
    else:
        print("A problem has occurred. osm_data is None")


class Processor:
    """Class container for processing stuff."""

    counter = 0
    url_data = {}


if __name__ == "__main__":
    proc = Processor()
    main()
