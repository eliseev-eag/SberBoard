import json
from datetime import datetime


class IssuesAnalyzer:
    date_format = '%Y-%m-%d'
    issues_list = []

    def __init__(self, data_source_name):
        self.issues_list = self.get_issues_as_dict(data_source_name)

    @staticmethod
    def get_issues_as_dict(data_source_name):
        with open(data_source_name) as json_file:
            return json.load(json_file)

    def parse_date(self, date_str, date_format='%Y-%m-%dT%H:%M:%SZ'):
        return datetime.strptime(date_str, date_format).strftime(self.date_format)

    def get_closed_issues(self, total_issues_list, date):
        return len(list(filter(
            lambda x: x['closed_at'] is not None and self.parse_date(x['closed_at']) <= date,
            total_issues_list
        )))

    @staticmethod
    def is_bug(issue):
        for label in issue['labels']:
            if label['name'] == "Type: Bug":
                return True
        return False

    def get_opened_bugs(self, total_issues_list, date):
        opened_issues = list(filter(
            lambda x: x['closed_at'] is not None and self.parse_date(x['closed_at']) > date and len(x['labels']) > 0,
            total_issues_list
        ))
        return list(map(self.is_bug, opened_issues)).count(True)

    def get_issues_on_date(self, date):
        total_issues_list = list(filter(lambda x: self.parse_date(x['created_at']) <= date, self.issues_list))
        total_issues = len(total_issues_list)
        closed_issues = self.get_closed_issues(total_issues_list, date)
        opened_issues = total_issues - closed_issues
        opened_bugs = self.get_opened_bugs(total_issues_list, date)

        return {
            'issues': total_issues,
            'closed_issues': closed_issues,
            'opened_issues': opened_issues,
            'opened_bugs': opened_bugs
        }
