'''restructure_yaml.py parses the yaml output of sort_yaml.py and
restructures it into data that we can use in srs-nihongo, then dumps
that to sys.stdin.

Usage:

    $ cat kanjidic2_heisig6.yaml | python3 restructure_yaml.py > kanjidic2_restructured_heisig6.yaml

'''
import sys
from collections import OrderedDict

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

def meaning(ob):
    if 'reading_meaning' in ob and 'rmgroup' in ob['reading_meaning']:
        rmgroup=ob['reading_meaning']['rmgroup']
        if 'meaning' in rmgroup and len(rmgroup['meaning']) > 0:
            return rmgroup['meaning'][0]
    return 'Unknown'

print('Indexing', file=sys.stderr)
data=load(sys.stdin, Loader=Loader)

print('Restructuring', file=sys.stderr)
# Use an OrderedDict to preserve sorted order
rst_data=OrderedDict()
for ob in data:
    number=heisig6_num(ob)
    prompt=ob['literal']
    response=meaning(ob)
    mnemonic=response
    rst_data[prompt] = {
        'number': number,
        'prompt': prompt,
        'response': response,
        'mnemonic': mnemonic,
    }

print('Dumping', file=sys.stderr)
print(dump({'facts':rst_data}, Dumper=Dumper, allow_unicode=True))
