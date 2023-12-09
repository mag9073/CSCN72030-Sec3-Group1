import unittest
import pandas as pd
from FileSuperClass.File import File
from Trends.Trends import Trends


class TestTrendsFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("HeartFailureSample.csv")
        t = Trends(f)
        actual = t.createDataframe("HeartFailureSample.csv")
        print(actual)
        expectedData = {            
            "Year": ["one year", "six months", "three months"],
            "Age": [55.0, 54.0, 56.0],
            "Sex": [0.0, 0.0, 0.0],
            "ChestPainType": [-1.0, 1.0, 1.0],
            "RestingBP": [130.0, 125.0, 130.0],
            "Cholesterol": [262.0, 216.0, 283.0],
            "FastingBS": [0.0, 0.0, 1.0],
            "RestingECG": [-1.0, -1.0, 1.0],
            "MaxHR": [155.0, 140.0, 103.0],
            "ExerciseAngina": [0.0, 0.0, 1.0],
            "Oldpeak": [0.0, 0.0, 1.6],
            "ST_Slope": [-1.0, 0.0, 1.0],
            "HeartDisease": [0.0, 1.0, 1.0],
        }
        expected = pd.DataFrame(expectedData)
        print(expected)
        pd.testing.assert_frame_equal(actual, expected)
        




if __name__ == '__main__':
    unittest.main()


