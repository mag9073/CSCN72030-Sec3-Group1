import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier

import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError: # Already removed
    pass

from KNNFiles.KNNFileOperations import SavingPredictedResults



class CreateDataframe:   
    def __init__(self, fileName):
        self.__df = pd.read_csv(fileName)

        self.filterNoise()

    def getDataframe(self):
        return self.__df

    def filterNoise(self):   
        self.__df = self.__df[(self.__df.Age > 0) & (self.__df.RestingBP > 0) & (self.__df.Cholesterol > 0) & (self.__df.MaxHR > 0)]



class TrainHeartFailureModel:
    def __init__(self, dataframe, patient_data):
        self.__df = dataframe
        self.__heartFailurePredictedResult = []

        self.splitDataset()

        self.trainHeartFailureKNNModel(patient_data)


    def splitDataset(self):
        np.random.seed(123)

        self.__train, self.__valid, self.__test = np.split(self.__df.sample(frac = 1), [int(0.6 * len(self.__df)), int(0.8 * len(self.__df))])


    def scaleDataset(self, dataframe):

        x = dataframe[dataframe.columns[ : -1]].values
        y = dataframe[dataframe.columns[-1]].values

        scaler = StandardScaler()
        x = scaler.fit_transform(x)

        data = np.hstack((x, np.reshape(y, (-1, 1))))
        
        
        return data, x, y
    

    
    def trainHeartFailureKNNModel(self, patient_data):
        train, x_train, y_train = self.scaleDataset(self.__train)

        knn_model = KNeighborsClassifier(n_neighbors = 11)
        knn_model.fit(x_train, y_train)


        scaler = StandardScaler()
        patient_data = scaler.fit_transform(patient_data)

        self.__heartFailurePredictedResult = knn_model.predict(patient_data)



    def getPredictedResult(self):
        return self.__heartFailurePredictedResult
    

class FeatureAppropriationConversion:

    def convertFeaturesToNumeric(dataframe):
        cols = ["Sex", "ChestPainType", "RestingECG", "ExerciseAngina", "ST_Slope"]

        for column in cols:
            if (column == "Sex"):
                dataframe[column] = (dataframe[column] == "F").astype(int)

            elif (column == "ChestPainType"):
                custom_mapping = {"ATA" : -1, "NAP" : 0, "ASY" : 1, "TA" : 2}

                dataframe[column] = dataframe[column].map(custom_mapping)


            elif (column == "RestingECG"):
                custom_mapping = {"Normal" : -1, "ST" : 0, "LVH" : 1}

                dataframe[column] = dataframe[column].map(custom_mapping)


            elif (column == "ExerciseAngina"):
                dataframe[column] = (dataframe[column] == "Y").astype(int)


            else:
                custom_mapping = {"Up" : -1, "Flat" : 0, "Down" : 1}

                dataframe[column] = dataframe[column].map(custom_mapping)


        return dataframe




if __name__ == "__main__" :
    dataframe = CreateDataframe("heartFailure.csv").getDataframe()

    dataframe = FeatureAppropriationConversion.convertFeaturesToNumeric(dataframe)



    patient_dataframe = CreateDataframe("PatientData.csv").getDataframe()

    patient_dataframe = FeatureAppropriationConversion.convertFeaturesToNumeric(patient_dataframe)

    patient_dataframe = patient_dataframe[patient_dataframe.columns[ : ]].values



    heartFailure_result = TrainHeartFailureModel(dataframe, patient_dataframe).getPredictedResult()

    SavingPredictedResults("HeartFailureResults.csv", heartFailure_result).saveToFile()