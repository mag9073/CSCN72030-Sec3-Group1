#pragma once
#include <iostream>
#include <fstream>
#include <sstream>
#include <string.h>
#include <unordered_map>
#include <filesystem>
using namespace std;

class File {
private:
    string filename;
public:
    File();

    File(string filename);

    void setFilename(string filename);

    string getFilename();

    ofstream openFileToWrite(string filename);

    ifstream openFileToRead(string filename);
};