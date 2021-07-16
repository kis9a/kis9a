https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_html.html

```

import pandas as pd

url = 'http://blog.game-de.com/pm-sm/sm-allstats/'
dfs = pd.read_html(url)

print(dfs)

```