
import json

with open("paronyms", "r") as f:
    lines = [line.strip() for line in f.readlines()]

paronyms = []

paronym = {}
for line_number in range(len(lines)):
    line = lines[line_number]
    try:
        if line == "":
            paronyms.append(paronym)
            paronym = {}
        else:
            word, description = line.split(" ", 1)
            word = word.lower()

            description = [part.strip() for part in description[1:-1].split("|")]

            # [ [meaning, examples] ]
            paronym[word] = {}

            for i in range(0, len(description), 2):
                meaning, example = description[i], description[i + 1]
                paronym[word][meaning] = example
    except Exception as e:
        print(line_number, line)
        print(e)
        exit(1)


print(json.dumps(paronyms, ensure_ascii=False, indent=2))
