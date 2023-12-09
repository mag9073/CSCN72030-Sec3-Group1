import unittest
from FileSuperClass.File import File


class TestFileSuperClass(unittest.TestCase):

    def test_integration_constructor_setter_getter(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("PatientData.csv")
        expected = "NewFile.csv"
        f.setFilename(expected)
        actual = f.getFilename()
        self.assertTrue(actual, expected)
        



if __name__ == '__main__':
    unittest.main()


