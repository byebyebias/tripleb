import pandas
import warnings

warnings.filterwarnings("ignore", category=UserWarning) # Suppress PyTorch warnings

# python3.12 manage.py test backend.tests.test_file_converter

class FileConverter:
    
    def __init__(self, file, protected_attributes: list[str]):
        self.df = pandas.read_parquet(file)
        self.protected_attributes = protected_attributes
        self.privileged_groups = {}
        self.all_groups = []
        self.clean_dataset()

    def clean_dataset(self):
        print("PA", self.protected_attributes)
        for protected_attribute in self.protected_attributes:
            groups = set(self.df[protected_attribute].unique())
            print("groups", groups)
            self.all_groups = groups

            priv_group = self.find_priv(protected_attribute)
            self.privileged_groups[protected_attribute] = priv_group
            
            # encode the protected attribute column as binary
            group_map = {group: 0 for group in groups if group != priv_group}
            group_map[priv_group] = 1
            self.df[protected_attribute] = self.df[protected_attribute].map(group_map)

        self.df = self.df.drop(columns=[c for c in self.df.columns if c not in self.protected_attributes + ['is_fraud', 'predicted_fraud']])
        self.df = self.df.dropna()
    
    def get_df(self):
        return self.df
    
    def get_true_df(self):
        df = self.df.drop(columns=['predicted_fraud'])
        return df
    
    def get_pred_df(self):
        df = self.df.drop(columns=['is_fraud'])
        return df
    
    def find_priv(self, column: str):
        # column in table, eg. sender_gender, sender_race 
        # finds the group with the most number of FPs
        fp_count = self.df[(self.df['is_fraud'] == 0) & (self.df['predicted_fraud'] == 1)].groupby(column).size().sort_values(ascending=True)
        print("fp_count", fp_count)

        print("all_groups", self.all_groups)
        # print("length", len(self.all_groups[column]))
        if fp_count.shape[0] != len(self.all_groups):
            no_fp = [group for group in self.all_groups if group not in fp_count.index]
            print("no_fp", no_fp)
            return no_fp[0]
    
        # outlier if top two rows are equal or 0
        if fp_count.index[0] == fp_count.index[1]:
            # break tie with false negative comparison
            fn_count = self.df[(self.df['is_fraud'] == 1) & (self.df['predicted_fraud'] == 0)].groupby(column).size().sort_values(ascending=True)
            return fn_count.index[0]
        
        return fp_count.index[0]
    
    def get_privileged_groups(self):
        return self.privileged_groups
        
