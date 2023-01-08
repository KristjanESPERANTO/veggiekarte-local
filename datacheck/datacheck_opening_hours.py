import pyopening_hours
import json

value = 'Tu-Th 12:00-14:00, Mo-Sa 18:00+; Su,PH off || "größere Reservierungen auch außerhalb der Öffnungszeiten möglich!"'
if "SH" not in value:

    try:
        oh = pyopening_hours.OpeningHours(value)
        print("Warnings:")
        for line in oh.getWarnings():
            print('  ' + line)
    except pyopening_hours.ParseException as error:
        print(error.message)
    except json.decoder.JSONDecodeError as error:
        print("Something else went wrong: json.decoder.JSONDecodeError") 

    print("The 'try except' is finished") 