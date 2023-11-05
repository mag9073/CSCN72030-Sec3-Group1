#include "File.h"


File::File() //default constructor of the File class
{
    this->filename = " ";
}


File::File(string filename) //parameterized function of the File class 
{
    this->filename = filename;
}


void File::setFilename(string filename)
{
    this->filename = filename;
}

string File::getFilename()
{
    return filename;
}

ofstream File::openFileToWrite(string filename)
{
    ofstream fout(filename, ios::app); //app = append mode
    if (!fout.is_open()) {
        cout << "Error: unable to open file for writting" << endl;
        // return;
    }
    return fout;
}


ifstream File::openFileToRead(string filename)
{
    ifstream fin(filename);
    if (!fin.is_open()) {
        cout << "Error: unable to open file for reading" << endl;
        //return;
    }
    return fin;
}
