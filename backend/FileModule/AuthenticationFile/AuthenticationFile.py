
import random

import sys
from pathlib import Path  # if you haven't already done so
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass

from FileSuperClass.File import File

class AuthenticationFile(File):
    def __init__(self):
        self.__auth = {}

    def setAuthDict(self, auth: dict):
        self.__auth = auth

    def getAuthDict(self):
        return self.__auth

    def readFromDoctorAuthenticatorFile(self, fileName):
        with open(fileName, "r") as my_file:
            for line in my_file:
                line = line.replace("\n", "")

                line = line.split(",")

                username = line[0]
                password = line[1]

                self.__auth[username] = password

        return self.__auth


if __name__ == "__main__":
    f = File("credentials.csv")

    a = AuthenticationFile()
    auth = a.readFromDoctorAuthenticatorFile(f.getFilename())

    print(auth)

