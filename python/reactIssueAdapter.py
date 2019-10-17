import os
import json
import argparse
import datetime


def parse_date(string, date_format="%Y-%m-%dT%H:%M:%SZ"):
    return datetime.datetime.strptime(string, date_format)


def get_open_issues_amount(folder, date):
    issues_total = len(os.listdir(folder))
    issues_amount = 0
    iteration = 1
    continue_search = True

    while continue_search:
        try:
            with open('{folder}{issueNumber}.json'.format(folder=folder, issueNumber=iteration)) as json_file:
                if iteration > issues_total:
                    print('iteration > issues_total')
                    continue_search = False
                    break

                data = json.load(json_file)
                created_at = parse_date(data['created_at'])
                closed_at = parse_date(data['closed_at']) if data['closed_at'] is not None else None

                if created_at > date:
                    print('created_at > date')
                    continue_search = False
                    break

                if closed_at is None or closed_at > date:
                    issues_amount = issues_amount + 1
        except FileNotFoundError as e:
            print(e.strerror + ' ' + e.filename)
        except KeyError as e:
            print('issue key {key} not found'.format(key=e))
        finally:
            iteration = iteration + 1

    print('issues total: {total}, iterations: {iterations}'.format(total=issues_total, iterations=iteration))
    print('open issues on {date} is {count}'.format(date=date, count=issues_amount))


parser = argparse.ArgumentParser(description='Counting issues by filter')
parser.add_argument('-f', help='issues data set directory', type=str, required=True, dest='folder')
parser.add_argument('-d', help='check open issues on date, yyyy-dd-mm', type=str, required=True, dest='date')

args = parser.parse_args()

get_open_issues_amount(args.folder, parse_date(args.date, "%Y-%m-%d"))
