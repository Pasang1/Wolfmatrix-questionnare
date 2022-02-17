import csv

with open('csv-samples.csv', newline='') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
    i = 0
    for row in spamreader:
        i+=1
    print('Number of lines: ' + str(i))
