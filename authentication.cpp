/*****************************************************************************
*                     CSCN72030 F23 / Project III                            *
*                     Professor:  Ahmed Salamah                              *
*                                                                            *
*	              BY:  Saba Berenji                                          *
*               DATE:  October, 2023                                         *
*        DESCRIPTION:  This file containts the method definitions of the     *
*                      authentication module and it will be used to          *
*                      authenticate the username and the password entered    *
*                      based on the available dataset                        *
*                                                                            *
******************************************************************************/


#include <iostream>
#include "authentication.h"


using namespace std;

// defining the default constructor where both username and password will be initiated to 'Unknown'
Authentication::Authentication()
{
    this->username = "Unknown";
    this->password = "Unknown";
}


// defining the parameterized constructor 
Authentication::Authentication(string inputUsername, string inputPassword, unordered_map<string, string> data_map)
{
    this->username = inputUsername;
    this->password = inputPassword;
    this->username_password_map = data_map;
}


// defining the authenticateUsername method which is a private method and it will check to see 
// if the username exists in the dataset or not
bool Authentication::authenticateUsername()
{
    //using the 'find' method to search the username_password_map for the entered username
    auto it = username_password_map.find(username);  // if the username is not found, 'it' will equal 'end()'

    if (it != username_password_map.end())  // if 'it' does not equal 'end()', return true meaning the usrname was found
        return true;


    return false; //return false if the username was not found
}


// defining the authenticatePassword method which is a private method and it will check to see if the password provided matches
// the username entered or not
bool Authentication::authenticatePassword()
{
    // comparing the actual value of the username key with the entered password
    if (username_password_map[username] == password)
        return true;   //return true if both match meaning the entered password is the password for the entered username

    else
        return false;   // return false if the two values do not match
}


// defining the logIn method which is a public method and will verify whether the credential entered (username and password)
// is valid and whether the user can enter the application or not.
bool Authentication::logIn()
{
    bool usernameBool = authenticateUsername();  // check to see if the username exists

    if (usernameBool)   // if the username is found, then procceed with authenticating the password
    {
        bool passwordBool = authenticatePassword();   // authenticate the password

        if (passwordBool)
            return true;


        else
        {
           // cout << "Your password doesn't match the provided username. Please enter a valid password." << endl;
            return false;
        }

    }

    else
    {
       // cout << "The username entered does not exist.Please enter a valid username." << endl;
        return false;
    }

}








