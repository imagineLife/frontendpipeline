#!/bin/sh -l

# examples of debugging
echo "::debug :: example debug string"
echo "::warning :: example warning string"
echo "::error :: example error string"

# masking a var
echo "::add-mask::$1"

# similar to "setOutput" in the github js module
time=$(date)
echo "::set-output name=time::$time"

# similar to "grouping" a log
echo "::group::Expandable logs"
echo 'line one'
echo 'line two'
echo 'line three'
echo 'line four'
echo "::endgroup::"

echo "HELLO=hello" >> $GITHUB_ENV

# leveraging inputs, here the $1 is the "greet-me" input
echo "Hello from docker + shell script $1"
