import sys
from PyQt6 import QtWidgets, QtGui
from PyQt6.QtWidgets import QDialog, QLineEdit, QVBoxLayout, QLabel
from PyQt6.uic import loadUi
from PyQt6.QtGui import QFont
from PyQt6.QtCore import Qt
import re

from custom_components.py_toggle import PyToggle

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

# Second Screen - Dashboard Screen - class inheriting from QDialog class


class DashboardScreen(QDialog):
    def __init__(self, app):
        super(DashboardScreen, self).__init__()

        # Load dashboard interface
        loadUi("./interfaces/dashboard.ui", self)    # Loading ui

        # Connect settings button 'clicked' signal to the setting method
        self.settings_button.clicked.connect(self.settingsButtonClicked)

        # Store the app instance for later use
        self.app = app

    def settingsButtonClicked(self):

        # Create Settings Screen instance
        settingsScreen = SettingsScreen(
            self.app, dashboard_bgwidget=self.parentWidget())

        print(self.parentWidget())

        # Add settings screen to the widget stack
        widget.addWidget(settingsScreen)

        # Advance to the next screen (settings screen)
        widget.setCurrentIndex(widget.currentIndex() + 1)


"""
The following code is the Settings class by Saba Berenji which was initially going to be used for the implementation of the 
Settings interface but will not be used anymore due to the change of frontend framework from PyQy to React
"""


class SettingsScreen(QDialog):
    def __init__(self):
        super().__init__()

        loadUi("settings.ui", self)
        self.connectingToFunctions()

    def connectingToFunctions(self):
        # connecting the LightModeButton button to its associated light_mode function
        self.LightModeButton.toggled.connect(self.light_mode)
        # connecting the DarkModeButton button to its associated dark_mode function
        self.DarkModeButton.toggled.connect(self.dark_mode)
        # Return back to Main Page
        self.backButton.clicked.connect(self.back_to_main)

        self.spinBox.valueChanged.connect(self.change_font_size)

    def light_mode(self):
        # checking to see if the LightModeButton is selected or not. If selected, the stylesheet will be set to the arguments passed to it
        if self.LightModeButton.isChecked():
            self.bgwidget.setStyleSheet("QWidget {background-color: #D4D6CF;}"
                                        "QRadioButton { color: #000000; } "
                                        )

            # setting the color of the labels in the light mode to black
            for label in self.bgwidget.findChildren(QLabel):
                label.setStyleSheet("color: #000000;")
            # this line is to set the size of the greet_message_3 label to 16 in order to avoid the change of font size when changing modes
            self.greet_message_3.setStyleSheet(
                "font: 16pt 'MS Shell Dlg 2'; color: #000000")

    def dark_mode(self):
        # checking to see if the DarkModeButton is selected or not. If selected, the stylesheet will be set to the arguments passed to it
        if self.DarkModeButton.isChecked():
            self.bgwidget.setStyleSheet("QWidget {background-color: #333333;}"
                                        "QRadioButton { color: #ffffff; } "
                                        "QPushButton { color: #ffffff; }")

            for label in self.bgwidget.findChildren(QLabel):
                label.setStyleSheet("color: #FFFFFF")
            # this line is to set the size of the greet_message_3 label to 16 in order to avoid the change of font size when changing modes
            self.greet_message_3.setStyleSheet(
                "font: 16pt; color: #FFFFFF")

    def back_to_main(self):

        widget.setCurrentIndex(widget.currentIndex() - 1)

    size = max(12, 36)

    def change_font_size(self, size):
        # set the range of the font size from 12 to 36

        for label in self.bgwidget.findChildren(QLabel):
            font = QFont("MS Shell Dlg 2")
            font.setPointSize(size)
            label.setFont(font)


