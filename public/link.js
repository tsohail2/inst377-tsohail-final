async function fetcher() {

    const link = document.getElementById('link').value



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

const arr = []

async function loadmaldata() {
    await fetch('/api/data')
      .then((result) => result.json())
      .then((resultJson) => {
        console.log(resultJson)

        
        resultJson.forEach((link) => {
            console.log(link.link + ' ' + link.which)
            arr.push(link)
          });

      });

      console.log(arr)

}

window.onload = function () {
    loadmaldata()
    
}