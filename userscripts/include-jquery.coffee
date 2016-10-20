# Load jQuery from Google's CDN
libraryURL = "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"
script = document.createElement 'script'
script.setAttribute 'src', libraryURL
script.addEventListener('load',
	->
		script = document.createElement 'script'
		document.body.appendChild script
	false
)
document.body.appendChild script
