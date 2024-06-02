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



  }
  // const levenshtein = require('fast-levenshtein');


})();
