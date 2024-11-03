import aif360.sklearn
import pandas
import os
import aif360.metrics
import pandas as pd
import aif360
import numpy as np

import itertools

from aif360.metrics import BinaryLabelDatasetMetric, MDSSClassificationMetric
from aif360.detectors import bias_scan

from aif360.algorithms.preprocessing.optim_preproc_helpers.data_preproc_functions import load_preproc_data_compas

from aif360.datasets import StructuredDataset
from aif360.datasets import BinaryLabelDataset
#from aif360.metrics import BinaryLabelDatasetMetric

#from aif360.datasets import BankDataset

import warnings
warnings.filterwarnings("ignore", category=UserWarning) # Suppress PyTorch warnings

class Converter:
    
    def __init__(self, df):
        self.df = pandas.read_parquet(df)
        self.clean_dataset()

    def clean_dataset(self):
        priv_gender = self.find_priv( "gender")
        priv_race = self.find_priv("race")

        # encode the 'race' column as binary 
        races = set(self.df['receiver_race']).union(set(self.df['sender_race']))
        race_map = {race: 0 for race in races if race != priv_race}
        race_map[priv_race] = 1
        # print(race_map)
        self.df['receiver_race'] = self.df['receiver_race'].map(race_map)
        self.df['sender_race'] = self.df['sender_race'].map(race_map)

        # encode the 'gender' column
        genders = set(self.df['receiver_gender']).union(set(self.df['sender_gender']))
        gender_map = {gender: 0 for gender in genders if gender != priv_gender}
        gender_map[priv_gender] = 1
        self.df['receiver_gender'] = self.df['receiver_gender'].map(gender_map)
        self.df['sender_gender'] = self.df['sender_gender'].map(gender_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in ['sender_gender', 'receiver_gender', 'sender_race', 'receiver_race', 'is_fraud', 'predicted_fraud']])

        # print("SUM:")
        # print(self.df.isna().sum())
        # print("------")
        self.df = self.df.dropna()
    
    def get_df(self):
        return self.df
    
    def get_true_df(self):
        df = self.df.drop(columns=['predicted_fraud'])
        return df
    
    def get_pred_df(self):
        df = self.df.drop(columns=['is_fraud'])
        return df
    
    def find_priv(self, category: str):
        # find the group with the most number of FPs
        match category:
            case "gender":
                fp_count = self.df[(self.df['is_fraud'] == 0) & (self.df['predicted_fraud'] == 1)].groupby('sender_gender').size().   sort_values(ascending=False)
                return fp_count.index[0]
            case "race":
                fp_count = self.df[(self.df['is_fraud'] == 0) & (self.df['predicted_fraud'] == 1)].groupby('sender_race').size().   sort_values(ascending=False)
                print(fp_count)
                return fp_count.index[0]
            case "location":
                pass

df = Converter('transaction_triple_b.parquet')