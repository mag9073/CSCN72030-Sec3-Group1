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
        if (self.__disease == "Diabetes"):
            dict = {}
            headers = ["Year", "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
                        "Insulin", "BMI", "DiabetesPedigreeFunction", "Age", "Outcome"]

            random.seed(101)

            rand_num_1_year = random.randint(5, 390)
            rand_num_6_months = random.randint(5, 390)
            rand_num_3_months = random.randint(5, 390)

            dataframe = self.createDataframe("Diabetes_data.csv")

            list = dataframe[dataframe.columns[ : ]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "one year"

                else:
                    dict[headers[index]] = (list[rand_num_1_year])[index - 1]

                df = pd.DataFrame([dict])

                df.to_csv("DiabetesSample.csv", index=False)

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "six months"

                else:
                    dict[headers[index]] = (list[rand_num_6_months])[index - 1]

            with open("DiabetesSample.csv", "a") as my_file:
                string = ""
                
                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)



            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "three months"

                else:
                    dict[headers[index]] = (list[rand_num_3_months])[index - 1]

            with open("DiabetesSample.csv", "a") as my_file:
                string = ""

                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)




        elif (self.__disease == "HeartFailure"):
            dict = {}
            headers = ["Year","Age", "Sex", "ChestPainType", "RestingBP", "Cholesterol", "FastingBS",
                       "RestingECG", "MaxHR", "ExerciseAngina", "Oldpeak", "ST_Slope", "HeartDisease"]

            random.seed(101)

            rand_num_1_year = random.randint(10, 700)
            rand_num_6_months = random.randint(10, 700)
            rand_num_3_months = random.randint(10, 700)

            dataframe = self.createDataframe("HeartFailure_data.csv")

            list = dataframe[dataframe.columns[:]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "one year"

                else:    
                    dict[headers[index]] = (list[rand_num_1_year])[index - 1]

                df = pd.DataFrame([dict])

                df.to_csv("HeartFailureSample.csv", index=False)

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "six months"

                else:
                    dict[headers[index]] = (list[rand_num_6_months])[index - 1]

            with open("HeartFailureSample.csv", "a") as my_file:
                string = ""

                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "three months"

                else:
                    dict[headers[index]] = (list[rand_num_3_months])[index - 1]

            with open("HeartFailureSample.csv", "a") as my_file:
                string = ""

                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)

        elif (self.__disease == "Stroke"):
            dict = {}
            headers = ["Year", "sex", "age", "hypertension", "heart_disease", "ever_married", "work_type",
                       "Residence_type", "avg_glucose_level", "bmi", "smoking_status", "stroke"]

            random.seed(101)

            rand_num_1_year = random.randint(20300, 20600)
            rand_num_6_months = random.randint(20300, 20600)
            rand_num_3_months = random.randint(20300, 20600)

            dataframe = self.createDataframe("stroke_data.csv")

            list = dataframe[dataframe.columns[:]].values

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "one year"

                else:
                    dict[headers[index]] = (list[rand_num_1_year])[index - 1]

                df = pd.DataFrame([dict])

                df.to_csv("StrokeSample.csv", index=False)

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "six months"

                else:
                    dict[headers[index]] = (list[rand_num_6_months])[index - 1]

            with open("StrokeSample.csv", "a") as my_file:
                string = ""

                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)

            for index in range(0, len(headers)):
                if (index == 0):
                    dict[headers[index]] = "three months"

                else:
                    dict[headers[index]] = (list[rand_num_3_months])[index - 1]

            with open("StrokeSample.csv", "a") as my_file:
                string = ""

                for element in dict.values():
                    if (string == ""):
                        string = f"{element}"

                    else:
                        string = f"{string},{element}"

                string = f"{string}\n"

                my_file.write(string)
        


if __name__ == "__main__":
    t1 = Trends("Diabetes").readSampleAndGenerateFile()

    t2 = Trends("HeartFailure").readSampleAndGenerateFile()

    t3 = Trends("Stroke").readSampleAndGenerateFile()