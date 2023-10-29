#pragma once

/*****************************************************************************
*                     CSCN72030 F23 / Project III                            *
*                     Professor:  Ahmed Salamah                              *
*                                                                            *
*	              BY:  Saba Berenji                                          *
*               DATE:  October, 2023                                         *
*        DESCRIPTION:  This file containts is header for the authentication  *
*                      class and contains the prototypes for the methods     *
*                      and the declarations for the class members            *
*                                                                            *
******************************************************************************/


#pragma once

#ifndef AUTHENTICATION_H
#define AUTHENTICATION_H


#include <iostream>
#include <unordered_map>
#include <string>

using namespace std;


class Authentication
{
	// declaring the private member variables 
	string username;
	string password;
	unordered_map<string, string > username_password_map;

	// prototype for the private methods that will be called in the public method of this class
	bool authenticateUsername();
	bool authenticatePassword();

	// prototype for the constructors and the public methods
public:
	Authentication();
	Authentication(string inputUsername, string inputPassword, unordered_map<string, string> data_map);
	bool logIn();
};



#endif