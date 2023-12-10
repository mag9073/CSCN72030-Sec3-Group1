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


from FileModule.AuthenticationFile import *
from FileModule.FileSuperClass.File import *
from FileModule.AuthenticationFile.AuthenticationFile import *
from Authentication.AuthenticationModule import *


class TestAuthenticationFile(unittest.TestCase):
    # unit test for the readFromDoctorAuthenticatorFile() function
    def test_unit_1_readFromDoctorAuthenticatorFile(self):
        auth_file = AuthenticationFile()  # instantiate class
        # call readFromDoctorAuthenticatiorFile() funtion
        auth_file.readFromDoctorAuthenticatorFile("credentials.csv")
        expected = {'sberenji': 'berenjisaba01*',
                    'serb': 'erbsierra02*'}  # expected dictionary result
        actual = auth_file.getAuthDict()  # actual dictionary result

        # assert that actual and expected are the same
        self.assertEqual(expected, actual)

    # unit test for the setter and getter functions

    def test_unit_2_Setter_and_Getter(self):
        auth_file = AuthenticationFile()  # instantiate the class
        file_data = {'sberenji': 'berenjisaba01*',
                     'serb': 'erbsierra02*'}  # mock file data
        auth_file.setAuthDict(file_data)  # call setter function
        actual = auth_file.getAuthDict()  # actual is retrieved using getter
        expected = file_data  # expected is the original dictionary
        # assert that actual and expected are the same
        self.assertEqual(expected, actual)

    # integration test for File Module and Authentication Module

    def test_integration_with_Authentication_Module(self):
        auth_file = AuthenticationFile()  # instantiate the file module class
        file_data = {'sberenji': 'berenjisaba01*',
                     'serb': 'erbsierra02*'}  # mock file data
        auth_file.setAuthDict(file_data)  # call setter function
        retrieved_file_data = auth_file.getAuthDict()  # call getter function
        # insantiate Authentication module class
        authentication_module = Authentication()
        # use Authentication module setter to save data from File Module
        authentication_module.set_data_map(retrieved_file_data)
        # use authentication module getter to retrieve dara saved from File Module
        actual = authentication_module.get_data_map()
        expected = file_data
        # assert that actual and expected are the same
        self.assertEqual(actual, expected)


if __name__ == '__main__':
    unittest.main()
