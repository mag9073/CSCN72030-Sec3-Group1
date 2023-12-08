import unittest
import numpy as np
from DiseaseFile.DiseaseFile import DiseaseFile
from FileSuperClass.File import File


class TestDiseaseFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("PatientData.csv")
        d = DiseaseFile(f)
        actual = d.readFromFile()
        expected = np.array([[8.00e+00, 1.79e+02, 7.20e+01, 4.20e+01, 1.30e+02, 3.27e+01, 7.19e-01, 3.60e+01],[4.00e+00, 1.48e+02, 6.00e+01, 2.70e+01, 3.18e+02, 3.09e+01, 1.50e-01, 2.90e+01]])
        self.assertTrue(np.array_equal(actual, expected))
        


    
    def test_integration_2_saveToFile(self):
        f = File("PatientData.csv")
        d = DiseaseFile(f)
        expected = np.array([[8.00e+00, 1.79e+02, 7.20e+01, 4.20e+01, 1.30e+02, 3.27e+01, 7.19e-01, 3.60e+01],[4.00e+00, 1.48e+02, 6.00e+01, 2.70e+01, 3.18e+02, 3.09e+01, 1.50e-01, 2.90e+01]]) 
        d.saveToFile("SavedPatientData.csv", expected)
        actual = d.readFromFile()
        self.assertTrue(np.array_equal(actual, expected))



if __name__ == '__main__':
    unittest.main()


