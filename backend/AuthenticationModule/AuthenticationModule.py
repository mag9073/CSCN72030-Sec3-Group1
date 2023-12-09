"""
*****************************************************************************
*                     CSCN72030 F23 / Project III                            *
*                     Professor:  Ahmed Salamah                              *
*                                                                            *
*	              BY:  Saba Berenji                                          *
*               DATE:  October, 2023                                         *
*        DESCRIPTION:  This file containts the method definitions of the     *
*                      authentication module and it will be used to          *
*                      authenticate the user based on their entered username * 
*                      and password                                          *
*                                                                            *
******************************************************************************/
"""


class Authentication:

    # defining the constructor for the class which initiates the 'protected' attributes to the values passed to it or to the default values of None
    def __init__(self, input_username=None, input_password=None, data_map={None: None}):
        self.username_ = input_username
        self.password_ = input_password
        self.username_password_map_ = data_map

    # defining the setters and getters for the attributes

    def set_username(self, input_username):
        self.username_ = input_username

    def get_username(self):
        return self.username_

    def set_password(self, input_password):
        self.password_ = input_password

    def get_password(self):
        return self.password_

    def set_data_map(self, data_map):
        self.username_password_map_ = data_map

    def get_data_map(self):
        return self.username_password_map_

    # this function searchs for the entered username in the dictionary and returns True if it finds it

    def authenticate_username(self):
        return self.username_ in self.username_password_map_

    # this functions compares the entered password with the value (password) of the username key found in the authenticate_username function
    # and returns True if both are identical
    def authenticate_password(self):
        return self.username_password_map_.get(self.username_) == self.password_

    # defining the log in function where it returns True if both authenticate_username anf authenticate_password functions return True
    # which means the user has entered correct credentials and they are authorized to log in
    def log_in(self):
        if self.authenticate_username():
            if self.authenticate_password():
                return True
            else:
                return False
        else:
            return False
