#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <string.h>
#include <unordered_map>
#include "File.h"
using namespace std;

class AuthenticationFile : public File {
private:
	unordered_map<string, string> umap;
public:
	AuthenticationFile();
	AuthenticationFile(unordered_map<string, string> umap);
	void setUmap(unordered_map<string, string> umap);
	unordered_map<string, string> getUmap(void);

	void writeToDoctorAuthenticatorFile(ofstream& fout, const unordered_map<string, string>& umap);
	unordered_map<string, string> readFromDoctorAuthenticatorFile(ifstream& fin);

};