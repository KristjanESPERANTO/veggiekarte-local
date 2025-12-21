#!/usr/bin/python

"""
With this module we get the POIs with the tags diet:vegan = * and
diet:vegetarian = * from OpenStreetMap and fill them in a file.
"""
from pathlib import Path  # for handling files

import datetime           # for the timestamp
import json               # read and write json
import sys                # to check the python version
import time               # for sleep
import brotli             # for compressing the data
import urllib3            # for the HTTP GET request

assert sys.version_info >= (3, 0)

# constants for the overpass request

# # server list (from: https://wiki.openstreetmap.org/wiki/Overpass_API)
SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://z.overpass-api.de/api/interpreter",
    "http://api.openstreetmap.fr/api/interpreter",
    "http://dev.overpass-api.de/api_drolbr/interpreter",
    "http://overpass-api.de/api/interpreter",
    "http://overpass.openstreetmap.fr/api/interpreter"
]
HTTP = urllib3.PoolManager()

# # constants for the output files
TIMESTAMP = str(datetime.datetime.now())                       # the actual date and time
DATE = str(datetime.date.today())                              # the actual date
DATA_DIR = Path("./data/")                                     # get the path of the directory of this script
VEGGIEPLACES_TEMPFILE = DATA_DIR / "places_temp.json"          # the temp file to store the data
VEGGIEPLACES_TEMPFILE_MIN = DATA_DIR / "places_temp.min.json"  # the minimized temp file
VEGGIEPLACES_TEMPFILE_BR = DATA_DIR / "places_temp.min.json.br"  # the brotli compressed temp file
VEGGIEPLACES_FILE = DATA_DIR / "places.json"                   # the data file which will be used for the map
VEGGIEPLACES_FILE_MIN = DATA_DIR / "places.min.json"           # the minimized data file which will be used for the map
VEGGIEPLACES_FILE_BR = DATA_DIR / "places.min.json.br"         # the brotli compressed data file which will be used for the map
VEGGIESTAT_FILE = DATA_DIR / "stat.json"                       # the statistics data file which will be used for the map
VEGGIEPLACES_OLDFILE = DATA_DIR / "places_old.json"            # previous version of the data file (helpful to examine changes)
OVERPASS_FILE = DATA_DIR / "overpass.json"                     # the raw overpass output file (useful for later use)

# variables to handle the json data
stat_data = {}

# only for Halle
TOP_URL = "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/"

# # list of objects which get links to more information
GET_MORE_INFO = [
    2338022982,  # Cup der guten Hoffnung
    9676330117,  # Bay Vegan
    5592987513,  # VL-Küfa
    5592955318,  # Reil-Küfa
    1034449861,  # Ökoase
    61561597,    # Gartenlokal am Peißnitzhaus
    1037059970,  # Kaffeeschuppen
    164756625,   # Falafello 1
    8357411012,  # Falafello 2
    711744198,   # Hans im Glück
    1538147900,  # Le Feu
    261692804,   # Espitas
    1038238639,  # Enchilada
    2874464836,  # Mextreme
    252918375,   # Alte Apotheke
    4974999721,  # Bagel 29
    3821868244,  # Sakura
    282473154,   # Saalekahn
    1034448971,  # Café Nöö
    2531221700,  # Subway Neustadt
    942721131,   # Subway Zentrum
    3820929262,  # Subway Merseburg
    467769739,   # Goldene Schildkröte
    309747715,   # Shiva
    1781737776,  # Indian Masala
    1676156956,  # House of India
    2791600302,  # Hotdog King
    3052291182,  # Seoul Kulinarisch
    1037236274,  # Mimi
    164756646,   # SPICY
    8773861578,  # JUICY - Reileck
    7388445891,  # City Döner
    578246181,   # Mo's Daniel's
    2876264915,  # Sao Mai
    178744104,   # Hallesches Brauhaus
    3752087074,  # Rote Soße
    10057151822, # Freddy Fresh
    9033240019,  # Papa John's - Innenstadt
    471978357,   # Papa John's - Büschdorf
    47571137,    # Papa John's - Südstadt
    3387395693,  # Papa John's - Neustadt
    4868552820,  # Papa John's - Heide Süd
    4948443538,  # Thang Long
    134238289,   # Mönchshof
    4465518868,  # Sushifreunde
    1475009992,  # Rossini
    4893692292,  # Café Wittekind
    3724388225,  # Burgerheart
    19243922,    # Tajmahal
    4815463722,  # Viet Village
    5599806557,  # Sham Restaurant
    2415756481,  # Hallenser Kartoffelhaus
    8018875351,  # Restaurant Ruine
    2068490774,  # The One
    5868832962,  # Tandoori Steakhaus
    8932643632,  # Alik GELATO
    1185202509,  # Harzmensa
    # Mensen
    8018837433,  # Mensa Neuwerk
    375345326,   # Cafebar Steintor-Campus
    304682735,   # Mensa Franckesche Stiftungen
    22883232,    # Heidemensa
    # Cafés
    2068490770,  # The Shabby
    8018723343,  # Café Kuckhoff
    2496741334,  # Naschmadame
    8867577091,  # nobelsüß
    1037235900,  # Czech
    4914539421,  # 7 Gramm
    3208898648,  # Coffee Fellows
    1639760594,  # Bewaffel dich
    6569044919,  # Hafenmeister & Docks
    5942265574,  # Koffij
    1045144852,  # Rosenburg
    5593108867,  # Himmel & Erde
    120082234,   # Colonne Morris
    1045144871,  # Zwei Zimmer Küche Bar
    4971464334,  # Café Ludwig
    2715257424,  # Sonnendeck
    # Läden
    2065237786,  # Naturell
    2051567009,  # BioLogisch LogischBio
    1943778686,  # BioRio
    1902279166,  # Biomarkt am Reileck
    1701119442,  # BioMarkt Naturata
    5245541311,  # denn's
    5583171123,  # Europasia
    2322858124,  # Weltladen
    6366059605,  # Rübchen
    # Sonstige
    7068127430,  # Cancun-Bar
    2969150134,  # Bäckerei Schäl
]

