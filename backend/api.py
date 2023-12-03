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
from AuthenticationModule.AuthenticationModule import *
from InputModule.Input_Module_Python import *
from FileModule.AuthenticationFile.AuthenticationFile import *
from FileModule.PatientFile.PatientFile import *
from FileModule.Trends.Trends import *
from FileModule.HelpAndRecommendation.HelpAndRecommendation import *

app = Flask(__name__)

from flask_cors import CORS

cors = CORS(app)

@app.route('/search', methods=['GET'])
def get_patient_profile():

    f = File("FileModule/PatientFile/PatientProfile.csv")

    p = PatientFile(f)

    dict = p.FileToDict()

    return jsonify(dict)

@app.route('/trendsview', methods=['GET'])
def get_trendsview_files():
    t1 = Trends("Diabetes").readSampleAndGenerateFile()

    t2 = Trends("HeartFailure").readSampleAndGenerateFile()

    t3 = Trends("Stroke").readSampleAndGenerateFile()

    return jsonify({'t1': t1, 't2': t2, 't3': t3})

@app.route('/diabetes-recommendations', methods=['GET'])
def get_diabetes_recommendation_files():

    diabetes_path = File("FileModule/HelpAndRecommendation/DiabetesRecs.csv")

    d = HelpAndRecommendationFile(diabetes_path)

    diabetes_resources = d.readFileLineByLine()   

    return jsonify(diabetes_resources)

@app.route('/heartfailure-recommendations', methods=['GET'])
def get_heartfailure_recommendation_files():

    heartfailure_path = File("FileModule/HelpAndRecommendation/HeartDiseaseRecs.csv")

    h = HelpAndRecommendationFile(heartfailure_path)
    
    heartfailure_resources = h.readFileLineByLine()

    return jsonify(heartfailure_resources)

@app.route('/stroke-recommendations', methods=['GET'])
def get_stroke_recommendation_files():

    stroke_path = File("FileModule/HelpAndRecommendation/StrokeRecs.csv")

    s = HelpAndRecommendationFile(stroke_path)

    stroke_resources = s.readFileLineByLine()

    return jsonify(stroke_resources)

@app.route('/diabetes-prediction', methods=['GET'])
def get_diabetes_prediction():
    dataframe = CreateDataframe().getDataframe()

    patient_data = ReadingPatientFile("KNNModule/KNNDiabetes/PatientData.csv").readFromFile()

    diabetes_result = TrainDiabeticModel(dataframe, patient_data).getPredictedResult()

    result_file_path = "KNNModule/KNNDiabetes/DiabetesResults.csv"
    # SavingPredictedResults(result_file_path, diabetes_result).saveToFile()

    patient_results = ReadingPatientFile(result_file_path).readFromFile()

    final_patient_results = patient_results.tolist()

    # return jsonify({"result_file_path": f'backend/api/{result_file_path}'})
    return jsonify({"patient results": f'{final_patient_results}'})


@app.route('/authenticate', methods=['POST'])
def get_authentication():
       
    data = request.get_json()


    username = data.get('username').lower()
    password = data.get('password')
    
    # Initialize Input Module object
    input_module = Input()

    # Initialize File Module object
    authenticate_file = AuthenticationFile()

    # Error Handling for empty username or password
    if not username or not password:
        return jsonify({"message": "Username and password are required"}), 400
    
    # Pass username and password to the Input object
    input_module.set_username(username)
    input_module.set_password(password)
    
    f = File("FileModule/AuthenticationFile/credentials.csv")

    # Retreive username and password from the Input object
    username_input = input_module.get_username()
    password_input = input_module.get_password()

    user_credentials_from_file = authenticate_file.readFromDoctorAuthenticatorFile(f.getFilename())

    auth_instance = Authentication(username_input, password_input, user_credentials_from_file)

    if auth_instance.log_in():
        return jsonify({"message": "Login successful"}), 200
    else:
        if not auth_instance.authenticate_username():
            return jsonify({"message": "Username not found"}), 401
        elif not auth_instance.authenticate_password():
            return jsonify({"message": "Password incorrect"}), 401

if __name__ == "__main__":
    app.run(debug=True)
    

