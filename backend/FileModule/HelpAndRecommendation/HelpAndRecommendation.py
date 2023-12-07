import sys
from pathlib import Path
file = Path(__file__).resolve()
parent, root = file.parent, file.parents[1]
sys.path.append(str(root))

# Additionally remove the current file's directory from sys.path
try:
    sys.path.remove(str(parent))
except ValueError:  # Already removed
    pass


from FileSuperClass.File import File

class HelpAndRecommendationFile(File):
    def __init__(self, FileObj):
        self.__FileObj = FileObj
        #self.__disease = disease

        self.__dataFromFile = ""

    def getDataFromFile(self):
        return self.__dataFromFile

    def readFileLineByLine(self):
        filename = (self.__FileObj).getFilename()

        resource = ""

        with open(filename, "r") as my_file:
            for line in my_file:
                line = line.replace("\n", "")

                line = line.split(",")

                for element in line:
                    if (resource == ""):
                        resource = f'{element}'
                    
                    else:
                        resource = f'{resource + "," + element}'

        self.__dataFromFile = resource

        return self.__dataFromFile
    

if __name__ == "__main__":
    f = File("StrokeRecs.csv")

    h = HelpAndRecommendationFile(f)

    resource = h.readFileLineByLine()

    print(resource)

'''
    f.setFilename("newdata.csv")

    h.setNewFileObj(f)

    resource = h.readFileLineByLine()

    print(resource)

    resource = h.getDataFromFile()

    print(resource)
'''