# vacabTrainer
#000002

ChatGPT prompt(Für Daten veraeitung):
Turn the following data into the following json format:

[
  {"LatinWord": "cadõ, cecidi, clisarum", "GermanTranslation": "fallen"},
]
Leave out any sentences and do it for the entired data provided. Do not use a different syntex for "LatinWord"
and "GermanTranslation".

The Data will follow in the next prompt.



For data storage follow the steps below:

1) Make sure that the data ChatGPT provides matches the general format named above.
2) Create a file in the vocabularyFiles Directory with the following naming sceme: bookName_Class_Section_SectionRange.json.
3) Commit the file.
4) Link the file in the fileLinks.json by creating a new entry by copying the sceme already used in the file, change the url object to the raw data GitHub link from the vocabularyTrainingData file.
5) Commit the changes

Important:

The Object idetifier alway has to be the same, meaning do not change LatinWord to English/French Word and dont change German trantlation into English/French translation. 
Not handeling according to the rules can result in a faliure during the vocabulary fetching inApp, wich most certanly will result in the app crashing and maybe even
device crashing. 

Leave adding new data to authorised staff.