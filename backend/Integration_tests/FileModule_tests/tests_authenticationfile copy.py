import unittest
from AuthenticationFile.AuthenticationFile import AuthenticationFile
from AuthenticationModule import Authentication
from FileSuperClass.File import File
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


class TestAuthenticationFile(unittest.TestCase):
    def test_unit_1_readFromDoctorAuthenticatorFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        auth_file = AuthenticationFile() #instantiate class
        auth_file.readFromDoctorAuthenticatorFile("credentials.csv") #call readFromDoctorAuthenticatiorFile() funtion
        expected = {'sberenji': 'berenjisaba01*', 'serb': 'erbsierra02*'} #expected dictionary result
        actual = auth_file.getAuthDict() #actual dictionary result
        self.assertEqual(expected, actual) #assert that actual and expected are the same

    

    def test_unit_2_Setter_and_Getter(self): #unit test for the setter and getter functions
        auth_file = AuthenticationFile() #instantiate the class
        file_data = {'sberenji': 'berenjisaba01*', 'serb': 'erbsierra02*'} #mock file data
        auth_file.setAuthDict(file_data) #call setter function
        actual = auth_file.getAuthDict() #actual is retrieved using getter
        expected = file_data #expected is the original dictionary
        self.assertEqual(expected, actual) #assert that actual and expected are the same



    def test_integration_with_Authentication_Module(self): #integration test for File Module and Authentication Module
        auth_file = AuthenticationFile() #instantiate the file module class
        file_data = {'sberenji': 'berenjisaba01*', 'serb': 'erbsierra02*'} #mock file data
        auth_file.setAuthDict(file_data) #call setter function
        retrieved_file_data = auth_file.getAuthDict() #call getter function
        authentication_module = Authentication() #insantiate Authentication module class
        authentication_module.set_data_map(retrieved_file_data) #use Authentication module setter to save data from File Module
        actual = authentication_module.get_data_map() #use authentication module getter to retrieve dara saved from File Module
        expected = file_data
        self.assertEqual(actual, expected) #assert that actual and expected are the same



if __name__ == '__main__':
    unittest.main()
