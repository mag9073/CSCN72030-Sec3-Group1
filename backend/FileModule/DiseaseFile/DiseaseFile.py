import pandas as pd


import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass

from FileSuperClass.File import File


class DiseaseFile(File):
    def __init__(self, fileInstance):
        self.__fileInstance = fileInstance

    def saveToFile(self, fileName, dataframe):
        dataframe.to_csv(fileName, index = False)

    def readFromFile(self):
        fileName = (self.__fileInstance).getFilename()

        dataframe = pd.read_csv(fileName)

        return dataframe



if __name__ == "__main__":
    f = File("PatientData.csv")

    d = DiseaseFile(f)

    print(d.readFromFile())
