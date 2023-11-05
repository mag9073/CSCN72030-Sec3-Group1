#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <string.h>
#include <unordered_map>
#include "File.h"
using namespace std;

class DiseaseFile : public File {
private:
    string DiabetesFilePath;
    string HeartDiseaseFilePath;
    string StrokeFilePath;
public:
    DiseaseFile();
    DiseaseFile(string DiabetesFilePath, string HeartDiseaseFilePath, string StrokeFilePath);

    void setDiabetesFilePath(string DiabetesFilePath);
    string getDiabetesFilePath(void);

    void setHeartDiseaseFilePath(string HeartDiseaseFilePath);
    string getHeartDiseaseFilePath(void);

    void setStrokeFilePath(string StrokeFilePath);
    string getStrokeFilePath(void);
};


