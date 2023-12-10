import unittest
import sys
from pathlib import Path
import pandas as pd
from pandas.testing import assert_frame_equal


file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass


from KNNModule.KNNDiabetes.DiabetesKNNModule import *
from FileModule.DiseaseFile.DiseaseFile import DiseaseFile
from FileModule.FileSuperClass.File import File


class DiabetesIntegrationTest(unittest.TestCase):
    def test_readFromFile_returnmethod_from_FileModule(self):
        self.__filename = "PatientData.csv"

        expected_dataframe = pd.read_csv(self.__filename)


        f = File("PatientData.csv")
        d = DiseaseFile(f)

        actual_dataframe = d.readFromFile()


        assert_frame_equal(expected_dataframe, actual_dataframe)


if __name__ == "__main__":
    unittest.main()