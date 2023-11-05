#include <iostream>
#include <fstream> // for external files 
#include <string>
using namespace std;

/*****************************************************************************
*                     CSCN72030 F23 / Project III                            *
*                     Professor:  Ahmed Salamah                              *
*                                                                            *
*	              BY:  Sudhan Dahake - Hangsihak Sin - Sierra Erb -          *
*                      Michelle Gordon - Saba Berenji                        *
*               DATE:  September, 2023                                       *
*        DESCRIPTION:  Project III - file.cpp file, Michelle Gordon          *
*                                                                            *
*                                                                            *
******************************************************************************/


// will be called in main 
class Input {                                   // Input class
private:
    string username;                            // data members for the member functions
    string password;
public:
    void setName(string newUsername) {          // setter for the username method
        username = newUsername;                 // assign to username
    }
    void setPassword(string newPassword) {      // setter for the password method
        password = newPassword;                 // assign to password
    }
    string getUsername() {                      // getter for the username method
        return username;                        // returns string username 
    }
    string getPassword() {                      // getter for the password method 
        return password;                        // returns string password
    }
};