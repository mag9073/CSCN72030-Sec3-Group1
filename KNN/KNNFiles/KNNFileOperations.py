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
    # def __init__(self):
    # self.__fileName

    def readFromFile(fileName):
        dataframe = pd.read_csv(fileName)

        return dataframe[dataframe.columns[:]].values

    def returnDataframeValues(dataframe):
        return dataframe[dataframe.columns[:]].values
