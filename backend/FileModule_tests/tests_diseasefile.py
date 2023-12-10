import unittest
import numpy as np


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

from FileModule.DiseaseFile.DiseaseFile import *
from FileModule.FileSuperClass.File import *

class TestDiseaseFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("DiabetesPatientData.csv")
        d = DiseaseFile(f)
        actual = d.readFromFile()

        expected = pd.read_csv(f.getFilename())

        self.assertTrue(np.array_equal(actual, expected))
        


    
    def test_integration_2_saveToFile(self):
        f = File("DiabetesPatientData.csv")
        d = DiseaseFile(f)
        expected = pd.read_csv(f.getFilename())
        d.saveToFile("SavedPatientData.csv", expected)
        actual = d.readFromFile()
        self.assertTrue(np.array_equal(actual, expected))



if __name__ == '__main__':
    unittest.main()


