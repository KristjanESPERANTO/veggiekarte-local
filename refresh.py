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
TIMESTAMP = str(datetime.datetime.now())                     # the actual date and time
DATE = datetime.datetime.now().strftime("%Y-%m-%d")          # the actual date
DATA_DIR = os.path.dirname(os.path.abspath(__file__))        # get the path of the directory of this script
VEGGIEPLACES_TEMPFILE = DATA_DIR + "/data/places_temp.json"  # the temp file to store the data from the overpass request
VEGGIEPLACES_FILE = DATA_DIR + "/data/places.json"           # the data file which will be used for the map
VEGGIESTAT_FILE = DATA_DIR + "/data/stat.json"               # the data file which will be used for the map
VEGGIEPLACES_OLDFILE = DATA_DIR + "/data/places_old.json"    # previous version of the data file (helpful to examine changes)

# variables to handle the json data
places_data = {}
stat_data = {}

# only for Halle
TOP_URL = "https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/"

# # list of objects which get links to more infos
GET_MORE_INFO = [
    4036431410,  # Vegs
    5592987513,  # VL-Küfa
    5592955318,  # Reil-Küfa
    1931764008,  # Afamia Eck
    3658458714,  # Kornliebchen
    3590210914,  # Kumara
    1034449861,  # Ökoase
    61561597,    # Gartenlokal am Peißnitzhaus
    1037059970,  # Kaffeeschuppen
    164756625,   # Falafello
    711744198,   # Hans im Glück
    1538147900,  # Le Feu
    2932869816,  # Yasmin
    261692804,   # Espitas
    6380783117,  # roots
    1038238639,  # Enchilada
    2874464836,  # Mextreme
    252918375,   # Alte Apotheke
    4974999721,  # Bagel 29
    3821868244,  # Sakura
    282473154,   # Saalekahn
    1034448971,  # Café Nöö
    748274685,   # Coffee & Sandwiches (Angebot nicht geprüft, aktuell ohne Veggie-Tags)
    2531221700,  # Subway Neustadt
    942721131,   # Subway Zentrum
    3820929262,  # Subway Merseburg
    467769739,   # Goldene Schildkröte
    309747715,   # Shiva
    1676156956,  # House of India
    2791600302,  # Hotdog King
    3052291182,  # Seoul Kulinarisch
    1037236274,  # Anh Asia
    164756646,   # Nice
    7388445891,  # City Döner
    578246181,   # Mo’s Daniel’s
    2876264915,  # Sao Mai
    178744104,   # Hallesches Brauhaus
    3752087074,  # Rote Soße
    32804265,    # Freddy Fresh
    53062443,    # Uno Pizza - Innenstadt
    471978357,   # Uno Pizza - Büschdorf
    47571137,    # Uno Pizza - Südstadt
    3387395693,  # Uno Pizza - Neustadt
    4868552820,  # Uno Pizza - Heide Süd
    4948443538,  # Thang Long
    189926769,   # Lichthaus
    134238289,   # Mönchshof
    4465518868,  # Sushifreunde
    1475009992,  # Rossini
    4893692292,  # Pandileo
    3724388225,  # Burgerheart
    182854644,   # Tajmahal
    4815463722,  # Viet Village
    5599806557,  # Sham Restaurant
    2415756481,  # Hallenser Kartoffelhaus
    3173527817,  # Burgerservice
    6820930072,  # Pirashki
    8018875351,  # Restaurant Ruine
    2068490774,  # The One
    5868832962,  # Tandoori Steakhaus
    1185202509,  # Harzmensa
    8018837433,  # Mensa Neuwerk
    304682735,   # Mensa Franckesche Stiftungen
    22883232,    # Heidemensa
    375345326,   # Cafebar Steintor-Campus
    3364559365,  # The Shabby
    8018723343,  # Café Kuckhoff
    2496741334,  # Naschmadame
    6033781352,  # Törtcheneck
    1037235900,  # Czech
    4914539421,  # 7 Gramm
    2791600291,  # Coffee Fellows im Hauptbahnhof
    3208898648,  # Coffee Fellows - Nova Eventis
    1639760594,  # Bewaffel dich
    6569044919,  # Hafenmeister & Docks
    5942265574,  # Koffij
    1045144852,  # Rosenburg
    7027316371,  # Bistro Lorraine
    5593108867,  # Himmel & Erde
    120082234,   # Colonne Morris
    1045144871,  # Zwei Zimmer, Küche, Bar
    4971464334,  # Café Ludwig
    3724402925,  # I LOVE Icecream
    2715257424,  # Sonnendeck
    2065237786,  # Naturell
    2051567009,  # ÖkoHalle
    1943778686,  # BioRio
    1902279166,  # Biomarkt am Reileck
    1701119442,  # Naturata
    6805328949,  # Bio im Bahnhof
    5245541311,  # denns
    5583171123,  # Europasia
    2322858124,  # Weltladen
    6366059605,  # Rübchen
    7068127430,  # Cancun-Bar
    2969150134   # Bäckerei Schäl
]

