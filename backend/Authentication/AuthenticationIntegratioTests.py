import unittest
import sys
from pathlib import Path

# Add the project root to the sys.path
file = Path(__file__).resolve()
# Go up two levels to reach the project root
parent, root = file.parent, file.parents[2]
sys.path.append(str(root))

# Import the modules and classes
try:
    from backend.FileModule.AuthenticationFile.AuthenticationFile import AuthenticationFile
    from backend.FileModule.FileSuperClass.File import File

    from backend.InputModule.Input_Module_Python import Input
    from backend.Authentication.AuthenticationModule import Authentication
except ModuleNotFoundError as e:
    print(f"Error importing modules: {e}")

# Remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:
    pass


# Following you can find the test cases for the integration testing between the Authentication, Input and File module
# Author: Saba Berenji


class IntegrationTest (unittest.TestCase):
    # Test #1: This test case tests the '__init__' constructor of the Authentication class to verify that the Authentication object can use its constructor to store the user entered username
    def test_auth_constructur_username(self):
        # Arrange
        self.input1 = Input()  # instantiating an Input object
        self.input1.set_username("doctor1")
        # this is to resemble the process of getting the username from the user since the user prompt function cannot be called from the Input module during the test
        username_input = self.input1.get_username()

        # initailizing the authentication object using its constructor
        self.auth1 = Authentication(username_input)
        # Act
        username_returned = self.auth1.get_username()

        # Assert
        self.assertEqual(username_returned, username_input)

    # Test #2: This test case tests the '__init__' constructor of the Authentication class to verify that the Authentication object can use its constructor to store the user entered password
    def test_auth_constructur_password(self):
        # Arrange
        self.input2 = Input()
        # we again includ the username since we need it for the constructor to be able to initialize the password attribute with password_input
        self.input2.set_username("doctor1")
        self.input2.set_password("Doctorpassword1")
        # this is to resemble the process of getting the password from the user since the user prompt function cannot be called from the Input module during the test
        username_input = self.input2.get_username()
        password_input = self.input2.get_password()

        # initailizing the authentication object using its constructor
        self.auth2 = Authentication(username_input, password_input)

        # Act
        password_returned = self.auth2.get_password()

        # Assert
        self.assertEqual(password_returned, password_input)

    # Test #3: This test case tests the '__init__' constructor of the Authentication class to verify that the Authentication object can use its constructor to store the dictionary credentials returned from the file module

    def test_auth_constructur_credentials(self):
        # Arrange
        self.input3 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input3.set_username("serb")
        self.input3.set_password("erbsierra02*")
        username_input = self.input3.get_username()
        password_input = self.input3.get_password()

        # creating a File object
        self.file3 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")  # should be replaced with the directory that the project is stored in
        user_credentials = (
            self.file3).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth3 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the log_in function and save the result
        credentials_returned = self.auth3.get_data_map()

        # Assert
        self.assertEqual(user_credentials, credentials_returned)

    # Test #4: This test case tests the username setter of the Authentication class to verify that the Authentication object can use its setter to store the user entered username

    def test_auth_setter_username(self):
        # Arrange
        self.input4 = Input()
        self.input4.set_username("doctor1")
        # this is to resemble the process of getting the username from the user since the user prompt function cannot be called from the Input module during the test
        username_input = self.input4.get_username()

        # Act
        # initailizing the authentication object using its constructor
        self.auth4 = Authentication()
        self.auth4.set_username(username_input)

        # Assert
        username_returned = self.auth4.get_username()
        self.assertEqual(username_returned, username_input)

    # Test #5: This test case tests the password setter of the Authentication class to verify that the Authentication object can use its setter to store the user entered password

    def test_auth_setter_password(self):
        # Arrange
        self.input5 = Input()
        # we again includ the username since we need it for the constructor to be able to initialize the password attribute with password_input
        self.input5.set_username("doctor1")
        self.input5.set_password("Doctorpassword1")
        # this is to resemble the process of getting the password from the user since the user prompt function cannot be called from the Input module during the test
        password_input = self.input5.get_password()

        # Act
        # initailizing the authentication object using its constructor
        self.auth5 = Authentication()
        self.auth5.set_password(password_input)

        # Assert
        password_returned = self.auth5.get_password()
        self.assertEqual(password_returned, password_input)

    # Test #6: This test case tests the data map setter of the Authentication class to verify that the Authentication object can use its setter to store the dictionary credentials returned from the file module

    def test_auth_setter_credentials(self):
        # Arrange

        # creating a File object
        self.file6 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")  # should be replaced with the directory that the project is stored in
        user_credentials = (
            self.file6).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth6 = Authentication()
        self.auth6.set_data_map(user_credentials)

        # Act
        # call the get_data_map function and save the result
        credentials_returned = self.auth6.get_data_map()

        # Assert
        self.assertEqual(user_credentials, credentials_returned)

  # Test #7: This test case tests the authenticate_username method of the Authentication class to verify that this method will return False if the entered username by the user does not exist in the authentication file

    def test_authenticatie_username_False(self):

        # Arrange
        self.input7 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input7.set_username("wrongusername")
        self.input7.set_password("1111111*")
        username_input = self.input7.get_username()
        password_input = self.input7.get_password()

        # creating a File object
        self.file7 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")
        user_credentials = (
            self.file7).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth7 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the authenticate_username function and save the result
        actual_result = self.auth7.authenticate_username()

        # Assert
        expected_result = False
        self.assertEqual(expected_result, actual_result)

    # Test #8: This test case tests the authenticate_username method of the Authentication class to verify that this method will return True if the entered username by the user does exist in the authentication file and is valid

    def test_authenticatie_username_True(self):

        # Arrange
        self.input8 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input8.set_username("serb")
        self.input8.set_password("1111111*")
        username_input = self.input8.get_username()
        password_input = self.input8.get_password()

        # creating a File object
        self.file8 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")
        user_credentials = (
            self.file8).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth8 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the authenticate_username function and save the result
        actual_result = self.auth8.authenticate_username()

        # Assert
        expected_result = True
        self.assertEqual(expected_result, actual_result)

    # Test #9: This test case tests the authenticate_password method of the Authentication class to verify that this method will return False if the entered password by the user does not match the username

    def test_authenticatie_password_False(self):

        # Arrange
        self.input9 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input9.set_username("serb")
        self.input9.set_password("1111111*")
        username_input = self.input9.get_username()
        password_input = self.input9.get_password()

        # creating a File object
        self.file9 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")
        user_credentials = (
            self.file9).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth9 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the authenticate_password function and save the result
        actual_result = self.auth9.authenticate_password()

        # Assert
        expected_result = False
        self.assertEqual(expected_result, actual_result)

    # Test #10: This test case tests the authenticate_password method of the Authentication class to verify that this method will return True if the entered password by the user matches the username

    def test_authenticatie_password_True(self):

        # Arrange
        self.input9 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input9.set_username("serb")
        self.input9.set_password("erbsierra02*")
        username_input = self.input9.get_username()
        password_input = self.input9.get_password()

        # creating a File object
        self.file9 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")
        user_credentials = (
            self.file9).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth9 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the authenticate_password function and save the result
        actual_result = self.auth9.authenticate_password()

        # Assert
        expected_result = True
        self.assertEqual(expected_result, actual_result)

    # Test #11: This test case verifies that the log_in funciton will return True if the the "authenticate_username"
    # and the "authenticate_password" functions return True

    def test_log_in(self):
        # Arrange
        self.input11 = Input()
        # intializing the username and password attributes of the Input class (resembeling the values entered by the user)
        self.input11.set_username("serb")
        self.input11.set_password("erbsierra02*")
        username_input = self.input11.get_username()
        password_input = self.input11.get_password()

        # creating a File object
        self.file6 = AuthenticationFile()
        f = File(
            "D:/Group1_Project3/CSCN72030-Sec3-Group1/backend/FileModule/AuthenticationFile/credentials.csv")
        user_credentials = (
            self.file6).readFromDoctorAuthenticatorFile(f.getFilename())  # getting the content of the credentials.csv as a dictionary

        # intantiating and initailizing the authentication object using its constructor
        # and the returned values from the Input and File modules
        self.auth11 = Authentication(
            username_input, password_input, user_credentials)

        # Act
        # call the log_in function and save the result
        actual_result = self.auth11.log_in()

        # Assert
        expected_result = True
        self.assertEqual(expected_result, actual_result)


if __name__ == '__main__':
    unittest.main()
