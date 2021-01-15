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

    # Preparing the string for the Overpass request
    # Define export format
    overpass_query = '?data=[out:json];'

    # # Define the area - Halle + Saalekreis
    overpass_query += 'area["de:amtlicher_gemeindeschluessel"="15002000"]->.halle;'\
                      'area["de:amtlicher_gemeindeschluessel"="15088"]->.saalekreis;'\
                      'area["de:amtlicher_gemeindeschluessel"="14713000"]->.leipzig;'\
                      '(.halle;.saalekreis;.leipzig;)->.hal_sk_le_area;'
    # # Collect the vegan nodes, ways and relations
    overpass_query += '(nwr(area.hal_sk_le_area)["diet:vegan"~"yes|only|limited"];'
    # # Collect the vegetarian nodes, ways and relations
    overpass_query += 'nwr(area.hal_sk_le_area)["diet:vegetarian"~"yes|only"];'
    # # End of the query and use "out center" to reduce the geometry of ways and relations to a single coordinate
    overpass_query += ');out+center;'

    # Sending a request to one server after another until one gives a valid answer or
    # the end of the server list is reached.
    while (server < len(SERVERS)) and (result is None):
        # Get a server from the server list
        overpass_server = SERVERS[server]

        # Overpass request
        print("Send query to server: ", overpass_server)
        #osm_request = HTTP.request("GET", overpass_server + overpass_query)

        #urx = "https://veggiekarte.de/data/overpass.json"

        urx = "http://localhost/veggiekarte/veggiekarte-local-testing/data/overpass.json"

        osm_request = HTTP.request("GET", urx)



        #osm_request2 = urllib.request.urlopen(urx)

        #print(osm_request)
        #print(osm_request2)

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




def uri_validator(uri, check_path):
    try:
        result = urllib.parse.urlparse(uri)
        if check_path:
            return all([result.scheme, result.netloc, result.path])
        else:
            return all([result.scheme, result.netloc])
    except:
        return False




