import unittest
import pandas as pd
from FileSuperClass.File import File
from PatientFile.PatientFile import PatientFile


class TestDiseaseFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("PatientProfile.csv")
        p = PatientFile(f)
        actual = p.FileToDict()
        print(actual)
        expected = {'Patient_Name': ["Kathryn O'Rilley", 'Emily Johnson', 'Daniel Smith'], 'DOB': ['1970-03-12', 'Nov 06 1980', 'Aug 02 1990'], 'Patient_ID': [' P125656', 'P123456', 'P789012'], 'Phone': ['000-000-1111', '555-222-1111', '985-666-888'], 'Email': ['rilleykath@example.com', 'emily.j@example.com', 'daniel.s@example.com'], 'Address': ['200 King Street Toronto ON Canada', '300 Queen Street Waterloo ON Canada', '456 Maple Avenue Kitchener ON Canada'], 'Allergies': ['Seafood', 'Penicillin', "Eggs"]}
        #expected = pd.DataFrame(expectedData)
        print(expected)

        self.assertEqual(actual, expected)

        



if __name__ == '__main__':
    unittest.main()


