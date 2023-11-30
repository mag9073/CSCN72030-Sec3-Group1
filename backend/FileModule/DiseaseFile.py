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

    def setDiseaseData(self, fileInstance):
        self.__fileInstance = fileInstance

    def getDiseaseData(self):
        return self.__fileInstance

    def saveToFile(self, fileName, predictedResult):
        with open(fileName, "w") as my_file:
            for element in predictedResult:
                my_file.write(f"{element}")

    def readFromFile(self):
        fileName = (self.__fileInstance).getFilename()

        dataframe = pd.read_csv(fileName)

        return dataframe[dataframe.columns[:]].values

    def returnDataframeValues(dataframe):
        return dataframe[dataframe.columns[:]].values


if __name__ == "__main__":
    f = File("PatientData.csv")

    d = DiseaseFile(f)

    print(d.readFromFile())

    d.saveToFile("test.csv", [1])
