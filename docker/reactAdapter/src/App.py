import subprocess
import json


def clone(repo):
    subprocess.run('test -e target_repo || git clone {0} target_repo -q'.format(repo), shell=True)
    subprocess.run('git -C target_repo fetch --all -q', shell=True)
    subprocess.run('git -C target_repo reset --hard origin/master -q', shell=True)


def slice_months():
    res = {}
    log = subprocess.getoutput('git -C target_repo log --reverse --date=short --pretty="format:%ad %H" -q')
    for s in log.splitlines():
        commit_line = s.split(" ")
        commit_date = commit_line[0]
        if commit_date.endswith("01"):
            res[commit_line[0]] = commit_line[1]
    return res


def analyze_scc_output(commit_hash):
    subprocess.run('git -C target_repo reset --hard {0} -q'.format(commit_hash), shell=True)
    total = subprocess.getoutput('scc target_repo --binary -w  | grep -i total').split(" ")
    total = list(filter(lambda x: x != "", total))
    return {
        'files': int(total[1]),
        'lines': int(total[2]),
        'blanks': int(total[3]),
        'comments': int(total[4]),
        'code': int(total[5]),
        'complexity': float(total[6]),
        'complexity / lines': float(total[7]),
    }


def pretty_print_json(arr):
    return json.dumps(arr, sort_keys=True, indent=4, separators=(',', ': '))


clone("https://github.com/facebook/react.git")
monthly_hashes = slice_months()
data = []
for commit_date, commit_hash in monthly_hashes.items():
    item = analyze_scc_output(commit_hash)
    item['date'] = commit_date

    # add more item info HERE

    data.append(item)

print(pretty_print_json(data))
