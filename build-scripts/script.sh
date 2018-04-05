#!/bin/bash
echo
echo "Building script ... "
echo

cd $TRAVIS_BUILD_DIR
if ./gradlew assemble; then
    if ./gradlew check; then
        echo
    else        
        echo
        echo "Building script FAILED"
        echo
        exit 1
    fi
else
    echo
    echo "Building script FAILED"
    echo
    exit 1
fi