def write_data(data):
    """Write the data in a temp file."""
    # Initialize variables to count the markers
    n_vegan_only = 0
    n_vegetarian_only = 0
    n_vegan_friendly = 0
    n_vegan_limited = 0
    n_vegetarian_friendly = 0

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

        place_obj = {}
        place_obj["type"] = "Feature"
        place_obj["properties"] = {}
        place_obj["properties"]["_id"] = element_id
        place_obj["properties"]["_type"] = element_type

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

        else:
            continue

        place_obj["geometry"] = {}
        place_obj["geometry"]["type"] = "Point"
        place_obj["geometry"]["coordinates"] = [lon, lat]

        place_check_obj["geometry"] = {}
        place_check_obj["geometry"]["type"] = "Point"
        place_check_obj["geometry"]["coordinates"] = [lon, lat]

        # Get a name
        if "name" in tags:
            name = tags["name"]
            place_check_obj["properties"]["name"] = name
        else:
            # If there is no name, take the english if exists
            if "name:en" in tags:
                name = tags["name:en"]
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


        # Give the object a category
        #if tags.get("diet:vegan", "") == "only":
        #    place_obj["properties"]["category"] = "vegan_only"
        #    n_vegan_only += 1
        #elif (tags.get("diet:vegetarian", "") == "only"
        #      and tags.get("diet:vegan", "") == "yes"):
        #    place_obj["properties"]["category"] = "vegetarian_only"
        #    n_vegetarian_only += 1
        #elif tags.get("diet:vegan", "") == "yes":
        #    place_obj["properties"]["category"] = "vegan_friendly"
        #    n_vegan_friendly += 1
        #elif tags.get("diet:vegan", "") == "limited":
        #    place_obj["properties"]["category"] = "vegan_limited"
        #    n_vegan_limited += 1
        #else:
        #    place_obj["properties"]["category"] = "vegetarian_friendly"
        #    n_vegetarian_friendly += 1

        # Cuisine
        if "cuisine" in tags:
            place_obj["properties"]["cuisine"] = tags["cuisine"]
        #else:
            #if "shop" not in tags:

                #if tags.get("amenity", "") != "cafe":
                    # Log if there is no cuisine
                    #place_check_obj["properties"]["undefined"].append("cuisine")

        # Address
        if "addr:street" in tags:
            place_obj["properties"]["addr_street"] = tags.get("addr:street", "")
            if "addr:housenumber" in tags:
                place_obj["properties"]["addr_street"] += " " + tags.get("addr:housenumber", "")
            else:
                # Log if there is no addr:housenumber
                place_check_obj["properties"]["undefined"].append("addr:housenumber")
        else:
            # Log if there is no addr:street
            place_check_obj["properties"]["undefined"].append("addr:street")

        if not "addr:city" in tags:
            if not "addr:suburb" in tags:
                # Log if there is no addr:city
                place_check_obj["properties"]["undefined"].append("addr:city/suburb")

        if not "addr:postcode" in tags:
            # Log if there is no addr:postcode
            place_check_obj["properties"]["undefined"].append("addr:postcode")

        # Contact

        website = 'undefined'
        if "contact:website" in tags:
            website = tags.get("contact:website", "").rstrip("/")
            if uri_validator(website, False) is False:
                place_check_obj["properties"]["issues"].append("'contact:website' URI invalid")
        elif "website" in tags:
            website = tags.get("website", "").rstrip("/")
            if uri_validator(website, False) is False:
                place_check_obj["properties"]["issues"].append("'website' URI invalid")

        if "facebook" in website:
            place_check_obj["properties"]["issues"].append("'facebook' URI as website -> change to 'contact:facebook'")
        if "instagram" in website:
            place_check_obj["properties"]["issues"].append("'instagram' URI as website -> change to 'contact:instagram'")
        if "contact:website" in tags and "website" in tags:
            place_check_obj["properties"]["issues"].append("'website' and 'contact:website' defined -> remove one")


        if "contact:facebook" in tags:
            contact_facebook = tags.get("contact:facebook", "").rstrip("/")

            if contact_facebook.startswith("http://"):
                place_check_obj["properties"]["issues"].append("'contact:facebook' starts with 'http' instead of 'https'")
            elif not contact_facebook.startswith("https://www.facebook.com/"):
                place_check_obj["properties"]["issues"].append("'contact:facebook' does not starts with 'https://www.facebook.com/'")
            elif uri_validator(contact_facebook, True) is False:
                place_check_obj["properties"]["issues"].append("'contact:facebook' URI invalid")

        elif "facebook" in tags:
            place_check_obj["properties"]["issues"].append("old tag: 'facebook'")


        if "contact:instagram" in tags:

            contact_instagram = tags.get("contact:instagram", "").rstrip("/")

            if contact_instagram.startswith("http://"):
                place_check_obj["properties"]["issues"].append("'contact:instagram' starts with 'http' instead of 'https'")
            elif not contact_instagram.startswith("https://www.instagram.com/"):
                place_check_obj["properties"]["issues"].append("'contact:instagram' does not starts with 'https://www.instagram.com/'")
            elif uri_validator(contact_instagram, True) is False:
                place_check_obj["properties"]["issues"].append("'contact:instagram' URI invalid")

        elif "instagram" in tags:
            place_check_obj["properties"]["issues"].append("old tag 'instagram'")


        if "disused" in "".join(tags):
            place_check_obj["properties"]["issues"].append("There is a 'disused' tag: Check whether this tag is correct! If so, please remove the diet tags.")


        if "contact:email" in tags:
            place_obj["properties"]["contact_email"] = tags.get("contact:email", "")
        elif "email" in tags:
            place_obj["properties"]["contact_email"] = tags.get("email", "")

            # -> logfile if unformat

        if "contact:email" in tags or "email" in tags:

            email = place_obj["properties"]["contact_email"]

            try:
              # Validate.
              valid = validate_email(email)

             # Update with the normalized form.
              email = valid.email
            except EmailNotValidError as e:
              # email is not valid, exception message is human-readable
              place_check_obj["properties"]["issues"].append("E-Mail is not valid: " + str(e))

        if "contact:phone" in tags:
            contact_phone = tags.get("contact:phone", "")
            if not contact_phone.startswith("+"):
                place_check_obj["properties"]["issues"].append("'contact:phone' has no international format like '+44 20 84527891'")
        elif "phone" in tags:
            phone = tags.get("phone", "")
            if not phone.startswith("+"):
                place_check_obj["properties"]["issues"].append("'phone' has no international format like '+44 20 84527891'")

        if "contact:phone" in tags and "phone" in tags:
            place_check_obj["properties"]["issues"].append("'phone' and 'contact:phone' defined -> remove one")


        opening_hours = 'undefined'
        if "opening_hours:covid19" in tags and tags["opening_hours:covid19"] != "same" and tags["opening_hours:covid19"] != "restricted":
            opening_hours = tags["opening_hours:covid19"]
        elif "opening_hours" in tags:
            opening_hours = tags["opening_hours"]
        else:
            place_check_obj["properties"]["undefined"].append("opening_hours")

        if "\n" in opening_hours or "\r" in opening_hours:
            place_check_obj["properties"]["issues"].append("there is a line break in 'opening_hours' -> remove")


        #place_check_obj["properties"]["undefined"]
        
        place_check_obj["properties"]["issue_number"] = len(place_check_obj["properties"]["issues"]) + len(place_check_obj["properties"]["undefined"])

        if place_check_obj["properties"]["issue_number"] > 0:
            #print(len(place_check_obj["properties"]))
            places_data_checks["features"].append(place_check_obj)
    print(osm_elements_number, ' elements.')

    # Collect the statistic data in an object and add it to the places object
    stat_obj = {"date": DATE,
                "n_vegan_only": n_vegan_only,
                "n_vegetarian_only": n_vegetarian_only,
                "n_vegan_friendly": n_vegan_friendly,
                "n_vegan_limited": n_vegan_limited,
                "n_vegetarian_friendly": n_vegetarian_friendly}

    # Open statistic data file
    with open(VEGGIESTAT_FILE) as json_file:

        # Get previous statistic data
        previous_stat_data = json.load(json_file)
        stat_data["stat"] = previous_stat_data["stat"]

        # Get date from the last entry
        last_date = stat_data["stat"][-1]["date"]

        # Ensure that there is only one entry each day
        if DATE == last_date:
            stat_data["stat"].pop(-1)

        # Append the new data
        stat_data["stat"].append(stat_obj)