# Maps OSM tags to icon names
# (Emojis are maintained separately in the frontend: js/veggiemap-icons.js)
TAG_ICON_MAP = {
    # Intentionally not alphabetical order
    "cuisine:pizza": "restaurant-pizza",
    # Alphabetical order
    "amenity:bar": "bar",
    "amenity:bbq": "bbq",
    "amenity:biergarten": "pub",
    "amenity:cafe": "cafe",
    "amenity:canteen": "restaurant",
    "amenity:cinema": "cinema",
    "amenity:college": "college",
    "amenity:fast_food": "fast_food",
    "amenity:food_court": "restaurant",
    "amenity:fuel": "fuel",
    "amenity:hospital": "hospital",
    "amenity:ice_cream": "ice_cream",
    "amenity:kindergarten": "playground",
    "amenity:pharmacy": "pharmacy",
    "amenity:place_of_worship": "place_of_worship",
    "amenity:pub": "pub",
    "amenity:restaurant": "restaurant",
    "social_facility:soup_kitchen": "soup_kitchen",
    "amenity:school": "school",
    "amenity:shelter": "shelter",
    "amenity:swimming_pool": "swimming",
    "amenity:theatre": "theatre",
    "amenity:university": "college",
    "amenity:vending_machine": "shop",
    "historic:memorial": "monument",
    "leisure:golf_course": "golf",
    "leisure:pitch": "pitch",
    "leisure:sauna": "spa",
    "leisure:sports_centre": "sports",
    "leisure:stadium": "stadium",
    "shop:alcohol": "alcohol",
    "shop:bakery": "bakery",
    "shop:beauty": "beauty",
    "shop:bicycle": "bicycle",
    "shop:books": "library",
    "shop:butcher": "butcher",
    "shop:chemist": "pharmacy",
    "shop:chocolate": "confectionery",
    "shop:clothes": "clothes",
    "shop:coffee": "cafe",
    "shop:confectionery": "confectionery",
    "shop:convenience": "convenience",
    "shop:cosmetics": "beauty",
    "shop:deli": "shop",
    "shop:department_store": "department_store",
    "shop:doityourself": "diy",
    "shop:drugstore": "pharmacy",
    "shop:farm": "greengrocer",
    "shop:fishmonger": "shop",
    "shop:florist": "garden-centre",
    "shop:garden_centre": "garden-centre",
    "shop:general": "shop",
    "shop:gift": "gift",
    "shop:greengrocer": "greengrocer",
    "shop:grocery": "greengrocer",
    "shop:hairdresser": "hairdresser",
    "shop:health_food": "shop",
    "shop:herbalist": "pharmacy",
    "shop:kiosk": "shop",
    "shop:music": "music",
    "shop:nutrition_supplements": "pharmacy",
    "shop:pastry": "bakery",
    "shop:shoes": "shoe",
    "shop:supermarket": "supermarket",
    "shop:tea": "cafe",
    "shop:wine": "alcohol",
    "tourism:alpine_hut": "hut",
    "tourism:guest_house": "guest_house",
    "tourism:hostel": "guest_house",
    "tourism:hotel": "guest_house",
    "tourism:museum": "museum",
    "tourism:wilderness_hut": "hut",
}


