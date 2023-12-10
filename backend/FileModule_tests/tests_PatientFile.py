import unittest
import pandas as pd


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


from FileModule.FileSuperClass.File import *
from FileModule.PatientFile.PatientFile import *

class TestDiseaseFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("PatientProfile.csv")
        p = PatientFile(f)
        actual = p.FileToDict()
        print(actual)
        expected = ({'Patient_Name': "Kathryn O'Rilley", 'DOB': '1970-03-12', 'Patient_ID': ' P125656', 'Phone': '000-000-1111', 'Email': 'rilleykath@example.com', 'Address': '200 King Street Toronto ON Canada', 'Allergies': 'Seafood'}, {'Patient_Name': 'Emily Johnson', 'DOB': 'Nov 06 1980', 'Patient_ID': 'P123456', 'Phone': '555-222-1111',
                    'Email': 'emily.j@example.com', 'Address': '300 Queen Street Waterloo ON Canada', 'Allergies': 'Penicillin'}, {'Patient_Name': 'Daniel Smith', 'DOB': 'Aug 02 1990', 'Patient_ID': 'P789012', 'Phone': '985-666-888', 'Email': 'daniel.s@example.com', 'Address': '456 Maple Avenue Kitchener ON Canada', 'Allergies': 'Peanut'})
        #expected = pd.DataFrame(expectedData)
        self.assertEqual(actual, expected)

        



if __name__ == '__main__':
    unittest.main()


