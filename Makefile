all:
	jekyll --no-auto --url http://blog.8-p.info/2011/

install: all
	rsync -rvz --delete _site/ 8-p.info:/home/kzys/www/blog.8-p.info/2011/

clean:
	-rm -fr _site

distclean: clean
	-rm `find . -name '*~'`