def determine_icon(tags):
    """Determine an icon for the marker."""
    icon = "star-stroked"  # Default icon if there is no matching per TAG_ICON_MAP.
    for key_value, icon_name in TAG_ICON_MAP.items():
        key, value = key_value.split(":")
        tag = tags.get(key)

        if not tag:
            continue

        tag = tag.split(";")[0]

        if tag == value:
            icon = icon_name
            break
    return icon


def get_osm_data():
    """Get the data from OSM."""
    # Initialize variables
    server = 0
    result = None

    # Preparing the string for the Overpass request
    # Define export format
    overpass_query = "?data=[out:json][timeout:900];"

    # # Define the area - Halle + Saalekreis
    overpass_query += "area['de:amtlicher_gemeindeschluessel'='15002000']->.halle;" \
                      "area['de:amtlicher_gemeindeschluessel'='15088']->.saalekreis;" \
                      "(.halle;.saalekreis;)->.searchArea;"
    # # Collect the vegan nodes, ways and relations
    overpass_query += "nwr(area.searchArea)['diet:vegan'~'yes|only|limited'];"
    # # End of the query and use "out center" to reduce the geometry of ways and relations to a single coordinate
    overpass_query += "out+center;"

    # Sending a request to one server after another until one gives a valid answer or
    # the end of the server list is reached.
    while (server < len(SERVERS)) and (result is None):
        # Get a server from the server list
        overpass_server = SERVERS[server]

        # Overpass request
        print("Send query to server: ", overpass_server)
        osm_request = HTTP.request("GET", overpass_server + overpass_query)

        # Check the status of the request
        if osm_request.status == 200:
            print("Received answer successfully.")

            # Store the raw output in a file (for any later use)
            OVERPASS_FILE.touch()
            OVERPASS_FILE.write_bytes(osm_request.data)
            if not osm_request.data:
                print("Empty response body, trying next server...")
            else:
                try:
                    result = json.loads(osm_request.data.decode("utf-8"))
                except json.JSONDecodeError as e:
                    print(f"Failed to decode JSON from {overpass_server}: {e}")
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


def write_data(data):
    """Write the data in a temp file."""

    places_data = {}

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

    # Variables to print progress in the console
    osm_element_index = 0
    osm_elements_number = len(data["elements"])

    # Go through every osm element and put the information into a new place's element.
    for osm_element in data["elements"]:

        element_id = osm_element["id"]
        element_type = osm_element["type"]
        tags = osm_element.get("tags", {})

        # Discard element if it's disused
        if ("amenity" not in tags and ("disused:amenity" in tags or "was:amenity" in tags)) or "disused:" in tags:
            continue

        place_obj = {"type": "Feature", "properties": {}}
        place_obj["properties"]["_id"] = element_id
        place_obj["properties"]["_type"] = element_type

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

        icon = determine_icon(tags)
        place_obj["properties"]["icon"] = icon

        # Get a name
        if "name" in tags:
            name = tags["name"]
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
        name = name.replace('"', '”')
        place_obj["properties"]["name"] = name

        # Print progress
        osm_element_index += 1
        print(osm_element_index, " / ", osm_elements_number, "\t", end="\r")

        # Give the object a category
        if tags.get("diet:vegan", "") == "only":
            place_obj["properties"]["category"] = "vegan_only"
            n_vegan_only += 1
        elif (tags.get("diet:vegetarian", "") == "only"
              and tags.get("diet:vegan", "") == "yes"):
            place_obj["properties"]["category"] = "vegetarian_only"
            n_vegetarian_only += 1
        elif tags.get("diet:vegan", "") == "yes":
            place_obj["properties"]["category"] = "vegan_friendly"
            n_vegan_friendly += 1
        elif tags.get("diet:vegan", "") == "limited":
            place_obj["properties"]["category"] = "vegan_limited"
            n_vegan_limited += 1
        else:
            # Skip places that are only vegetarian (not vegan) for Halle
            continue

    # The following detailed fields (cuisine, contacts, opening hours, descriptions, menu)
    # are intentionally omitted to shrink the base dataset. They are now fetched lazily
    # from Nominatim (extratags) when a popup opens.

        if element_id in GET_MORE_INFO:  # More information and Link for those who use the map in a local website.
            place_obj["properties"]["more_info"] = True

        places_data["features"].append(place_obj)

    # Print number of elements
    print(osm_elements_number, " elements")

    # Collect the statistic data in an object and add it to the places object
    stat_obj = {
        "date": DATE,
        "n_vegan_only": n_vegan_only,
        "n_vegetarian_only": n_vegetarian_only,
        "n_vegan_friendly": n_vegan_friendly,
        "n_vegan_limited": n_vegan_limited,
        "n_vegetarian_friendly": n_vegetarian_friendly,
    }

    # Check if the local statistic file exists
    if not VEGGIESTAT_FILE.exists():
        print(f"Local statistic file {VEGGIESTAT_FILE} not found. Downloading from remote source...")
        remote_stat_url = "https://veggiekarte.de/data/stat.json"
        try:
            response = HTTP.request("GET", remote_stat_url)
            if response.status == 200:
                VEGGIESTAT_FILE.touch()
                VEGGIESTAT_FILE.write_text(response.data.decode("utf-8"))
                print("Downloaded and saved remote statistic file.")
            else:
                print(f"Failed to download remote statistic file. HTTP status: {response.status}")
                stat_data["stat"] = []
        except Exception as e:
            print(f"Error while downloading remote statistic file: {e}")
            stat_data["stat"] = []
    else:
        print(f"Local statistic file {VEGGIESTAT_FILE} found.")

    # Open statistic data file
    with VEGGIESTAT_FILE.open() as json_file:
        # Get previous statistic data
        previous_stat_data = json.load(json_file)
        stat_data["stat"] = previous_stat_data.get("stat", [])

        # Get date from the last entry
        if stat_data["stat"]:
            last_date = stat_data["stat"][-1]["date"]

            # Ensure that there is only one entry each day
            if DATE == last_date:
                stat_data["stat"].pop(-1)

        # Append the new data
        stat_data["stat"].append(stat_obj)

    return places_data


