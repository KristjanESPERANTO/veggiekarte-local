#!/usr/bin/python
"""
With this module we get the POIs with the tags vegan = * and
vegetarian = * from OpenStreetMap and fill them in a file.
"""

import os         # for handling files
import time       # for sleep
import json       # read and write json
import sys        # to check the python version
import datetime   # for the timestamp
#import urllib.request
import urllib.parse

#import httplib2   # to check if a website is reachable

from email_validator import validate_email, EmailNotValidError

import urllib3    # for the HTTP GET request

assert sys.version_info >= (3, 0)

# constants for the overpass request

# # server list (from: https://wiki.openstreetmap.org/wiki/Overpass_API)
SERVERS = [
    "https://lz4.overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://z.overpass-api.de/api/interpreter",
    "http://api.openstreetmap.fr/api/interpreter",
    "http://dev.overpass-api.de/api_drolbr/interpreter",
    "http://overpass-api.de/api/interpreter",
    "http://overpass.openstreetmap.fr/api/interpreter"
]
HTTP = urllib3.PoolManager()

# # constants for the output files
TIMESTAMP = str(datetime.datetime.now())                             # the actual date and time
DATE = datetime.datetime.now().strftime("%Y-%m-%d")                  # the actual date
DATA_DIR = os.path.dirname(os.path.abspath(__file__))                # get the path of the directory of this script
VEGGIEPLACES_TEMPFILE = DATA_DIR + "/data/places_temp.json"          # the temp file to store the data
VEGGIEPLACES_TEMPFILE_MIN = DATA_DIR + "/data/places_temp.min.json"  # the minimized temp file
VEGGIEPLACES_TEMPFILE_GZIP = DATA_DIR + "/data/places_temp.min.json.gz"  # the gzipped temp file
VEGGIEPLACES_FILE = DATA_DIR + "/data/places.json"                   # the data file which will be used for the map
VEGGIEPLACES_FILE_MIN = DATA_DIR + "/data/places.min.json"           # the minimized data file which will be used for the map
VEGGIEPLACES_FILE_GZIP = DATA_DIR + "/data/places.min.json.gz"       # the gzipped data file which will be used for the map
VEGGIESTAT_FILE = DATA_DIR + "/data/stat.json"                       # the statistics data file which will be used for the map
VEGGIEPLACES_OLDFILE = DATA_DIR + "/data/places_old.json"            # previous version of the data file (helpful to examine changes)
OVERPASS_FILE = DATA_DIR + "/data/overpass.json"                     # the raw overpass output file (useful for later use)
VEGGIEPLACES_CHECKRESULT_FILE = DATA_DIR + "/data/check_results.json"   # check results


# variables to handle the json data
places_data = {}
places_data_checks = {}
stat_data = {}




def get_data_osm():
    """Get the data from OSM."""
    # Initialize variables
    server = 0
    result = None

    # Sending a request to one server after another until one gives a valid answer or
    # the end of the server list is reached.
    while (server < len(SERVERS)) and (result is None):


        #urx = "https://veggiekarte.de/data/overpass.json"

        urx = "http://localhost/veggiekarte/veggiekarte-local-testing/data/overpass.json"

        osm_request = HTTP.request("GET", urx)



        # Check the status of the request
        if osm_request.status == 200:
            print("Received answer successfully.")

            # Store the raw output in a file (for any later use)
            with open(OVERPASS_FILE, "wb") as overpass_file:
                overpass_file.write(osm_request.data)

            result = json.loads(osm_request.data.decode("utf-8"))
        elif osm_request.status == 400:
            print("HTTP error code ", osm_request.status, ": Bad Request")
            time.sleep(5)
        elif osm_request.status == 429:
            print("HTTP error code ", osm_request.status, ": Too Many Requests")
            time.sleep(60)
        elif osm_request.status == 504:
            print("HTTP error code ", osm_request.status, ": Gateway Timeout")
            time.sleep(600)
        else:
            print("Unknown HTTP error code: ", osm_request.status)

        # Increase to get another server for the next pass of the loop.
        server += 1

    return result




def uri_validator(uri, with_path):
    try:
        result = urllib.parse.urlparse(uri)
        if with_path:
            return all([result.scheme, result.netloc, result.path])
        else:
            return all([result.scheme, result.netloc])
    except:
        return False



