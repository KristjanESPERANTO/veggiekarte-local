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

# Load configuration: config.custom.json if it exists, otherwise config.default.json
CONFIG_CUSTOM = Path("./config.custom.json")
CONFIG_DEFAULT = Path("./config.default.json")

if CONFIG_CUSTOM.exists():
    CONFIG_FILE = CONFIG_CUSTOM
    print(f"Using custom config: {CONFIG_FILE}")
elif CONFIG_DEFAULT.exists():
    CONFIG_FILE = CONFIG_DEFAULT
    print(f"Using default config: {CONFIG_FILE}")
else:
    raise FileNotFoundError(
        "No config file found. Please create config.custom.json or ensure config.default.json exists."
    )

with open(CONFIG_FILE) as f:
    CONFIG = json.load(f)

# constants for the overpass request

# # server list (from: https://wiki.openstreetmap.org/wiki/Overpass_API)
SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://z.overpass-api.de/api/interpreter",
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
OPENING_HOURS_FILE = DATA_DIR / "opening_hours.json"           # opening hours data for filtering

# variables to handle the json data
stat_data = {}

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


def build_overpass_query():
    """Build the Overpass query from config."""
    query = "?data=[out:json][timeout:900];"

    # Build area query if areas are defined
    if CONFIG["areas"] and len(CONFIG["areas"]) > 0:
        area_names = []
        for area in CONFIG["areas"]:
            area_name = area["name"]
            area_names.append(area_name)
            query += f"area['{area['type']}'='{area['value']}']->.{area_name};"

        # Combine areas into search area
        query += f"({';'.join(f'.{name}' for name in area_names)};)->.searchArea;"
        query += "("

        # Always include vegan
        query += "nwr(area.searchArea)['diet:vegan'~'yes|only|limited'];"

        # Add vegetarian if configured
        if CONFIG["includeVegetarian"]:
            query += "nwr(area.searchArea)['diet:vegetarian'~'yes|only'];"

        query += ");"
    elif CONFIG["areaQuery"]:
        # Use custom area query
        query += CONFIG["areaQuery"]
        query += "("

        # Always include vegan
        query += "nwr(area.searchArea)['diet:vegan'~'yes|only|limited'];"

        # Add vegetarian if configured
        if CONFIG["includeVegetarian"]:
            query += "nwr(area.searchArea)['diet:vegetarian'~'yes|only'];"

        query += ");"
    else:
        # Worldwide query
        query += "("

        # Always include vegan
        query += "nwr['diet:vegan'~'yes|only|limited'];"

        # Add vegetarian if configured
        if CONFIG["includeVegetarian"]:
            query += "nwr['diet:vegetarian'~'yes|only'];"

        query += ");"

    query += "out+center;"
    return query


