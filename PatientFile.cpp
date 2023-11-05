#include "PatientFile.h"

PatientFile::PatientFile()
{
    this->firstname;
    this->lastname;
    this->data1;
    this->data2;
}

PatientFile::PatientFile(string firstname, string lastname, float data1, float data2)
{
    this->firstname = firstname;
    this->lastname = lastname;
    this->data1 = data1;
    this->data2 = data2;
}

void PatientFile::setFirstName(string firstname)
{
    this->firstname = firstname;
}
string PatientFile::getFirstName(void)
{
    return firstname;
}

void PatientFile::setLastName(string lastname)
{
    this->lastname = lastname;
}
string PatientFile::getLastName(void)
{
    return lastname;
}

void PatientFile::setData1(float data1)
{
    this->data1 = data1;
}
float PatientFile::getData1(void)
{
    return data1;
}

void PatientFile::setData2(float data2)
{
    this->data2 = data2;
}
float PatientFile::getData2(void)
{
    return data2;
}


PatientFile PatientFile::readFileToPatientObject(ifstream& fin)
{
    PatientFile patient1;
    string line;
    if (fin.is_open()) {
        while (getline(fin, line)) { //repeats this while loop until it has reached the end of the file
            istringstream issLine(line); //creats a new stream called issLine which is made up of the line read from the file
            string xstring; //creates variable xstring which is of type string and will be the x-data read from the line
            getline(issLine, xstring, ','); //reads the line until it reaches the comma and places what it read into the xstring variable
            patient1.setLastName(xstring);
            //float x = stof(xstring); //turns the string it just read to the float x
            string ystring; //creates variable ystring which is of type string and will be the y-data read from the line
            getline(issLine, ystring, ','); //reads the line until it reaches the comma and places what it read into the ystring variable
            patient1.setLastName(ystring); // = ystring;
            //float y = stof(ystring); //turns the string it just read to the float y
            string zstring; //creates variable zstring which is of type string and will be the z-data read from the line
            getline(issLine, zstring, ','); //reads the line until it reaches the comma and places what it read into the zstring variable
            patient1.setData1(stof(zstring)); //turns the string it just read to the float z
            string astring; //creates variable zstring which is of type string and will be the z-data read from the line
            getline(issLine, astring, ','); //reads the line until it reaches the comma and places what it read into the zstring variable
            patient1.setData2(stof(astring)); //turns the string it just read to the float z
            return patient1;
        }
    }
    else
        cout << "Error reading file" << endl;
}