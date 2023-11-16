import pandas as pd

class SavingPredictedResults:
    def __init__(self, fileName, predictedResult):
        self.__fileName = fileName
        self.__predictedResult = predictedResult

    def saveToFile(self):
        with open(self.__fileName, "w") as my_file:
            for element in self.__predictedResult:
                my_file.write(f"{element}")



class ReadingPatientFile:
    def __init__(self, fileName):
        self.__fileName = fileName

    def readFromFile(self):
        dataframe = pd.read_csv(self.__fileName)

        return dataframe[dataframe.columns[ : ]].values