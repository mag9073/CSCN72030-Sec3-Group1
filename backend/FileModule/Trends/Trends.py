import pandas as pd
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

from FileSuperClass.File import File

class Trends(File):
    def __init__(self, disease):
        self.__disease = disease

    def createDataframe(self, filename):
        dataframe = pd.read_csv(filename)

        return dataframe

    def readSampleAndGenerateFile(self):
        dict1 = {}
        dict2 = {}
        dict3 = {}

        tuple_dict = (dict1, dict2, dict3)

        if (self.__disease == "Diabetes"):
            headers = ["Year", "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
                       "Insulin", "BMI", "DiabetesPedigreeFunction", "Age", "Outcome"]

            random.seed(101)

            rand_num_1_year = random.randint(5, 390)
            rand_num_6_months = random.randint(5, 390)
            rand_num_3_months = random.randint(5, 390)

            dataframe = self.createDataframe("FileModule/Trends/Diabetes_data.csv")

            list = dataframe[dataframe.columns[:]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict1[headers[index]] = "one year"

                else:
                    dict1[headers[index]] = (list[rand_num_1_year])[index - 1]



            for index in range(0, len(headers)):
                if (index == 0):
                    dict2[headers[index]] = "six months"

                else:
                    dict2[headers[index]] = (
                        list[rand_num_6_months])[index - 1]


            for index in range(0, len(headers)):
                if (index == 0):
                    dict3[headers[index]] = "three months"

                else:
                    dict3[headers[index]] = (
                        list[rand_num_3_months])[index - 1]


        elif (self.__disease == "HeartFailure"):
            headers = ["Year", "Age", "Sex", "ChestPainType", "RestingBP", "Cholesterol", "FastingBS",
                       "RestingECG", "MaxHR", "ExerciseAngina", "Oldpeak", "ST_Slope", "HeartDisease"]

            random.seed(101)

            rand_num_1_year = random.randint(10, 700)
            rand_num_6_months = random.randint(10, 700)
            rand_num_3_months = random.randint(10, 700)

            dataframe = self.createDataframe("FileModule/Trends/HeartFailure_data.csv")

            list = dataframe[dataframe.columns[:]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict1[headers[index]] = "one year"

                else:
                    dict1[headers[index]] = (list[rand_num_1_year])[index - 1]

            for index in range(0, len(headers)):
                if (index == 0):
                    dict2[headers[index]] = "six months"

                else:
                    dict2[headers[index]] = (
                        list[rand_num_6_months])[index - 1]

            for index in range(0, len(headers)):
                if (index == 0):
                    dict3[headers[index]] = "three months"

                else:
                    dict3[headers[index]] = (
                        list[rand_num_3_months])[index - 1]

        elif (self.__disease == "Stroke"):
            headers = ["Year", "sex", "age", "hypertension", "heart_disease", "ever_married", "work_type",
                       "Residence_type", "avg_glucose_level", "bmi", "smoking_status", "stroke"]

            random.seed(101)

            rand_num_1_year = random.randint(20300, 20600)
            rand_num_6_months = random.randint(20300, 20600)
            rand_num_3_months = random.randint(20300, 20600)

            dataframe = self.createDataframe("FileModule/Trends/stroke_data.csv")

            list = dataframe[dataframe.columns[:]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict1[headers[index]] = "one year"

                else:
                    dict1[headers[index]] = (list[rand_num_1_year])[index - 1]

            for index in range(0, len(headers)):
                if (index == 0):
                    dict2[headers[index]] = "six months"

                else:
                    dict2[headers[index]] = (
                        list[rand_num_6_months])[index - 1]

            for index in range(0, len(headers)):
                if (index == 0):
                    dict3[headers[index]] = "three months"

                else:
                    dict3[headers[index]] = (
                        list[rand_num_3_months])[index - 1]

        return tuple_dict


if __name__ == "__main__":
    t1 = Trends("Diabetes").readSampleAndGenerateFile()

    t2 = Trends("HeartFailure").readSampleAndGenerateFile()

    t3 = Trends("Stroke").readSampleAndGenerateFile()

    print(t1)

    print(t2)

<<<<<<< HEAD
    print(t3)
=======
    print(t3)
>>>>>>> 81d056541af1796818ce6ca0d0ff167d5d98a2fc
