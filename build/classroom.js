"use strict";
(() => {

  var modulo = [];
  //get all the elements with the class name "aDTYNe"
  window.onload = () => {
    var r = document.getElementsByClassName("geS5n")
    for (let i = 0; i < r.length; i++) {

      var domanda = r[i].querySelectorAll(".M7eMe");
      var risposte = r[i].querySelectorAll(".aDTYNe ");

      domanda[0].id = i
      domanda[0].addEventListener("click", function (e) {
        var dom = this;
        console.log(this.textContent)
        console.log(modulo[this.id])
        fetch("https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer sk-proj-asdausdhaisudaiusdasuid" // replace with your API key
            },
            body: JSON.stringify({
              response_format: { "type": "json_object" },
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "system",
                  content: "You have been provided with a question and answers. Please provide only the correct answer. the json response should be {corretto: [index1,index3]} " 
                },
                {
                  role: "user",
                  content: JSON.stringify(modulo[this.id])
                },

              ]
            })
          }
        ).then(response => response.json())
          .then(data => {
            var risp = JSON.parse(data.choices[0].message.content)
            console.log(risp)
            risp.corretto.forEach(function (element) {
              console.log(modulo[dom.id]["risposte"][element])
              document.getElementById(dom.id + "-" + element).style.fontWeight = '500';
              setTimeout(function (tempI, tempJ) {
                return function () {
                  document.getElementById(tempI + "-" + tempJ).style.fontWeight = '400';
                };
              }(dom.id, element), 50);
            })
           
          })
      })
      let vett = []
      risposte.forEach(function (elemento) {
        elemento.id = i + "-" + vett.length
        vett.push(elemento.textContent)
      })

      if (domanda[0].textContent != "Email")
        modulo.push({
          domanda: domanda[0].textContent,
          risposte: vett
        });
    }


    console.log(JSON.stringify(modulo, null, 2))

  }
  // const levenshtein = require('fast-levenshtein');

  function areStringsSimilar(str1, str2) {
    const distance = levenshtein.get(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = (maxLength - distance) / maxLength;
    return similarity >= 0.9;
  }
  document.addEventListener("keydown", e => {
    var n, a;

    if (e.altKey && e.key === "s") {
      for (var i = 0; i < modulo.length; i++) {
        for (var c = 0; c < vettrisposte.length; c++) {
          var risp = vettrisposte[c]["d"].replace(/\n/g, "").replace(/\s+/g, '')
          var rispCer = modulo[i]["d"].textContent.replace(/\n/g, "").replace(/\s+/g, '')
          if (risp == rispCer) {
            for (var j = 0; j < modulo[i]["r"].length; j++) {
              if (modulo[i]["r"][j] && vettrisposte[c]["r"].includes(modulo[i]["r"][j].textContent)) {
                modulo[i]["r"][j].style.fontWeight = 'bold';
                // modulo[i]["r"][j].style.fontWeight = 'normal';
                setTimeout(function (tempI, tempJ) {
                  return function () {
                    modulo[tempI]["r"][tempJ].style.fontWeight = 'normal';
                  };
                }(i, j), 20);
                break;
              }
            }

          }
        }
      }
    }

    if (e.altKey && e.key === "b") {
      var ripsText = [];
      var r = document.getElementsByClassName("geS5n")
      var stringaInter = "ho queste domande a riposta multipla:\n\n me le riesci a fare una ad una cercando di essre piu preciso possbile? va bene anche se ci metti di piu \n\n"
      for (let i = 0; i < r.length; i++) {

        var domanda = r[i].querySelectorAll(".M7eMe");
        var risposte = r[i].querySelectorAll(".aDTYNe ");

        //!per salvare le risposte 
        var risposteText = Array.from(risposte).map(function (elemento) {
          return elemento.textContent;
        });
        // ripsText.push({
        //     d: domanda[0].textContent,
        //     r: risposteText
        // });
        if (domanda[0].textContent != "Email")
          ripsText.push({
            d: domanda[0].textContent,
            r: risposteText
          });
        stringaInter += domanda[0].textContent + "\n" + risposteText.join("\n -") + "\n\n"
      }


      //salvo su file il modulo
      //crea un oggetto Blob contenente il testo del modulo
      const moduloBlob = new Blob([stringaInter], { type: 'text/plain' });

      //crea un URL temporaneo per il file Blob
      const url = window.URL.createObjectURL(moduloBlob);

      //crea un elemento link per scaricare il file
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'modulo.txt';
      downloadLink.textContent = 'Scarica modulo';

      //aggiungi il link alla pagina
      document.body.appendChild(downloadLink);

      //clicca sul link per scaricare il file
      downloadLink.click();

      //rimuovi il link dalla pagina
      document.body.removeChild(downloadLink);

      //rilascia l'URL temporaneo
      window.URL.revokeObjectURL(url);

      var risposte
    }


  });
})();
