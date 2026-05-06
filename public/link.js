const apiKey = "AIzaSyAHEfsZPtrI-lt_LDZN0hlSPpkdN54PnnU";

const arr = []

async function checkURL() {


    const urll = document.getElementById("link").value;

    const match = arr.find(index => index.link === urll)
    let result

    if (match) {
        result = match.which;
    }

    //console.log(result)

    if(result == 'malware') {
        //console.log("found in arr")

        return
    } else if(result == 'social engineering') {
        //console.log("found in arr")

        return
    } else if(result == 'unwanted software') {
        //console.log("found in arr")

        return
    } else if(result == 'safe') {
        //console.log("found in arr")
       
        return
    } 

    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
  

    const fetch1 = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: {
            clientId: "malcheck",
            clientVersion: "0.0"
          },
          threatInfo: {
            threatTypes: ["MALWARE"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: urll }]
          }
        })
      });

    const fetch2 = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client: {
              clientId: "malcheck",
            clientVersion: "0.0"
            },
            threatInfo: {
              threatTypes: ["SOCIAL_ENGINEERING"],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [{ url: urll }]
            }
        })
    });

    const fetch3 = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: {
            clientId: "malcheck",
            clientVersion: "0.0"
          },
          threatInfo: {
            threatTypes: ["UNWANTED_SOFTWARE"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url: urll }]
          }
        })
      });
  
    const data1 = await fetch1.json();
    const data2 = await fetch2.json();
    const data3 = await fetch3.json();
  
    if(data1.matches) {
        console.log(data1.matches[0].threatType.toLowerCase())

        sendmaldata("malware")

        arr.push({ link: urll, which: 'malware' })

    } else if (data2.matches) {
        console.log(data2.matches[0].threatType.toLowerCase())

        sendmaldata("social engineering")

        arr.push({ link: urll, which: 'social engineering' })

    } else if (data3.matches) {
        console.log(data3.matches[0].threatType.toLowerCase())

        sendmaldata("unwanted software")

        arr.push({ link: urll, which: 'unwanted software' })

    } else {

        console.log("new link, its safe")

        sendmaldata("safe")

        arr.push({ link: urll, which: 'safe' })

        console.log(arr)

    }
    
    
}

function displayResult(ver) {

}


async function sendmaldata(which) {

    console.log("attempting to send info")

    await fetch(`/api/send`, {
      method: 'POST',
      body: JSON.stringify({
        link: `${document.getElementById('link').value}`,
        which: which,
      }),
      headers: {
        'content-type': 'application/json',
      },
    }).then((result) => result.json());

    console.log("sent")
  
}



async function loadmaldata() {
    await fetch('/api/data')
      .then((result) => result.json())
      .then((resultJson) => {
        //console.log(resultJson)

        
        resultJson.forEach((link) => {
            console.log(link.link + ' ' + link.which)
            arr.push(link)
          });

      });

      //console.log(arr)

}

window.onload = function () {
    loadmaldata()
    
}