#include "DiseaseFile.h"

DiseaseFile::DiseaseFile()
{
    this->DiabetesFilePath = "C:Files/diabetes.csv";
    this->HeartDiseaseFilePath = "C:Files/heartFailure.csv";
    this->StrokeFilePath = "C:Files/stroke-data.csv";
}

DiseaseFile::DiseaseFile(string DiabetesFilePath, string HeartDiseaseFilePath, string StrokeFilePath)
{
    this->DiabetesFilePath = DiabetesFilePath;
    this->HeartDiseaseFilePath = HeartDiseaseFilePath;
    this->StrokeFilePath = StrokeFilePath;
}

void DiseaseFile::setDiabetesFilePath(string DiabetesFilePath)
{
    this->DiabetesFilePath = DiabetesFilePath;
}
string DiseaseFile::getDiabetesFilePath(void)
{
    return DiabetesFilePath;
}

void DiseaseFile::setHeartDiseaseFilePath(string HeartDiseaseFilePath)
{
    this->HeartDiseaseFilePath = HeartDiseaseFilePath;
}
string DiseaseFile::getHeartDiseaseFilePath(void)
{
    return HeartDiseaseFilePath;
}

void DiseaseFile::setStrokeFilePath(string StrokeFilePath)
{
    this->StrokeFilePath = StrokeFilePath;
}
string DiseaseFile::getStrokeFilePath(void)
{
    return StrokeFilePath;
}

