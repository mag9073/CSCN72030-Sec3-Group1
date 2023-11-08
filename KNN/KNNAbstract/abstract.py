from abc import ABC, abstractmethod


class DataFrameOperations(ABC):
    @abstractmethod
    def getDataframe(self):
        pass

    @abstractmethod
    def filterNoise(self):
        pass


class KNNOperations(ABC):
    @abstractmethod
    def splitDataset(self):
        pass

    @abstractmethod
    def scaleDataset(self, dataframe):
        pass
