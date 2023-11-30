import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

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

from KNNAbstract.abstract import DataFrameOperations, KNNOperations
from KNNFiles.KNNFileOperations import SavingPredictedResults


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
    def __init__(self, dataframe, patient_data):
        self.__df = dataframe
        self.__strokePredictedResult = []

        self.splitDataset()

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

        # data = np.hstack((x, np.reshape(y, (-1, 1))))

        return x, y

    def trainStrokeKNNModel(self, patient_data):
        x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors=3)
        knn_model.fit(x_train, y_train)

        scaler = StandardScaler()
        patient_data = scaler.fit_transform(patient_data)

        self.__strokePredictedResult = knn_model.predict(patient_data)

    def getPredictedResult(self):
        return self.__strokePredictedResult




if __name__ == "__main__":
    dataframe = CreateDataframe("stroke_data.csv").getDataframe()

    patient_dataframe = CreateDataframe("PatientData.csv").getDataframe()

    patient_dataframe = patient_dataframe[patient_dataframe.columns[:]].values

    stroke_result = TrainStrokeModel(
        dataframe, patient_dataframe).getPredictedResult()

    SavingPredictedResults("StrokeResults.csv",
                           stroke_result).saveToFile()
