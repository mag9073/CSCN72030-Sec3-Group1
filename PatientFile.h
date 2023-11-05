#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <string.h>
#include <unordered_map>
#include "File.h"
using namespace std;

class PatientFile : public File {
private:
    string firstname;
    string lastname;
    float data1;
    float data2;
public:
    PatientFile();
    PatientFile(string firstname, string lastname, float data1, float data2);

    void setFirstName(string firstname);
    string getFirstName(void);

    void setLastName(string lastname);
    string getLastName(void);

    void setData1(float data1);
    float getData1(void);

    void setData2(float data2);
    float getData2(void);

    PatientFile readFileToPatientObject(ifstream& fin);

};