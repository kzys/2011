all:
	jekyll build

install: all
	rsync -rvz --delete _site/ 49.212.0.70:/home/kzys/nginx/blog.8-p.info/2011/

clean:
	-rm -fr _site

distclean: clean
	-rm `find . -name '*~'`
