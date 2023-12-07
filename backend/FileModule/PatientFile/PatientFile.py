import pandas as pd

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


class PatientFile(File):
    def __init__(self, fileObj):
        self.__fileObj = fileObj

    def FileToDict(self):
        dict1 = {}
        dict2 = {}
        dict3 = {}

        tuple_dict = (dict1, dict2, dict3)


        headers = ["Patient_Name", "DOB", "Patient_ID", "Phone", "Email", "Address", "Allergies"]

        filename = (self.__fileObj).getFilename()

        dataframe = pd.read_csv(filename)

        patient_profile_list = dataframe[dataframe.columns[ : ]].values

        for list_index in range(0, len(patient_profile_list)):
            for index in range(0, len(headers)):
                (tuple_dict[list_index])[headers[index]] = (patient_profile_list[list_index])[index]

        return tuple_dict
    

if __name__ == "__main__":
    f = File("PatientProfile.csv")

    p = PatientFile(f)

    tuple_dict = p.FileToDict()

    print(tuple_dict)