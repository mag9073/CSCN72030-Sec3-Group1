import unittest
from FileSuperClass.File import File
from HelpAndRecommendation.HelpAndRecommendation import HelpAndRecommendationFile


class TestDiseaseFile(unittest.TestCase):

    def test_integration_1_readFromFile(self): #unit test for the readFromDoctorAuthenticatorFile() function
        f = File("StrokeRecs.csv")
        h = HelpAndRecommendationFile(f)
        actual = h.readFileLineByLine()
        expected = "https://health.gov/myhealthfinder/health-conditions/heart-health/reduce-your-risk-stroke,https://www.cdc.gov/stroke/prevention.htm,https://www.health.harvard.edu/womens-health/8-things-you-can-do-to-prevent-a-stroke,https://www.heart.org/en/news/2021/05/05/5-critical-steps-to-help-prevent-a-stroke,https://www.ninds.nih.gov/health-information/public-education/brain-basics/brain-basics-preventing-stroke"
        self.assertTrue(actual, expected)
        
    def test_integration_2_saveToFile(self):
        f = File("StrokeRecs.csv")
        h = HelpAndRecommendationFile(f)
        actual = h.getDataFromFile()
        print(actual)
        expected = ''
        print(expected)
        self.assertEqual(actual, expected)


    



if __name__ == '__main__':
    unittest.main()