# icon mapping
# (the first element of the array is for the icon in the marker, the second is an emoji and it is used in the title)
ICON_MAPPING = {
    # Intentionally not alphabetical order
    "cuisine:pizza": ["maki_restaurant-pizza", "🍕"],
    # Alphabetical order
    "amenity:bar": ["bar", "🍸"],
    "amenity:bbq": ["bbq", "🍴"],
    "amenity:cafe": ["cafe", "☕"],
    "amenity:cinema": ["cinema", "🎦"],
    "amenity:college": ["maki_college", "🎓"],
    "amenity:fast_food": ["fast_food", "🍔"],
    "amenity:food_court": ["restaurant", "🍽️"],
    "amenity:fuel": ["fuel", "⛽"],
    "amenity:hospital": ["hospital", "🏥"],
    "amenity:ice_cream": ["ice_cream", "🍨"],
    "amenity:kindergarten": ["playground", "🧒"],
    "amenity:pharmacy": ["pharmacy", "💊"],
    "amenity:place_of_worship": ["place_of_worship", "🛐"],
    "amenity:pub": ["pub", "🍻"],
    "amenity:restaurant": ["restaurant", "🍽️"],
    "amenity:school": ["maki_school", "🏫"],
    "amenity:shelter": ["shelter", "☂️"],
    "amenity:swimming_pool": ["maki_swimming", "🏊‍♀️"],
    "amenity:theatre": ["theatre", "🎭"],
    "amenity:university": ["maki_college", "🎓"],
    "amenity:vending_machine": ["maki_shop", "🛒"],
    "historic:memorial": ["monument", "🗿"],
    "leisure:golf_course": ["golf", "🏌️"],
    "leisure:pitch": ["maki_pitch", "🏃"],
    "leisure:sports_centre": ["sports", "🤼"],
    "leisure:stadium": ["maki_stadium", "🏟️"],
    "shop:alcohol": ["alcohol", "🍷"],
    "shop:bakery": ["bakery", "🥯"],
    "shop:beauty": ["beauty", "💇"],
    "shop:bicycle": ["bicycle", "🚲"],
    "shop:books": ["library", "📚"],
    "shop:butcher": ["butcher", "🔪"],
    "shop:clothes": ["clothes", "👚"],
    "shop:confectionery": ["confectionery", "🍬"],
    "shop:convenience": ["convenience", "🏪"],
    "shop:department_store": ["department_store", "🏬"],
    "shop:doityourself": ["diy", "🛠️"],
    "shop:fishmonger": ["maki_shop", "🐟"],
    "shop:garden_centre": ["garden-centre", "🏡"],
    "shop:general": ["maki_shop", "🛒"],
    "shop:gift": ["gift", "🎁"],
    "shop:greengrocer": ["greengrocer", "🍏"],
    "shop:hairdresser": ["hairdresser", "💇"],
    "shop:kiosk": ["maki_shop", "🛒"],
    "shop:music": ["music", "🎶"],
    "shop:supermarket": ["supermarket", "🏪"],
    "shop:wine": ["alcohol", "🍷"],
    "tourism:guest_house": ["guest_house", "🏠"],
    "tourism:museum": ["museum", "🖼️"],
}


