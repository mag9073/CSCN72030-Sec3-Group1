class File():
    def __init__(self, filename):
        self.__filename = filename

    def setFilename(self, filename):
        self.__filename = filename

    def getFilename(self):
        return self.__filename