# CyberSide Documentation
### By: Talha Sohail



# Developer Manual
## How to install the application and all dependencies
Standard process applies here, however, to install the application the easiest way to do so is to clone it from our github repo. We trust that this is being
accessed from there, otherwise this would be the link: https://github.com/tsohail2/inst377-tsohail-final. After pulling it from git, ensure you have node installed and then install npm and nodemon, these are critical to running the applicaton. Other dependencies are packaged into here and will fill in themselves
as needed.

## How to run the application on a server
Once the application has been cloned through github, it can be run locally using an npm start in the terminal, which should automatically use the machine as a self hosting server. Access it at "http://localhost:3000/", and assess it as need be. However, to run it on a server (such as vercel) import the github repo there, and ensure that .env keys are set in the root folder. 

## How to run any tests you have written for the software
The best way to do this would be to do it primarily in a non production environment, ideally through a self hosted server on something that is not public facing. If you are using the preferred way of "npm start" to self host the server, changes can be made to the code and then restarting the webpage on the browser should
showcase any changes. 

If certain tests need to be made to test things like the backend however, hardcoding different statuses and options into the js is completely fine, if not welcomed. During development, to check if certain database upload features worked, statuses were hardcoded to the commands to ensure certain software/web links were seen as malware, to test the functionality

Furthermore, ensure there is a test database that can be used, it would make things significantly easier. When mixing a production and testing database, it gets messy if testing needs to occur, and users have already used certain links.

## Relevant APIs/Endpoints
The main API that this website uses to do all of its functions is the Google Safe Browsing API (Documentation: https://developers.google.com/safe-browsing/reference). It is a public API that can be used so long as a website is not generating profit through what it does. The point of this API is to pull from Google's database of known malicious links, and determine if the passed in link is safe or not. The database categorizes the links into 4 different threat types, this website only fetches for the type malware, social engineering, and unwanted software. Three fetches are made to the API and the resulting fetch helps to determine what kind of malicous software the link has. If none of the fetches return anything, the link is implied to be possibly safe. Check out index.js and link.js to really understand how that shakes out on the code/logic side. This is done through a POST request, and requires an API key that can be made near the same link that is referenced abovr for the API. 

The website has 3 endpoints that were self-authored, they are named data, send, and fetcher. The point of data is to take all the data from the database and load it into the website for cached results that can be referenced later. The point of send is to send data to the database. And finally fetcher completes the three fetches to the API and returns the results in an array, which is accesed by link.js to assess the safety of a link. 

## Expectations
For bugs: handle them all importantly, no matter how little or big they are, this website needs to function smoohtly and important. Issues can cause people to be attacked, and thats not something that is wanted. Write them down, show how they were fixed, and ensure prompt fixes please.

For Road-Map: The big thing is to integrate more APIs that will give more information on links passed in. Perhaps ones that give link lifetime, safety, older domains, and all the other important and relevant information. With that change perhaps a bigger overhaul on the visual department when links recieve their verdicts. It would be nice to use another library or just make it smooth.


## Testing Links:
Malware http://malware.testing.google.test/testing/malware/

Social Engineering http://phishing.testing.google.test/testing/phishing/

Unwanted Software http://testsafebrowsing.appspot.com/s/unwanted.html

Potentially Harmful App http://pha.testing.google.test/testing/pha/