import time
from flask import Flask
# from KNN.KNNDiabetes.DiabetesKNNModule import CreateDataframe, ReadingPatientFile, TrainDiabeticModel, SavingPredictedResults
import os
import sys
from flask import jsonify, request
import json

rootpath = os.path.join(os.getcwd(), '..')
sys.path.append(rootpath)

from KNNModule.KNNDiabetes.DiabetesKNNModule import *

app = Flask(__name__)

from flask_cors import CORS

cors = CORS(app)

@app.route('/diabetes-prediction', methods=['GET'])
def get_diabetes_prediction():
    dataframe = CreateDataframe().getDataframe()

    patient_data = ReadingPatientFile("KNNModule/KNNDiabetes/PatientData.csv").readFromFile()

    diabetes_result = TrainDiabeticModel(dataframe, patient_data).getPredictedResult()

    result_file_path = "KNNModule/KNNDiabetes/DiabetesResults.csv"
    SavingPredictedResults(result_file_path, diabetes_result).saveToFile()

    patient_results = ReadingPatientFile(result_file_path).readFromFile()

    final_patient_results = patient_results.tolist()

    # return jsonify({"result_file_path": f'backend/api/{result_file_path}'})
    return jsonify({"patient results": f'{final_patient_results}'})


# @app.route('/authenticate', methods=['POST'])
# def get_authentication():
       
#     data = request.get_json()


#     username_input = data.get('username')
#     password_input = data.get('password')

#     if not username_input or not password_input:
#         return jsonify({"message": "Username and password are required"}), 400
    

#     file_name = 'Authentication/UserInfo.txt'
#     user_credentials_from_file = read_user_credentials(file_name)

#     auth_instance = Authentication(username_input, password_input, user_credentials_from_file)

#     if auth_instance.log_in():
#         return jsonify({"message": "Login successful"}), 200
#     else:
#         if not auth_instance.authenticate_username():
#             return jsonify({"message": "Username not found"}), 401
#         elif not auth_instance.authenticate_password():
#             return jsonify({"message": "Password incorrect"}), 401

if __name__ == "__main__":
    app.run(debug=True)
    

