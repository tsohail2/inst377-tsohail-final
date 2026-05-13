

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

        displayResult('mal')

        return
    } else if(result == 'social engineering') {
        //console.log("found in arr")

        displayResult('soc')

        return
    } else if(result == 'unwanted software') {
        //console.log("found in arr")

        displayResult('us')

        return
    } else if(result == 'safe') {
        //console.log("found in arr")

        displayResult('safe')
       
        return
    } 


    const resp = await fetch('/fetcher', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: urll })
    }).then(res => res.json());
    
    const data1 = resp.data1;
    const data2 = resp.data2;
    const data3 = resp.data3;
  
  
    if(data1) {
        console.log(data1.matches[0].threatType.toLowerCase())

        sendmaldata("malware")

        arr.push({ link: urll, which: 'malware' })

        displayResult('mal')

    } else if (data2) {
        console.log(data2.matches[0].threatType.toLowerCase())

        sendmaldata("social engineering")

        arr.push({ link: urll, which: 'social engineering' })

        displayResult('soc')

    } else if (data3) {
        console.log(data3.matches[0].threatType.toLowerCase())

        sendmaldata("unwanted software")

        arr.push({ link: urll, which: 'unwanted software' })

        displayResult('us')

    } else {

        console.log("new link, its safe")

        sendmaldata("safe")

        arr.push({ link: urll, which: 'safe' })

        console.log(arr)

        displayResult('safe')

    }
    
    
}

function displayResult(ver) {

  const container = document.getElementById("box")

  if(ver == 'mal') {
    const title = document.getElementById("title")
    title.innerHTML = 'This link has been flagged for malware!'
    title.style.color = 'red'

    const what = document.getElementById("what")
    what.innerHTML = 'Defenition: It is sofware that acts as a computer virus, and one of the most dangerous software online'

    const fix = document.getElementById("fix")
    fix.innerHTML = 'Do NOT go to this link, this link will infect your computer and cause irrepreable damage'

    container.style.display = 'block'
  } else if(ver == 'soc') {
    const title = document.getElementById("title")
    title.innerHTML = 'This link has been flagged for social engineering!'
    title.style.color = 'red'

    const what = document.getElementById("what")
    what.innerHTML = 'Defenition: This link will try to decieve you to steal information'

    const fix = document.getElementById("fix")
    fix.innerHTML = 'Do NOT go to this link, this link will lie to you and take your info'

    container.style.display = 'block'
  } else if(ver == 'us') {
    const title = document.getElementById("title")
    title.innerHTML = 'This link has been flagged for unwanted software!'
    title.style.color = 'red'

    const what = document.getElementById("what")
    what.innerHTML = 'Defenition: This will put software on your computer that will slow it down'

    const fix = document.getElementById("fix")
    fix.innerHTML = 'Do NOT go to this link, this link will infect your computer and cause a large issue with your machine'

    container.style.display = 'block'
  } else if(ver == 'safe') {
    const title = document.getElementById("title")
    title.innerHTML = 'This link is possibly safe'
    title.style.color = 'green'

    const what = document.getElementById("what")
    what.innerHTML = 'Defenition: This link has a lower chance of causing any major issues'

    const fix = document.getElementById("fix")
    fix.innerHTML = 'This link seems safe, just keep your eye out for any strange intracies, and do not share your password with anyone'

    container.style.display = 'block'

  }
  
}


async function sendmaldata(which) {

    console.log("attempting to send info")

    await fetch(`/send`, {
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
    await fetch('/data')
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