build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve

dev: build
	stout deploy --env development