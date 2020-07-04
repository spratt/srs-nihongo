'''sort_yaml.py parses any number of yaml files constructed from the
kanjidic2 dataset, filters out any characters not in heisig6, sorts
them by their heisig6 number, and dumps them back out to sys.stdin.

Usage:

    $ python3 sort_yaml.py kanjidic2_indexed_*.yaml > kanjidic2_heisig6.yaml

'''
import sys
from multiprocessing import Process, Queue

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

def load_yaml(filename, queue):
    with open(filename, 'r') as f:
        queue.put(load(f, Loader=Loader))

filenames=sys.argv[1:]
processes=[]
queue=Queue()
for filename in filenames:
    process=Process(target=load_yaml, args=(filename,queue))
    processes.append(process)
    print(f'Parsing {filename}', file=sys.stderr)
    process.start()

yamls=[]
for filename in filenames:
    yamls.append(queue.get())

print('Got all yamls', file=sys.stderr)

for process in processes:
    process.join()

print('All processes finished', file=sys.stderr)

total_size=0
for ob in yamls:
    total_size += len(ob.keys())

print(f'Total characters: {total_size}', file=sys.stderr)

def heisig6_num(ob):
    if 'dic_number' in ob and 'dic_ref' in ob['dic_number']:
        for ref in ob['dic_number']['dic_ref']:
            if type(ref) == dict:
                if 'typ' in ref and ref['typ'] == 'heisig6':
                    return int(ref['text'])
    return sys.maxsize

heisig6_yamls=[]
for ob in yamls:
    for k,v in ob.items():
        n=heisig6_num(v)
        if n < sys.maxsize:
            heisig6_yamls.append(v)

print(f'Heisig6 characters: {len(heisig6_yamls)}', file=sys.stderr)

sorted_heisig6_yamls=sorted(heisig6_yamls, key=heisig6_num)

print(dump(sorted_heisig6_yamls, Dumper=Dumper, allow_unicode=True))
