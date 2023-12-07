import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
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


from KNNAbstract.abstract import DataFrameOperations, KNNOperations

class CreateDataframe(DataFrameOperations):
    def __init__(self, fileName):
        self.__df = pd.read_csv(fileName)

        self.filterNoise()

    def getDataframe(self):
        return self.__df

    def filterNoise(self):
        self.__df = self.__df[(self.__df.Age > 0) & (self.__df.RestingBP > 0) & (
            self.__df.Cholesterol > 0) & (self.__df.MaxHR > 0)]


class TrainHeartFailureModel(KNNOperations):
    def __init__(self, dataframe, patient_dataframe):
        self.__df = dataframe
        self.__heartFailurePredictedResult = []
        self.__patient_data_dataframe = patient_dataframe

        self.splitDataset()

        self.adjustData()

        patient_data = (self.__patient_data_dataframe)[(self.__patient_data_dataframe).columns[ : ]].values

        self.trainHeartFailureKNNModel(patient_data)

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

        headers = ["Age", "Sex","ChestPainType","RestingBP","Cholesterol","FastingBS","RestingECG","MaxHR","ExerciseAngina","Oldpeak","ST_Slope"]

        for count in range(0, 6):
            dict_data = {}

            rand_num =  random.randint(20, 650)

            req_list = list_data[rand_num]

            for list_index in range(0, len(headers)):
                dict_data[headers[list_index]] = req_list[list_index]

            (self.__patient_data_dataframe).loc[len(self.__patient_data_dataframe)] = dict_data


    def trainHeartFailureKNNModel(self, patient_data):
        x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors=11)
        knn_model.fit(x_train, y_train)

        scaler = StandardScaler()
        patient_data = scaler.fit_transform(patient_data)

        self.__heartFailurePredictedResult = knn_model.predict(patient_data)

        self.__heartFailurePredictedResult = [self.__heartFailurePredictedResult[0]]


    def resultToDict(self, patient_data_dataframe):
        dict_patient_sample = {}

        patient_dict = patient_data_dataframe.to_dict()

        dict_patient_sample[0] = self.__heartFailurePredictedResult[0]

        patient_dict["HeartDisease"] = dict_patient_sample

        df = pd.DataFrame.from_dict(patient_dict)

        return df


    def getPredictedResult(self):
        return self.__heartFailurePredictedResult


class FeatureAppropriationConversion:

    def convertFeaturesToNumeric(self, dataframe):
        cols = ["Sex", "ChestPainType", "RestingECG",
                "ExerciseAngina", "ST_Slope"]

        for column in cols:
            if (column == "Sex"):
                dataframe[column] = (dataframe[column] == "F").astype(int)

            elif (column == "ChestPainType"):
                custom_mapping = {"ATA": 1, "NAP": 2, "ASY": 3, "TA": 4}

                dataframe[column] = dataframe[column].map(custom_mapping)

            elif (column == "RestingECG"):
                custom_mapping = {"Normal": 1, "ST": 2, "LVH": 3}

                dataframe[column] = dataframe[column].map(custom_mapping)

            elif (column == "ExerciseAngina"):
                dataframe[column] = (dataframe[column] == "Y").astype(int)

            else:
                custom_mapping = {"Up": 1, "Flat": 2, "Down": 3}

                dataframe[column] = dataframe[column].map(custom_mapping)

        return dataframe


# if __name__ == "__main__":
#     dataframe = CreateDataframe("heartFailure.csv").getDataframe()

#     dataframe = FeatureAppropriationConversion().convertFeaturesToNumeric(
#         dataframe)

#     patient_dataframe = CreateDataframe("PatientData.csv").getDataframe()

#     patient_dataframe = FeatureAppropriationConversion().convertFeaturesToNumeric(
#         patient_dataframe)


#     hf = TrainHeartFailureModel(dataframe, patient_dataframe.copy(deep = True))

#     df = hf.resultToDict(patient_dataframe)

#     DiseaseFile().saveToFile("HeartFailureResults.csv", df)