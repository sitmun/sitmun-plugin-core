#!/bin/bash
echo
echo "Deploying docs ..."
echo

# This creates the Angular docs in $TRAVIS_BUILD_DIR/build/doc-angular with Compodoc
./gradlew npmCreateCompodocs 

if [ -n "$GITHUB_API_KEY" ]; then
    cd "$TRAVIS_BUILD_DIR"/build        
    git clone https://github.com/sitmun/sitmun.github.io.git
    cd sitmun.github.io
    cp -r "$TRAVIS_BUILD_DIR"/build/doc-angular /doc-angular       
    git add doc-angular/*
    git commit -m "Automatic update of the Angular docs"
    # Make sure to make the output quiet, or else the API token will leak!
    # This works because the API key can replace your password.
    git push -q https://rbejar:$GITHUB_API_KEY@github.com/sitmun/sitmun.github.io master &>/dev/null    
fi
