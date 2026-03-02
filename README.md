## my personal website
Hello this is the repository for my personal website. It is a purely React site with some of my own twists and features added to save operating costs.

If you really care to run it locally instead of visiting www.cadenmcarthur.net

you can clone the repo, navigate to /client and then do `npm run dev`

## Blogs
MY blogs were once setup to be pulled from a sql server but i opted for another approach to keep my site free to run.

Each time my app is deployed a script gets run to convert my .md files in my /Blogs directory into a json format. From there the app parses it out into html on app build/deploy 

The conversion is run through my new npm package called obbyparser which will parse Obsidian markdown files into web format. 

### what is obsidian?
It is the best note taking took i have used which allows for the building of your own wikipedia of notes through markdown files.

