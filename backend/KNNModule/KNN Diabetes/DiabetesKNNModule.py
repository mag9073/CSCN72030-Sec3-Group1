import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

import random

import sys
from pathlib import Path  # if you haven't already done so
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass


from KNNAbstract.abstract import DataFrameOperations, KNNOperations
from KNNFiles.KNNFileOperations import ReadingPatientFile
from KNNFiles.KNNFileOperations import SavingPredictedResults


class CreateDataframe(DataFrameOperations):
    def __init__(self):
        self.__df = pd.read_csv("diabetes.csv")

        self.filterNoise()

    def getDataframe(self):

        return self.__df

    def filterNoise(self):
        self.__df = self.__df[(self.__df.BloodPressure > 0) & (
            self.__df.SkinThickness > 0) & (self.__df.Insulin > 0) & (self.__df.BMI > 0)]


class TrainDiabeticModel(KNNOperations):
    def __init__(self, dataframe, patient_data):
        self.__df = dataframe
        self.__diabeticsPredictedResult = []

        self.splitDataset()

        self.trainDiabeticKNNModel(patient_data)

    def splitDataset(self):
        np.random.seed(123)

        self.__train, self.__valid, self.__test = np.split(self.__df.sample(
            frac=1), [int(0.6 * len(self.__df)), int(0.8 * len(self.__df))])

    def scaleDataset(self, dataframe):
        x = dataframe[dataframe.columns[: -1]].values
        y = dataframe[dataframe.columns[-1]].values

        scaler = StandardScaler()
        x = scaler.fit_transform(x)

        # data = np.hstack((x, np.reshape(y, (-1, 1))))

        return x, y

    def trainDiabeticKNNModel(self, patient_data):
        x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors=9)
        knn_model.fit(x_train, y_train)

        scaler = StandardScaler()
        patient_data = scaler.fit_transform(patient_data)

        self.__diabeticsPredictedResult = knn_model.predict(patient_data)

    def getPredictedResult(self):
        return self.__diabeticsPredictedResult


if (__name__) == "__main__":
    dataframe = CreateDataframe().getDataframe()

    patient_data = ReadingPatientFile("PatientData.csv").readFromFile()

    diabetes_result = TrainDiabeticModel(
        dataframe, patient_data).getPredictedResult()

    SavingPredictedResults("DiabetesResults.csv", diabetes_result).saveToFile()
