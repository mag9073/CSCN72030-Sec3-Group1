import time
from flask import Flask
# from KNN.KNNDiabetes.DiabetesKNNModule import CreateDataframe, ReadingPatientFile, TrainDiabeticModel, SavingPredictedResults
import os
import sys
from flask import jsonify, request
import json

rootpath = os.path.join(os.getcwd(), '..')
sys.path.append(rootpath)

from KNNModule.KNNDiabetes.DiabetesKNNModule import CreateDataframe as DCreateDataFrame, TrainDiabeticModel as DTrainDiabeticModel
from KNNModule.KNNHeartFailure.HeartFailureKNNModule import CreateDataframe as HFCreateDataFrame, FeatureAppropriationConversion as HFFeatureAppropriationConversion, TrainHeartFailureModel as HFTrainHeartFailureModel
from KNNModule.KNNStroke.StrokeKNNModule import CreateDataframe as SCreateDataFrame, TrainStrokeModel as STrainStrokeModel
from AuthenticationModule.AuthenticationModule import *
from InputModule.Input_Module_Python import *
from FileModule.AuthenticationFile.AuthenticationFile import *
from FileModule.PatientFile.PatientFile import *
from FileModule.Trends.Trends import *
from FileModule.HelpAndRecommendation.HelpAndRecommendation import *
from FileModule.DiseaseFile.DiseaseFile import *

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
    dataframe = DCreateDataFrame().getDataframe()

    f = File("KNNModule/KNNDiabetes/PatientData.csv")

    d = DiseaseFile(f)

    patient_data_dataframe = d.readFromFile()

    db = DTrainDiabeticModel(dataframe, patient_data_dataframe.copy(deep=True))

    df = db.resultToDict(patient_data_dataframe)

    d.saveToFile("C:/Users/Hangsihak Sin/OneDrive/Desktop/CSCN72030-Sec3-Group1/frontend/src/assets/files/DiabetesResults.csv", df)    

    return jsonify({"message": "Diabetes Prediction completed successfully"})


@app.route('/heartfailure-prediction', methods=['GET'])
def get_heartfailure_prediction():
    dataframe = HFCreateDataFrame("KNNModule/KNNHeartFailure/heartFailure.csv").getDataframe()

    dataframe = HFFeatureAppropriationConversion().convertFeaturesToNumeric(dataframe)

    patient_dataframe = HFCreateDataFrame("KNNModule/KNNHeartFailure/PatientData.csv").getDataframe()

    patient_dataframe = HFFeatureAppropriationConversion().convertFeaturesToNumeric(patient_dataframe)

    hf_model = HFTrainHeartFailureModel(dataframe, patient_dataframe.copy(deep=True))

    predicted_results_df = hf_model.resultToDict(patient_dataframe)

    result_file_path = "C:/Users/Hangsihak Sin/OneDrive/Desktop/CSCN72030-Sec3-Group1/frontend/src/assets/files/HeartFailureResults.csv"
    DiseaseFile(result_file_path).saveToFile(result_file_path, predicted_results_df)

    return jsonify({"message": "Heart Failure Prediction completed successfully"})

@app.route('/stroke-prediction', methods=['GET'])
def get_stroke_prediction():
    dataframe = SCreateDataFrame("KNNModule/KNNStroke/stroke_data.csv").getDataframe()

    patient_dataframe = SCreateDataFrame("KNNModule/KNNStroke/PatientData.csv").getDataframe()

    s = STrainStrokeModel(dataframe, patient_dataframe.copy(deep=True))

    df = s.resultToDict(patient_dataframe)

    result_file_path = "C:/Users/Hangsihak Sin/OneDrive/Desktop/CSCN72030-Sec3-Group1/frontend/src/assets/files/StrokeResults.csv"

    DiseaseFile(result_file_path).saveToFile(result_file_path, df)

    return jsonify({"message": "Stroke Prediction completed successfully"})

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
    

