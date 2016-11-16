#!/usr/bin/env python

from codecs import open
from setuptools import setup

VERSION = '<%= commandModuleVersion %>'

CLASSIFIERS = [
    'Development Status :: 4 - Beta',
    'Intended Audience :: Developers',
    'Intended Audience :: System Administrators',
    'Programming Language :: Python',
    'Programming Language :: Python :: 2',
    'Programming Language :: Python :: 2.7',
    'Programming Language :: Python :: 3',
    'Programming Language :: Python :: 3.4',
    'Programming Language :: Python :: 3.5',
    'License :: OSI Approved :: MIT License',
]

DEPENDENCIES = [
]

with open('README.rst', 'r', encoding='utf-8') as f:
    README = f.read()

setup(
    name='<%= longCommandModuleName %>',
    version=VERSION,
    description='<%= commandModuleDescription %>',
    long_description=README,
    author='<%= authorName %>',
    classifiers=CLASSIFIERS,
    namespace_packages=[
        'azure',
        'azure.cli',
        'azure.cli.command_modules',
    ],
    packages=[
        'azure.cli.command_modules.<%= shortCommandModuleName %>',
    ],
    install_requires=DEPENDENCIES,
)