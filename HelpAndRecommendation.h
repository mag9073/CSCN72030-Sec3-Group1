#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <string.h>
#include <unordered_map>
#include "File.h"
using namespace std;

class HelpAndRecommendationFile : public File {
private:
	string dataFromFile;
public:
	HelpAndRecommendationFile();
	HelpAndRecommendationFile(string dataFromFile);
	void setDataFromFile(string dataFromFile);
	string getDataFromFile(void);

	string readFileLineByLine(ifstream& fin);

};