def check_data():
    """Check the temp file and replace the old VEGGIEPLACES_FILE if it is ok."""
    #if os.path.isfile(VEGGIEPLACES_TEMPFILE_GZIP):                        # check if the temp file exists
        #if os.path.getsize(VEGGIEPLACES_TEMPFILE_GZIP) > 500:             # check if the temp file isn't too small (see issue #21)
            #print("rename " + VEGGIEPLACES_TEMPFILE + " to " + VEGGIEPLACES_FILE)
            #os.rename(VEGGIEPLACES_FILE, VEGGIEPLACES_OLDFILE)           # rename old file
            #os.rename(VEGGIEPLACES_TEMPFILE, VEGGIEPLACES_FILE)          # rename temp file to new file
            #print("rename " + VEGGIEPLACES_TEMPFILE_MIN + " to " + VEGGIEPLACES_FILE_MIN)
            #os.rename(VEGGIEPLACES_TEMPFILE_MIN, VEGGIEPLACES_FILE_MIN)  # rename minimized temp file to new file
            #print("rename " + VEGGIEPLACES_TEMPFILE_GZIP + " to " + VEGGIEPLACES_FILE_GZIP)
            #os.rename(VEGGIEPLACES_TEMPFILE_GZIP, VEGGIEPLACES_FILE_GZIP)  # rename minimized temp file to new file

            # Write the new statistic file
            #outfilestat = open(VEGGIESTAT_FILE, "w")
            #outfilestat.write(json.dumps(stat_data, indent=1, sort_keys=True))
            #outfilestat.close()

        #else:
            #print("New gzip temp file is too small!")
            #print(os.path.getsize(VEGGIEPLACES_TEMPFILE_GZIP))
    #else:
        #print("temp file don't exists!")


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
        write_data(osm_data)

        # Write file in pretty format
        #outfile = open(VEGGIEPLACES_TEMPFILE, "w")
        #outfile.write(json.dumps(places_data, indent=1, sort_keys=True))
        #outfile.close()

        # Write file in minimized format
        #outfile_min = open(VEGGIEPLACES_TEMPFILE_MIN, "w")
        #outfile_min.write(json.dumps(places_data, indent=None, sort_keys=True, separators=(',', ':')))
        #outfile_min.close()

        # Write file in gzipped format
        #with gzip.open(VEGGIEPLACES_TEMPFILE_GZIP, "wt", encoding="UTF-8") as outfile_gzip:
        #    outfile_gzip.write(json.dumps(places_data, indent=None, sort_keys=True, separators=(',', ':')))

        # Write check result file in pretty format
        outfile = open(VEGGIEPLACES_CHECKRESULT_FILE, "w")
        outfile.write(json.dumps(places_data_checks, indent=1, sort_keys=True))
        outfile.close()

        #check_data()
    else:
        print("A problem has occurred. The old VEGGIE_MAP was not replaced!")


main()
