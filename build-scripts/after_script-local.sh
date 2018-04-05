#!/bin/bash
# Cleanup. Not required on Travis-CI (I think), but important in local builds.

echo
echo "Cleanup script ..."
echo

rm -f -R $PLUGIN_DIR