def check_data():
    """Check the temp file and replace the old VEGGIEPLACES_FILE if it is ok."""
    if VEGGIEPLACES_TEMPFILE_BR.exists():                              # check if the temp file exists
        if VEGGIEPLACES_TEMPFILE_BR.stat().st_size > 500:              # check if the temp file isn't too small (see issue #21)
            print("rename " + str(VEGGIEPLACES_TEMPFILE) + " to " + str(VEGGIEPLACES_FILE))
            if VEGGIEPLACES_FILE.exists():
                VEGGIEPLACES_FILE.rename(VEGGIEPLACES_OLDFILE)         # rename old file
            VEGGIEPLACES_TEMPFILE.rename(VEGGIEPLACES_FILE)            # rename temp file to new file
            print("rename " + str(VEGGIEPLACES_TEMPFILE_MIN) + " to " + str(VEGGIEPLACES_FILE_MIN))
            VEGGIEPLACES_TEMPFILE_MIN.rename(VEGGIEPLACES_FILE_MIN)    # rename minimized temp file to new file
            print("rename " + str(VEGGIEPLACES_TEMPFILE_BR) + " to " + str(VEGGIEPLACES_FILE_BR))
            VEGGIEPLACES_TEMPFILE_BR.rename(VEGGIEPLACES_FILE_BR)      # rename compressed temp file to new file
            # Write the new statistic file
            VEGGIESTAT_FILE.touch()
            VEGGIESTAT_FILE.write_text(json.dumps(stat_data, indent=1, sort_keys=True))

        else:
            print("New compressed temp file is too small!")
            print(VEGGIEPLACES_TEMPFILE_BR.stat().st_size)
    else:
        print("temp file doesn't exist!")


def main():
    """Call the functions to get and write the osm data."""
    # Get data
    if len(sys.argv) < 2:
        osm_data = get_osm_data()
    else:
        # For testing without new OSM requests
        # Example: 'python refresh.py ./data/overpass.json'
        osm_data = json.load(open(sys.argv[1], encoding="utf-8"))

    # Write data
    if osm_data is not None:
        places_data = write_data(osm_data)

        # Write file in pretty format
        VEGGIEPLACES_TEMPFILE.touch()
        VEGGIEPLACES_TEMPFILE.write_text(json.dumps(places_data, indent=1, sort_keys=True, ensure_ascii=False))

        # Write file in minimized format
        VEGGIEPLACES_TEMPFILE_MIN.touch()
        VEGGIEPLACES_TEMPFILE_MIN.write_text(json.dumps(places_data, indent=None, sort_keys=True, separators=(",", ":"), ensure_ascii=False))

        # Write file in brotli compressed format
        compressed_data = brotli.compress(json.dumps(places_data, separators=(',', ':')).encode("utf-8"))
        with open(VEGGIEPLACES_TEMPFILE_BR, "wb") as outfile_br:
            outfile_br.write(compressed_data)

        check_data()
    else:
        print("A problem has occurred. The old data file was not replaced!")


main()
