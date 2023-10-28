import sys
from PyQt6 import QtWidgets
from PyQt6.QtWidgets import QDialog, QLineEdit
from PyQt6.uic import loadUi

'''
CSCN72030 F23 / Project III
Professor: Ahmed Salamah
BY: Sudhan Dahake - Hangsihak Sin - Sierra Erb - Michelle Novar - Saba Berenji
DATE: September, 2023
DESCRIPTION: Project III - main.py file
'''


# First Screen - Login Screen - class Inheriting from QDialog class. 
class LoginScreen(QDialog):
    def __init__(self, app):
        super(LoginScreen, self).__init__()

        # Load login interface
        loadUi("./interfaces/login.ui", self)    

        # Click functions when pressing buttons.
        self.passwordfield.setEchoMode(QLineEdit.EchoMode.Password)
        self.login.clicked.connect(self.loginButtonClicked)

        # Store app instance for later use
        self.app = app

        # Dummy user info
        self.expected_username = "hsihak"
        self.expected_password = "123456789"

    
    def loginButtonClicked(self):

        # Get entered user info
        username = self.emailfield.text()
        password = self.passwordfield.text()

        # Display an error message if user attempts to click on Login button while the field is empty
        if len(username) == 0 or len(password) == 0:
            self.error.setText("Please input all fields.")
        
        # This statement autheticate username and password whether the user exists.
            # Actual should be calling authetication backend module to verify
        else:
            if self.expected_username == username and self.expected_password == password:

                # Create Dashboard instance
                dashboardScreen = DashboardScreen(self.app)

                # Add dashboard screen to the widget stack
                widget.addWidget(dashboardScreen)

                # Advance widget to the next screen
                widget.setCurrentIndex(widget.currentIndex() + 1)

            else:
                # Display an error message for invalid user info
                self.error.setText("Invalid username or password")


# Encapsulate all the code to only run in the main program
if __name__ == "__main__":
    # Create QApplication instance to manage the whole application GUI
    app = QtWidgets.QApplication(sys.argv)

    # Create Login Screen instance which is a QDialog for the login screen
    login = LoginScreen(app)

    # Create a QStackWidget to manage multiple screens
    widget = QtWidgets.QStackedWidget()

    # Set the application name to "RiskAlert"
    app.setApplicationDisplayName("RiskAlert")

    # Add login screen to the widget stack
    widget.addWidget(login)

    # Set the app widget fixed height and width 
    widget.setFixedHeight(800)
    widget.setFixedWidth(1200)

    # Show the widget on the screen
    widget.show()
    
    # Error handlings
    try:
        sys.exit(app.exec())
    except SystemExit:
        print('Closing Window...')

