class Input :

    # defining the constructor for the Input class which initializes the attributes to None
    def __init__(self) :
        self._username = None
        self._password = None

    # Prompt the user to enter their username and store it in the _username attribute
    def get_username_from_user(self) :
        self._username = input()

    # Prompt the user to enter their password and store it in the _password attribute
    def get_password_from_user(self) :
        self._password = input()

    # set username 
    def set_username(self, username):
        if len(username) <= 10:
            self._username = username

    # set password
    def set_password(self, password):
        if len(password) <= 10:
            self._password = password

    # return the stored username
    def get_username(self) :
        return self._username

    # return the stored password
    def get_password(self) :
        return self._password