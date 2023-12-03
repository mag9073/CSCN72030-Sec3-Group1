import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
import random

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
from KNNFiles.KNNFileOperations import DiseaseFile


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
    def __init__(self, dataframe, patient_data_dataframe):
        self.__df = dataframe
        self.__diabeticsPredictedResult = []
        self.__patient_data_dataframe = patient_data_dataframe

        self.splitDataset()

        self.adjustData()

        patient_data = (self.__patient_data_dataframe)[(self.__patient_data_dataframe).columns[ : ]].values

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

    def adjustData(self):
        random.seed(101)

        list_data = (self.__df)[(self.__df).columns[ : ]].values

        headers = ["Pregnancies", "Glucose", "BloodPressure",
                   "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]

        for count in range(0, 6):
            dict_data = {}

            rand_num =  random.randint(5, 350)

            req_list = list_data[rand_num]

            for list_index in range(0, len(headers)):
                dict_data[headers[list_index]] = req_list[list_index]

            (self.__patient_data_dataframe).loc[len(self.__patient_data_dataframe)] = dict_data


    def trainDiabeticKNNModel(self, patient_data):
        x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors=9)
        knn_model.fit(x_train, y_train)

        scaler = StandardScaler()
        patient_data = scaler.fit_transform(patient_data)

        self.__diabeticsPredictedResult = knn_model.predict(patient_data)

        self.__diabeticsPredictedResult = [self.__diabeticsPredictedResult[0]]

    def resultToDict(self, patient_data_dataframe):
        dict_patient_sample = {}

        patient_dict = patient_data_dataframe.to_dict()

        dict_patient_sample[0] = self.__diabeticsPredictedResult[0]

        patient_dict["Outcome"] = dict_patient_sample

        df = pd.DataFrame.from_dict(patient_dict)

        return df


    def getPredictedResult(self):
        return self.__diabeticsPredictedResult


if (__name__) == "__main__":
    dataframe = CreateDataframe().getDataframe()

    patient_data_dataframe = DiseaseFile.readFromFile("PatientData.csv")

    d = TrainDiabeticModel(dataframe, patient_data_dataframe.copy(deep=True))

    df = d.resultToDict(patient_data_dataframe)

    DiseaseFile().saveToFile("DiabetesResults.csv", df)