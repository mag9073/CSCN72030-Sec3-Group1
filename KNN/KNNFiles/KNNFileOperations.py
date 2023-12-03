import pandas as pd


class DiseaseFile():
    def saveToFile(self, fileName, dataframe):
        dataframe.to_csv(fileName, index=False)
        

    def readFromFile(self):
        fileName = "PatientData.csv"

        dataframe = pd.read_csv(fileName)

        return dataframe
