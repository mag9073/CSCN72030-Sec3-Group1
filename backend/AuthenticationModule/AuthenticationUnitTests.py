from AuthenticationModule import Authentication
import unittest

# Following are the unit tests for the authentication module.
# Author: Saba Berenji


class TestAuthenication(unittest.TestCase):

    # Test #1: This test case tests the 'set_username' setter of the Authentication class
    def test_set_username(self):
        # Arrange
        self.auth1 = Authentication()
        expected_username = "doctor1"

        # Act
        self.auth1.set_username(expected_username)

        # Assert
        actual_username = self.auth1.get_username()
        self.assertEqual(actual_username, expected_username)

    # Test #2: This test case tests the 'set_password' setter of the Authentication class
    def test_set_password(self):
        # Arrange
        self.auth2 = Authentication()
        expected_pasword = "doctorpassword"
        self.auth2.set_password(expected_pasword)

        # Act
        actual_password = self.auth2.get_password()

        # Assert
        self.assertEqual(actual_password, expected_pasword)

    # Test #3: This test case tests the 'set_file_data' setter of the Authentication class

    def test_set_file_data(self):
        # Arrange
        self.auth3 = Authentication()
        credentials = {"doctor": "DoctorPassword"}
        self.auth3.set_data_map(credentials)

        # Act
        actual_credentials = self.auth3.get_data_map()

        # Assert
        self.assertEqual(actual_credentials, credentials)

    # Test #4: This test case tests the 'authentication_username' method of the Authentication class. The authenticate_username should return True and the test should pass.

    def test_authenticate_username_True(self):
        # Arrange
        self.auth4 = Authentication()
        self.auth4.set_username("doctor3")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor4": "DoctorPassword4"}
        self.auth4.set_data_map(credentials)

        # Act
        actual_result = self.auth4.authenticate_username()

        # Assert
        expected_result = True

        self.assertEqual(actual_result, expected_result)

    # Test #5: This test case tests the 'authentication_username' method of the Authentication class. The authenticate_username should return False and the test should pass.
    def test_authenticate_username_False(self):
        # Arrange
        self.auth5 = Authentication()
        self.auth5.set_username("doctor5")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor4": "DoctorPassword4"}
        self.auth5.set_data_map(credentials)

        # Act
        actual_result = self.auth5.authenticate_username()

        # Assert
        expected_result = False

        self.assertEqual(actual_result, expected_result)

   # Test #6: This test case tests the 'authenticate_password' method of the Authentication class. The authenticate_password should return True and the test should pass.

    def test_authenticate_password_True(self):
        # Arrange
        self.auth6 = Authentication()
        self.auth6.set_username("doctor5")
        self.auth6.set_password("Doctor5Password")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor5": "Doctor5Password"}
        self.auth6.set_data_map(credentials)

        # Act
        actual_result = self.auth6.authenticate_password()

        # Assert
        expected_result = True

        self.assertEqual(actual_result, expected_result)

   # Test #7: This test case tests the 'authenticate_password' method of the Authentication class. The authenticate_password should return False and the test should pass.

    def test_authenticate_password_False(self):
        # Arrange
        self.auth7 = Authentication()
        self.auth7.set_username("doctor5")
        self.auth7.set_password("wrongpassword")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor5": "Doctor5Password"}
        self.auth7.set_data_map(credentials)

        # Act
        actual_result = self.auth7.authenticate_password()

        # Assert
        expected_result = False

        self.assertEqual(actual_result, expected_result)

   # Test #8: This test case tests the 'log_in' method of the Authentication class. The log_in should return False since the username given is not in the file_data. The test should pass

    def test_log_in_False_username(self):
        # Arrange
        self.auth8 = Authentication()
        self.auth8.set_username("doctor68")
        self.auth8.set_password("correctPassword")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor5": "Doctor5Password", "doctor6": "DoctorPassword6"}
        self.auth8.set_data_map(credentials)

        # Act
        actual_result = self.auth8.log_in()

        # Assert
        expected_result = False

        self.assertEqual(actual_result, expected_result)

  # Test #9: This test case tests the 'log_in' method of the Authentication class. The log_in should return False since the password given does not match the username. The test should pass

    def test_log_in_False_password(self):
        # Arrange
        self.auth9 = Authentication()
        self.auth9.set_username("doctor6")
        self.auth9.set_password("wrongPassword")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor5": "Doctor5Password", "doctor6": "DoctorPassword6"}
        self.auth9.set_data_map(credentials)

        # Act
        actual_result = self.auth9.log_in()

        # Assert
        expected_result = False

        self.assertEqual(actual_result, expected_result)

 # Test #10: This test case tests the 'log_in' method of the Authentication class. The log_in should return True since the user is in file_data and the password given does match the username. The test should pass

    def test_log_in_True(self):
        # Arrange
        self.auth9 = Authentication()
        self.auth9.set_username("doctor6")
        self.auth9.set_password("DoctorPassword6")
        credentials = {"doctor3": "DoctorPassword3",
                       "doctor5": "Doctor5Password", "doctor6": "DoctorPassword6"}
        self.auth9.set_data_map(credentials)

        # Act
        actual_result = self.auth9.log_in()

        # Assert
        expected_result = True

        self.assertEqual(actual_result, expected_result)


if __name__ == '__main__':
    unittest.main()
