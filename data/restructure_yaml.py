'''restructure_yaml.py parses the yaml output of sort_yaml.py and
restructures it into data that we can use in srs-nihongo, then dumps
that to sys.stdin.

Usage:

    $ cat kanjidic2_heisig6.yaml | python3 restructure_yaml.py > kanjidic2_restructured_heisig6.yaml

'''
import sys
from multiprocessing import Process, Queue

from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

def heisig6_num(ob):
    if 'dic_number' in ob and 'dic_ref' in ob['dic_number']:
        for ref in ob['dic_number']['dic_ref']:
            if type(ref) == dict:
                if 'typ' in ref and ref['typ'] == 'heisig6':
                    return int(ref['text'])
    return sys.maxsize

print('Indexing', file=sys.stderr)
data=load(sys.stdin, Loader=Loader)

print('Sorting', file=sys.stderr)
sorted_data=sorted(data, key=heisig6_num)

print('Dumping', file=sys.stderr)
print(dump(sorted_data, Dumper=Dumper, allow_unicode=True))
