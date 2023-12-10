import unittest


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


class TestFileSuperClass(unittest.TestCase):

    def test_integration_constructor_setter_getter(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("PatientData.csv")
        expected = "NewFile.csv"
        f.setFilename(expected)
        actual = f.getFilename()
        self.assertTrue(actual, expected)
        



if __name__ == '__main__':
    unittest.main()