def check_data(data):

    # Adding timestamp
    places_data["_timestamp"] = TIMESTAMP

    places_data["type"] = "FeatureCollection"

    # Adding list object which will contain all place objects
    places_data["features"] = []

    places_data_checks["_timestamp"] = TIMESTAMP
    places_data_checks["type"] = "FeatureCollection"
    places_data_checks["features"] = []

    # Variables to print progress in the console
    osm_element_index = 0
    osm_elements_number = len(data["elements"])

    # Go through every osm element and put the information into a new places element.
    for osm_element in data["elements"]:

        element_id = osm_element["id"]
        element_type = osm_element["type"]
        tags = osm_element.get("tags", {})

        place_check_obj = {}
        place_check_obj["type"] = "Feature"
        place_check_obj["properties"] = {}
        place_check_obj["properties"]["_id"] = element_id
        place_check_obj["properties"]["_type"] = element_type
        place_check_obj["properties"]["undefined"] = []
        place_check_obj["properties"]["issues"] = []

        if element_type == "node":
            lat = osm_element.get("lat", None)
            lon = osm_element.get("lon", None)
        elif element_type == "way" or element_type == "relation":
            center_coordinates = osm_element.get("center", None)  # get the coordinates from the center of the object
            lat = center_coordinates.get("lat", None)
            lon = center_coordinates.get("lon", None)

        place_check_obj["geometry"] = {}
        place_check_obj["geometry"]["type"] = "Point"
        place_check_obj["geometry"]["coordinates"] = [lon, lat]

        # Name
        if "name" in tags:
            name = tags["name"]
            place_check_obj["properties"]["name"] = name
        else:
            # If there is no name, take the english if exists
            if "name:en" in tags:
                name = tags["name:en"]
            # If it is a vending machine, name it "vending machine"
            elif "amenity" in tags:
                if tags["amenity"] == "vending_machine":
                  name = "vending machine"
            else:
                # If there is no name given from osm, we build one
                name = "%s %s" % (element_type, element_id)
                # Log this
                place_check_obj["properties"]["undefined"].append("name")
        # Double quotes could escape code, so we have to replace them:
        name = name.replace('"', '”')
        place_check_obj["properties"]["name"] = name

        osm_element_index += 1
        print(osm_element_index, ' / ', osm_elements_number, '\t', end='\r')



        # Diet tags
        if "diet:vegan" in tags:
            diet_vegan = tags.get("diet:vegan", "")
            if diet_vegan != "only" and diet_vegan != "yes" and diet_vegan != "limited" and diet_vegan != "no":
                place_check_obj["properties"]["issues"].append("'diet:vegan' has an unusual value: " + diet_vegan)
        if "diet:vegetarian" in tags:
            diet_vegetarian = tags.get("diet:vegetarian", "")
            if diet_vegetarian != "only" and diet_vegetarian != "yes" and diet_vegetarian != "no":
                place_check_obj["properties"]["issues"].append("'diet:vegetarian' has an unusual value: " + diet_vegetarian)

        # Cuisine
        #if "cuisine" not in tags:
        #    if "shop" not in tags:
        #        if tags.get("amenity", "") != "cafe":
        #            place_check_obj["properties"]["undefined"].append("cuisine")

        # Address
        if "addr:street" not in tags:
            place_check_obj["properties"]["undefined"].append("addr:street")
        if "addr:housenumber" not in tags:
            place_check_obj["properties"]["undefined"].append("addr:housenumber")
        if not "addr:city" in tags:
            if not "addr:suburb" in tags:
                place_check_obj["properties"]["undefined"].append("addr:city/suburb")
        if not "addr:postcode" in tags:
            place_check_obj["properties"]["undefined"].append("addr:postcode")

        # Website (till now we only check if the URI is valid, not if the website is reachable)
        website = 'undefined'
        if "contact:website" in tags:
            website = tags.get("contact:website", "")
            if uri_validator(website, False) is False:
                place_check_obj["properties"]["issues"].append("'contact:website' URI invalid")
        if "website" in tags:
            website = tags.get("website", "")
            if uri_validator(website, False) is False:
                place_check_obj["properties"]["issues"].append("'website' URI invalid")
        if "facebook" in website:
            place_check_obj["properties"]["issues"].append("'facebook' URI as website -> change to 'contact:facebook'")
        if "instagram" in website:
            place_check_obj["properties"]["issues"].append("'instagram' URI as website -> change to 'contact:instagram'")
        if "contact:website" in tags and "website" in tags:
            place_check_obj["properties"]["issues"].append("'website' and 'contact:website' defined -> remove one")

        # Facebook
        if "contact:facebook" in tags:
            contact_facebook = tags.get("contact:facebook", "")
            if contact_facebook.startswith("http://"):
                place_check_obj["properties"]["issues"].append("'contact:facebook' starts with 'http' instead of 'https'")
            elif not contact_facebook.startswith("https://www.facebook.com/"):
                place_check_obj["properties"]["issues"].append("'contact:facebook' does not starts with 'https://www.facebook.com/'")
            elif uri_validator(contact_facebook, True) is False:
                place_check_obj["properties"]["issues"].append("'contact:facebook' URI invalid")
        if "facebook" in tags:
            place_check_obj["properties"]["issues"].append("old tag: 'facebook' -> change to 'contact:facebook'")

        # Instagram
        if "contact:instagram" in tags:
            contact_instagram = tags.get("contact:instagram", "")
            if contact_instagram.startswith("http://"):
                place_check_obj["properties"]["issues"].append("'contact:instagram' starts with 'http' instead of 'https'")
            elif not contact_instagram.startswith("https://www.instagram.com/"):
                place_check_obj["properties"]["issues"].append("'contact:instagram' does not starts with 'https://www.instagram.com/'")
            elif uri_validator(contact_instagram, True) is False:
                place_check_obj["properties"]["issues"].append("'contact:instagram' URI invalid")
        if "instagram" in tags:
            place_check_obj["properties"]["issues"].append("old tag 'instagram'")

        # E-Mail
        if "contact:email" in tags:
            email = tags.get("contact:email", "")
        elif "email" in tags:
            email = tags.get("email", "")
        if "contact:email" in tags or "email" in tags:
            try:
              valid = validate_email(email)
            except EmailNotValidError as e:
              place_check_obj["properties"]["issues"].append("E-Mail is not valid: " + str(e))
        if "contact:email" in tags and "email" in tags:
            place_check_obj["properties"]["issues"].append("'email' and 'contact:email' defined -> remove one")

        # Phone
        if "contact:phone" in tags:
            contact_phone = tags.get("contact:phone", "")
            if not contact_phone.startswith("+"):
                place_check_obj["properties"]["issues"].append("'contact:phone' has no international format like '+44 20 84527891'")
        if "phone" in tags:
            phone = tags.get("phone", "")
            if not phone.startswith("+"):
                place_check_obj["properties"]["issues"].append("'phone' has no international format like '+44 20 84527891'")
        if "contact:phone" in tags and "phone" in tags:
            place_check_obj["properties"]["issues"].append("'phone' and 'contact:phone' defined -> remove one")

        # Opening hours
        opening_hours = 'undefined'
        if "opening_hours:covid19" in tags and tags["opening_hours:covid19"] != "same" and tags["opening_hours:covid19"] != "restricted":
            opening_hours = tags["opening_hours:covid19"]
        elif "opening_hours" in tags:
            opening_hours = tags["opening_hours"]
        else:
            place_check_obj["properties"]["undefined"].append("opening_hours")
        if "\n" in opening_hours or "\r" in opening_hours:
            place_check_obj["properties"]["issues"].append("There is a line break in 'opening_hours' -> remove")

        # Disused
        if "disused" in "".join(tags):
            place_check_obj["properties"]["issues"].append("There is a 'disused' tag: Check whether this tag is correct. If so, please remove the diet tags.")

        # Count issues
        place_check_obj["properties"]["issue_number"] = len(place_check_obj["properties"]["issues"]) + len(place_check_obj["properties"]["undefined"])
        
        if len(place_check_obj["properties"]["issues"]) == 0:
            del(place_check_obj["properties"]["issues"])
        if len(place_check_obj["properties"]["undefined"]) == 0:
            del(place_check_obj["properties"]["undefined"])

        # Only use elements with issues
        if place_check_obj["properties"]["issue_number"] > 0:
            places_data_checks["features"].append(place_check_obj)
    print(osm_elements_number, ' elements.')



def main():
    """Call the functions to get and write the osm data."""
    # Get data
    if len(sys.argv) < 2:
        osm_data = get_data_osm()
    else:
        # For testing without new osm requests
        osm_data = json.load(open(sys.argv[1]))

    # Write data
    if osm_data is not None:
        check_data(osm_data)

        # Write check result file in pretty format
        outfile = open(VEGGIEPLACES_CHECKRESULT_FILE, "w")
        outfile.write(json.dumps(places_data_checks, indent=1, sort_keys=True))
        outfile.close()

    else:
        print("A problem has occurred. The old VEGGIE_MAP was not replaced!")

main()
