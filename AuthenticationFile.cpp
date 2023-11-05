#include "AuthenticationFile.h"

AuthenticationFile::AuthenticationFile()
{
    this->umap;
}

AuthenticationFile::AuthenticationFile(unordered_map<string, string> umap)
{
    this->umap = umap;
}
void AuthenticationFile::setUmap(unordered_map<string, string> umap)
{
    this->umap = umap;
}

unordered_map<string, string> AuthenticationFile::getUmap(void)
{
    return umap;
}


void AuthenticationFile::writeToDoctorAuthenticatorFile(ofstream& fout, const unordered_map<string, string>& umap)
{
    for (const auto& doctor : umap)
    {
        fout << doctor.first << "  " << doctor.second << endl;
    }
}

unordered_map<string, string> AuthenticationFile::readFromDoctorAuthenticatorFile(ifstream& fin)
{

    unordered_map<string, string> umap;
    string line;
    while (getline(fin, line)) {
        istringstream iss(line);
        string username;
        string password;
        if (iss >> username >> password) {
            umap[username] = password;
        }
    }
    return umap;
}