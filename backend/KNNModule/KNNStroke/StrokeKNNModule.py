import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report
import random

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

from KNNFiles.KNNFileOperations import DiseaseFile
from KNNAbstract.abstract import DataFrameOperations, KNNOperations


class CreateDataframe(DataFrameOperations):
    def __init__(self, fileName):
        self.__df = pd.read_csv(fileName)

        self.filterNoise()

    def getDataframe(self):
        return self.__df

    def filterNoise(self):
        self.__df = self.__df[(self.__df.sex >= 0) & (self.__df.age >= 0)
                              & (self.__df.hypertension >= 0) & (self.__df.heart_disease >= 0) & (self.__df.ever_married >= 0)
                              & (self.__df.work_type >= 0) & (self.__df.Residence_type >= 0) & (self.__df.avg_glucose_level >= 0) & (self.__df.bmi >= 0)]


class TrainStrokeModel(KNNOperations):
    def __init__(self, dataframe, patient_dataframe):
        self.__df = dataframe
        self.__strokePredictedResult = []
        self.__patient_data_dataframe = patient_dataframe

        self.splitDataset()

        self.adjustData()

        patient_data = (self.__patient_data_dataframe)[self.__patient_data_dataframe.columns[ : ]].values

        self.trainStrokeKNNModel(patient_data)

    def splitDataset(self):
        np.random.seed(123)

        self.__train, self.__valid, self.__test = np.split(self.__df.sample(
            frac=1), [int(0.6 * len(self.__df)), int(0.8 * len(self.__df))])

    def scaleDataset(self, dataframe):

        x = dataframe[dataframe.columns[: -1]].values
        y = dataframe[dataframe.columns[-1]].values

        scaler = StandardScaler()
        x = scaler.fit_transform(x)

        return scaler, x, y

    def adjustData(self):
        random.seed(101)

        list_data = (self.__df)[(self.__df).columns[:]].values

        headers = ["sex", "age", "hypertension", "heart_disease", "ever_married",
                   "work_type", "Residence_type", "avg_glucose_level", "bmi", "smoking_status"]

        for count in range(0, 10):
            dict_data = {}

            rand_num = random.randint(20300, 20600)

            req_list = list_data[rand_num]

            for list_index in range(0, len(headers)):
                dict_data[headers[list_index]] = req_list[list_index]

            (self.__patient_data_dataframe).loc[len(
                self.__patient_data_dataframe)] = dict_data


    def trainStrokeKNNModel(self, patient_data):
        scaler, x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors=3)
        knn_model.fit(x_train, y_train)

        patient_data = scaler.fit_transform(patient_data)

        self.__strokePredictedResult = knn_model.predict(patient_data)

        self.__strokePredictedResult = [(self.__strokePredictedResult)[0]]


    def resultToDict(self, patient_data_dataframe):
        dict_patient_sample = {}

        patient_dict = patient_data_dataframe.to_dict()

        dict_patient_sample[0] = self.__strokePredictedResult[0]

        patient_dict["stroke"] = dict_patient_sample

        df = pd.DataFrame.from_dict(patient_dict)

        return df


    def getPredictedResult(self):
        return self.__strokePredictedResult


if __name__ == "__main__":
    dataframe = CreateDataframe("stroke_data.csv").getDataframe()

    patient_data_dataframe = CreateDataframe("PatientData.csv").getDataframe()

    s = TrainStrokeModel(dataframe, patient_data_dataframe.copy(deep = True))

    df = s.resultToDict(patient_data_dataframe)

    DiseaseFile().saveToFile("StrokeResults.csv", df)
