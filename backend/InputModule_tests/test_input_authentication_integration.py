import pytest

import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass

from InputModule.Input_Module_Python import Input
from AuthenticationModule.AuthenticationModule import Authentication

import unittest

class MockUI: 
    def __init__(self):
        self._username = None
        self._password = None

    def set_credentials(self, username, password):
        self._username = username
        self._password = password

    def get_username_from_user(self):
        return self._username

    def get_password_from_user(self):
        return self._password

class TestInput(unittest.TestCase):

    def test_req_sys_02k(self):
        # Arrange
        self.input_module = Input()
        self.ui_module = MockUI()
        
        mock_user_username = "serb123456"
        
        # Act
        self.input_module.set_username(mock_user_username)
        self.ui_module.set_credentials(mock_user_username, "")

        actual_username_from_input = self.input_module.get_username()

        # Assert
        self.assertEqual(actual_username_from_input, mock_user_username)

    def test_req_sys_02l(self):
        # Arrange
        self.input_module = Input()
        self.ui_module = MockUI()

        mock_user_password = "654321serb"

        # Act
        self.ui_module.set_credentials("", mock_user_password)
        self.input_module.set_password(mock_user_password)

        actual_username_from_input = self.input_module.get_password()

        # Assert
        self.assertEqual(actual_username_from_input, mock_user_password)

    def test_req_sys_02m(self):
        # Arrange
        self.input_module = Input()

        self.auth_module = Authentication()

        self.ui_module = MockUI()

        mock_user_username = "serb123456"

        # Act
        self.ui_module.set_credentials(mock_user_username, "")
        username_from_ui = self.ui_module.get_username_from_user()

        self.input_module.set_username(username_from_ui)
        username_from_input = self.input_module.get_username()

        self.auth_module.set_username(username_from_input)
        actual_username_from_auth = self.auth_module.get_username()

        # Assert
        self.assertEqual(actual_username_from_auth, mock_user_username)

    def test_req_sys_02n(self):
        # Arrange
        self.input_module = Input()

        self.auth_module = Authentication()

        self.ui_module = MockUI()

        mock_user_password = "654321serb"

        # Act
        self.ui_module.set_credentials("", mock_user_password)

        password_from_ui = self.ui_module.get_password_from_user()

        self.input_module.set_password(password_from_ui)

        password_from_input = self.input_module.get_password()

        self.auth_module.set_password(password_from_input)

        actual_password_from_auth = self.auth_module.get_password()

        # Assert
        self.assertEqual(actual_password_from_auth, mock_user_password)

    def test_req_sys_02o(self):
        # Arrange
        self.ui_module = MockUI()
        self.input_module = Input()
        self.auth_module = Authentication()

        # Act 
        mock_user_username = "serb123456"
        mock_user_password = "654321serb"

        self.ui_module.set_credentials(mock_user_username, mock_user_password)

        username_from_ui = self.ui_module.get_username_from_user()
        password_from_ui = self.ui_module.get_password_from_user()

        self.input_module.set_username(username_from_ui)
        self.input_module.set_password(password_from_ui)

        actual_username_from_input = self.input_module.get_username()
        actual_password_from_input = self.input_module.get_password()

        self.auth_module.set_username(actual_username_from_input)
        self.auth_module.set_password(actual_password_from_input)

        # Assert 
        self.assertEqual(actual_username_from_input, username_from_ui)
        self.assertEqual(actual_password_from_input, password_from_ui)

if __name__ == '__main__':
    unittest.main()