def determine_icon(tags):
    """Determine an icon for the marker."""
    icon = ["maki_star-stroked", ""]   # Use this icon if there is no matching per ICON_MAPPING.
    for key_value in ICON_MAPPING:
        key, value = key_value.split(":")
        tag = tags.get(key)

        if not tag:
            continue

        tag = tag.split(";")[0]

        if tag == value:
            icon = ICON_MAPPING[key_value]
            break
    return icon


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
    # # Collect the vegan nodes and ways
    overpass_query += '(node(area.hal_sk_le_area)["diet:vegan"~"yes|only|limited"];'\
                      'way(area.hal_sk_le_area)["diet:vegan"~"yes|only|limited"];'
    # # Collect the vegetarian nodes and ways
    overpass_query += 'node(area.hal_sk_le_area)["diet:vegetarian"~"yes|only"];'\
                      'way(area.hal_sk_le_area)["diet:vegetarian"~"yes|only"];'
    # # End of the query and use "out center" to reduce the geometry of ways to a single coordinate
    overpass_query += ');out+center;'

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

        if element_type == "node":
            lat = osm_element.get("lat", None)
            lon = osm_element.get("lon", None)

        elif element_type == "way":
            center_coordinates = osm_element.get("center", None)  # get the coordinates from the center of the object
            lat = center_coordinates.get("lat", None)
            lon = center_coordinates.get("lon", None)

        else:
            continue

        place_obj["geometry"] = {}
        place_obj["geometry"]["type"] = "Point"
        place_obj["geometry"]["coordinates"] = [lon, lat]

        icon = determine_icon(tags)
        place_obj["properties"]["icon"] = icon[0]
        place_obj["properties"]["symbol"] = icon[1]

        if "name" in tags:
            name = tags["name"]
            # # Double quotes could escape code, so we have to replace them:
            name = name.replace('"', '”')
        else:
            # # If there is no name given from osm, we build one.
            name = "%s %s" % (element_type, element_id)
        place_obj["properties"]["name"] = name

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
            place_obj["properties"]["category"] = "vegetarian_friendly"
            n_vegetarian_friendly += 1

        if "cuisine" in tags:
            place_obj["properties"]["cuisine"] = tags["cuisine"]
        if "addr:street" in tags:
            place_obj["properties"]["addr_street"] = tags.get("addr:street", "")
            if "addr:housenumber" in tags:
                place_obj["properties"]["addr_street"] += " " + tags.get("addr:housenumber", "")
        if "addr:city" in tags:
            place_obj["properties"]["addr_city"] = tags.get("addr:city", "")
        if "addr:postcode" in tags:
            place_obj["properties"]["addr_postcode"] = tags.get("addr:postcode", "")
        if "addr:country" in tags:
            place_obj["properties"]["addr_country"] = tags.get("addr:country", "")
        if "contact:website" in tags:
            place_obj["properties"]["contact_website"] = tags.get("contact:website", "")
        elif "website" in tags:
            place_obj["properties"]["contact_website"] = tags.get("website", "")
        if "contact:facebook" in tags:
            place_obj["properties"]["contact_facebook"] = tags.get("contact:facebook", "")
        elif "facebook" in tags:
            place_obj["properties"]["contact_facebook"] = tags.get("facebook", "")
        if "contact:instagram" in tags:
            place_obj["properties"]["contact_instagram"] = tags.get("contact:instagram", "")
        if "contact:email" in tags:
            place_obj["properties"]["contact_email"] = tags.get("contact:email", "")
        elif "email" in tags:
            place_obj["properties"]["contact_email"] = tags.get("email", "")
        if "contact:phone" in tags:
            place_obj["properties"]["contact_phone"] = tags.get("contact:phone", "")
        elif "phone" in tags:
            place_obj["properties"]["contact_phone"] = tags.get("phone", "")
        if "opening_hours:covid19" in tags:
            # Replacing line breaks with spaces (Usually there should be no line breaks,
            # but if they do appear, they break the structure of the places.json).
            opening_hours = tags["opening_hours:covid19"].replace("\n", "").replace("\r", "")
            place_obj["properties"]["opening_hours"] = opening_hours
        elif "opening_hours" in tags:
            # Replacing line breaks with spaces (Usually there should be no line breaks,
            # but if they do appear, they break the structure of the places.json).
            opening_hours = tags["opening_hours"].replace("\n", "").replace("\r", "")
            place_obj["properties"]["opening_hours"] = opening_hours
        if "shop" in tags:
            place_obj["properties"]["shop"] = tags["shop"]

        if element_id in GET_MORE_INFO:  # More information and Link for those who use the map in a local website.
            place_obj["properties"]["more_info"] = True

        places_data["features"].append(place_obj)

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
    if os.path.isfile(VEGGIEPLACES_TEMPFILE):                    # check if the temp file exists
        if os.path.getsize(VEGGIEPLACES_TEMPFILE) > 500:         # check if the temp file isn't to small (see issue #21)
            print("rename " + VEGGIEPLACES_TEMPFILE + " to " + VEGGIEPLACES_FILE)
            os.rename(VEGGIEPLACES_FILE, VEGGIEPLACES_OLDFILE)   # rename old file
            os.rename(VEGGIEPLACES_TEMPFILE, VEGGIEPLACES_FILE)  # rename temp file to new file

            # Write the new statistic file
            outfilestat = open(VEGGIESTAT_FILE, "w")
            outfilestat.write(json.dumps(stat_data, indent=1, sort_keys=True))
            outfilestat.close()

        else:
            print("temp file is to small!")
            print(os.path.getsize(VEGGIEPLACES_TEMPFILE))
    else:
        print("temp file don't exists!")


def main():
    """Call the functions to get and write the osm data."""
    # Get data
    osm_data = get_data_osm()

    # Write data
    if osm_data is not None:
        write_data(osm_data)
        outfile = open(VEGGIEPLACES_TEMPFILE, "w")
        outfile.write(json.dumps(places_data, indent=1, sort_keys=True))
        outfile.close()

        check_data()
    else:
        print("A problem has occurred. The old VEGGIE_MAP was not replaced!")


main()
