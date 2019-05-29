#!/usr/bin/env bash
bundle exec jekyll clean
bundle exec jekyll build
stout deploy --env $1