"""
# Second subscreen - Settings - class inheriting from QDialog class
class SettingsScreen(QDialog):
    def __init__(self, app, dashboard_bgwidget):
        super(SettingsScreen, self).__init__()

        loadUi("settings.ui", self)      # Loading ui

        self.app = app

        self.selected_color = "default"

        self.setting_bgwidget = self.color_dropmenu.parentWidget()
        self.dashboard_bgwidget = dashboard_bgwidget

        self.back_button.clicked.connect(
            self.backToMain)   # Return back to Main Page
        # self.color_dropmenu.currentTextChanged.connect(self.changeBackgroundColor)

        # # Add colors to dropdown menu for background change
        # self.color_dropmenu.addItem("default")
        # self.color_dropmenu.addItem("Grey")
        # self.color_dropmenu.addItem("Pink")

        # Create layout
        self.layout = QVBoxLayout()

        # Add Theme Toggle
        self.toggle = PyToggle()

        # Set font size slider range and steps
        self.fontsize_adjuster.setRange(0, 2)
        self.fontsize_adjuster.setSingleStep(1)
        self.fontsize_adjuster.setValue(1)

        self.fontsize_adjuster.valueChanged.connect(self.sliderValueChanged)

        # Create a layout for your SettingScreen and add the PyToggle
        self.layout.addWidget(self.toggle)
        # Add other widgets to the layout as needed

        # Set the layout for the SettingScreen
        self.setLayout(self.layout)

        self.layout.setAlignment(Qt.AlignmentFlag.AlignCenter)

    # Connect the toggle to the background color change
        self.toggle.stateChanged.connect(self.handleToggleState)

    def backToMain(self):
        widget.setCurrentIndex(widget.currentIndex() - 1)

    # def changeBackgroundColor(self):
    #     selected_color = self.color_dropmenu.currentText()
    #     self.selected_color = selected_color
    #     if selected_color == "default":
    #         self.change("purple")
    #     elif selected_color == "Grey":
    #         self.change("grey")
    #     elif selected_color == "Pink":
    #         self.change("pink")

    def change(self, color):

        # Change background color to different widgets
        self.setting_bgwidget.setStyleSheet(f"background-color: {color};")
        self.dashboard_bgwidget.setStyleSheet(f"background-color: {color};")
        print(f"You changed to {color}")

    def sliderValueChanged(self):
        slider_value = self.fontsize_adjuster.value()

        # Map slider values to positions
        position_mapping = {
            0: 10,
            1: 12,
            2: 14
        }

        if slider_value in position_mapping:
            font_size = position_mapping[slider_value]
        else:
            font_size = 12  # Default font size

        font = QFont("Arial", font_size)

        for index in range(widget.count()):
            current_widget = widget.widget(index)
            for label in current_widget.findChildren(QtWidgets.QLabel):
                label.setFont(font)

    # def toggleBackgroundColor(self):
    #     if self.toggle.isChecked():
    #         # Change the background color to a different color when the toggle is checked
    #         self.change("lightblue")
    #     else:
    #         # Change the background color back to the default when the toggle is unchecked
    #         self.change(self.selected_color)

    #     print(f"Toggle is checked: {self.toggle.isChecked()}")

    def handleToggleState(self, state):
        print(f"Toggle state changed to {state}")

        label_palette = QtGui.QPalette()

        # Change the background color based on the state
        if state:  # Toggle is checked
            self.change("#000000")  # Change background color to black

            # Change the text color to white for the background widget
            self.setting_bgwidget.setStyleSheet("color: #FFFFFF;")
            label_palette.setColor(
                QtGui.QPalette.ColorRole.WindowText, QtGui.QColor("white"))
        else:  # Toggle is unchecked
            # Change background color back to the default
            self.change("#D4D6CF")

            # Change the text color to the original color for the background widget
            self.setting_bgwidget.setStyleSheet("color: #000000;")

        # Apply the background widget's text color style to all labels in the app
        label_style = self.setting_bgwidget.styleSheet()
        for index in range(widget.count()):
            current_widget = widget.widget(index)
            for label in current_widget.findChildren(QtWidgets.QLabel):
                current_style = label.styleSheet()
                font_size_match = re.search(
                    r'font-size:\s*(\d+)\s*px', current_style)
                if font_size_match:
                    font_size = font_size_match.group(1)
                    label.setStyleSheet(
                        f"font-size: {font_size}px; {label_style}")
"""

# Encapsulate all the code to only run in the main program
if __name__ == "__main__":
    # Create QApplication instance to manage the whole application GUI
    app = QtWidgets.QApplication(sys.argv)

    # Create Login Screen instance which is a QDialog for the login screen
    login = LoginScreen(app)

    # Create Dashboard Screen instance which is a QDialog for the dashboard screen
    dashboard = DashboardScreen(app)

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

    # Create SettingScreen instance which takes app and dahsboard_bgwidget as its arguments
    setting_screen = SettingsScreen(app, dashboard_bgwidget=dashboard.bgwidget)

    # Error handlings
    try:
        sys.exit(app.exec())
    except SystemExit:
        print('Closing Window...')
