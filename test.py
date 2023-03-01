# docker run -v ~/workspace/work:/work -p 8888:8888 --name my-env datascientistus/ds-python-env

import pandas as pd
import numpy as np
import datetime

# Set a Duration
START_DATETIME = '2023/2/21 10:00'
END_DATETIME = '2023/2/21 17:30'

# Define a helper function to convert duration to seconds
def duration_to_seconds(duration):
    seconds = 0
    parts = duration.split()
    if '時間' in parts:
        seconds += int(parts[parts.index('時間') - 1]) * 3600
    if '分' in parts:
        seconds += int(parts[parts.index('分') - 1]) * 60
    if '秒' in parts:
        seconds += int(parts[parts.index('秒') - 1])
    return seconds

# Read the CSV file and parse the 'exit time' column as datetime
df = pd.read_csv('test_new.csv')
df['exit time'] = pd.to_datetime(df['exit time'], format='%Y/%m/%d %H:%M')

# Convert the 'duration' column to seconds
df['duration (s)'] = df['duration'].apply(duration_to_seconds)

# Calculate the 'entry time'
df['entry time'] = df['exit time'] - pd.to_timedelta(df['duration (s)'], unit='s')

# Create a time range with a frequency of 30 minutes
time_range = pd.date_range(start=pd.to_datetime(START_DATETIME, format='%Y/%m/%d %H:%M').floor('30min'), 
                           end=pd.to_datetime(END_DATETIME, format='%Y/%m/%d %H:%M').ceil('30min'), freq='30min')

# Iterate over the time range and count the number of people who were there at that time
result = []
for t in time_range:
    t1 = t + datetime.timedelta(minutes=25)
    t2 = t + datetime.timedelta(minutes=5)
    count = np.sum((df['entry time'] <= t1) & (df['exit time'] > t2) & (df['duration (s)'] > 300))
    result.append({'time': t, 'count': count})

# Save the result to a new CSV file
result_df = pd.DataFrame(result)
result_df.to_csv('result.csv', index=False)
