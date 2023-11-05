#include "HelpAndRecommendation.h"

HelpAndRecommendationFile::HelpAndRecommendationFile()
{
    this->dataFromFile = " ";
}

HelpAndRecommendationFile::HelpAndRecommendationFile(string dataFromFile)
{
    this->dataFromFile = dataFromFile;
}

void HelpAndRecommendationFile::setDataFromFile(string dataFromFile)
{
    this->dataFromFile = dataFromFile;
}

string HelpAndRecommendationFile::getDataFromFile(void)
{
    return dataFromFile;
}

string HelpAndRecommendationFile::readFileLineByLine(ifstream& fin)
{
    string line;
    string entire;
    if (fin.is_open()) {
        while (getline(fin, line)) { //repeats this while loop until it has reached the end of the file
            entire = entire + "\n" + line; // cout << line << endl;
            //cout << line << endl;
        }
        return entire;

    }
    else
        cout << "Error reading file" << endl;
}

