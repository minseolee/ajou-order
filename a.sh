RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

emails=$(git log --pretty=format:'%ae' | sort | uniq)

for email in $emails; do
    total_additions=$(git log --author="$email" --pretty=tformat: --numstat | grep -v 'package-lock.json' | awk '{sum += $1} END {print sum}')
    total_deletions=$(git log --author="$email" --pretty=tformat: --numstat | grep -v 'package-lock.json' | awk '{sum += $2} END {print sum}')
    commit_count=$(git log --author="$email" --pretty=oneline | grep -v 'package-lock.json' | wc -l)

    echo "${NC}Email\t\t:\t$email"
    echo "${NC}Commit counts\t: $commit_count"
    echo "${GREEN}Added Lines\t:\t$total_additions"
    echo "${RED}Deleted Lines\t:\t$total_deletions"
    echo
done