def get_osm_data():
    """Get the data from OSM."""
    overpass_query = build_overpass_query()
    print("Overpass query:", overpass_query)

    max_retries = 3
    retry_count = 0

    # Try multiple times if all servers fail
    while retry_count < max_retries:
        if retry_count > 0:
            print(f"\n=== Retry attempt {retry_count + 1} of {max_retries} ===")

        # Try servers until one gives a valid response
        for server_index, overpass_server in enumerate(SERVERS):
            print(f"Send query to server [{server_index + 1}/{len(SERVERS)}]: {overpass_server}")

            try:
                # Add timeout to prevent indefinite hanging
                response = HTTP.request("GET", overpass_server + overpass_query, timeout=urllib3.Timeout(connect=30.0, read=960.0))
            except urllib3.exceptions.TimeoutError as e:
                print(f"Request timeout: {e}")
                print("Trying next server...")
                continue
            except Exception as e:
                print(f"Network error: {e}")
                print("Trying next server...")
                continue

            # Handle HTTP status codes
            if response.status == 200:
                print("Received answer successfully.")

                if not response.data:
                    print("Empty response body, trying next server...")
                    continue

                try:
                    result = json.loads(response.data.decode("utf-8"))
                    # Success - save raw data and return result
                    OVERPASS_FILE.touch()
                    OVERPASS_FILE.write_bytes(response.data)
                    print("Data successfully retrieved and saved.")
                    return result
                except json.JSONDecodeError as e:
                    print(f"Failed to decode JSON: {e}")
                    print("Trying next server...")
                    continue

            elif response.status == 400:
                print(f"HTTP {response.status}: Bad Request - Query might be invalid")
                print("Trying next server...")
                time.sleep(5)
            elif response.status == 429:
                print(f"HTTP {response.status}: Too Many Requests - Rate limit exceeded")
                print("Waiting 60 seconds before trying next server...")
                time.sleep(60)
            elif response.status == 504:
                print(f"HTTP {response.status}: Gateway Timeout - Server took too long to respond")
                print("This can happen with large queries. Trying next server...")
                time.sleep(10)  # Reduced from 600 to 10 seconds
            else:
                print(f"HTTP {response.status}: Unexpected error")
                print("Trying next server...")
                time.sleep(5)

        # All servers failed this round
        retry_count += 1
        if retry_count < max_retries:
            wait_time = 60 * retry_count  # Increasing wait time: 60s, 120s
            print(f"\nAll servers failed. Waiting {wait_time} seconds before retry {retry_count + 1}/{max_retries}...")
            time.sleep(wait_time)

    print("\n=== All retry attempts exhausted ===")
    print("All servers failed after multiple attempts.")
    print("Possible solutions:")
    print("  - Wait a few minutes and try again")
    print("  - Reduce the query area in config.custom.json")
    print("  - Try again during off-peak hours")
    return None


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

        # Add "more_info" flag if element is in the config list
        if CONFIG["localSiteEnabled"] and element_id in CONFIG["localSiteMoreInfoIds"]:
            place_obj["properties"]["more_info"] = True

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
            place_obj["properties"]["category"] = "vegetarian_friendly"
            n_vegetarian_friendly += 1

    # The following detailed fields (cuisine, contacts, opening hours, descriptions, menu)
    # are intentionally omitted to shrink the base dataset. They are now fetched lazily
    # from Nominatim (extratags) when a popup opens.

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
                print("Trying to generate statistics locally via generate_stats.py...")
                import subprocess
                result = subprocess.run(["python3", "generate_stats.py"], capture_output=True, text=True)
                if result.returncode == 0 and VEGGIESTAT_FILE.exists():
                    print("Successfully generated statistics locally.")
                else:
                    print("Failed to generate statistics locally.")
                    print("Creating empty statistic file.")
                    VEGGIESTAT_FILE.touch()
                    VEGGIESTAT_FILE.write_text(json.dumps({"stat": []}, indent=1))
                    stat_data["stat"] = []
        except Exception as e:
            print(f"Error while downloading remote statistic file: {e}")
            print("Trying to generate statistics locally via generate_stats.py...")
            import subprocess
            result = subprocess.run(["python3", "generate_stats.py"], capture_output=True, text=True)
            if result.returncode == 0 and VEGGIESTAT_FILE.exists():
                print("Successfully generated statistics locally.")
            else:
                print("Failed to generate statistics locally.")
                print("Creating empty statistic file.")
                VEGGIESTAT_FILE.touch()
                VEGGIESTAT_FILE.write_text(json.dumps({"stat": []}, indent=1))
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


def write_opening_hours(osm_data):
    """Extract opening hours from OSM data and write to JSON file."""
    # Group by type for smaller file size
    opening_hours = {
        "node": {},
        "way": {},
        "relation": {}
    }
    total_count = 0

    for element in osm_data.get("elements", []):
        element_id = element.get("id")
        element_type = element.get("type")
        tags = element.get("tags", {})

        # Check if place has opening_hours tag
        if "opening_hours" in tags and element_id and element_type in opening_hours:
            opening_hours[element_type][str(element_id)] = tags["opening_hours"]
            total_count += 1

    # Write to file
    print(f"Writing {total_count} opening hours entries to {OPENING_HOURS_FILE}")
    OPENING_HOURS_FILE.touch()
    OPENING_HOURS_FILE.write_text(
        json.dumps(opening_hours, indent=None, separators=(",", ":"), ensure_ascii=False)
    )

    return opening_hours


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

        # Write opening hours data
        write_opening_hours(osm_data)

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
