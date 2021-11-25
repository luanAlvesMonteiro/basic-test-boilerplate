'use strict';
const getPlantas = () => {    
	const sun = document.getElementById('sol').value;
    const water = document.getElementById('agua').value;
    const pets = document.getElementById('pets').value;
    //const url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=high&water=regularly&pets=false`;  
    if( (sun != "") && (water != "") && (pets != ""))
    {        
        const url = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sun}&water=${water}&pets=${pets}`;    
        //console.log('url', url);
        fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {            
            const plantas = myJson;
            //console.log('plantas',plantas);
            if (plantas.hasOwnProperty('error'))
            {
                document.getElementById("semResultado").style.display = "block";
                document.getElementById("comResultado").style.display = "none";
            }
            else
            {
                document.getElementById("semResultado").style.display = "none";
                document.getElementById("comResultado").style.display = "block";
                document.getElementById('app').innerHTML = `
                    ${plantas.map(templateFavorita).join("")}
                    ${plantas.map(template).join("")}
                `;
            }    
        });
    }
}
function templateFavorita(item)
{
    var aux;
    if(item.staff_favorite == true)
    {
        aux = `
            <div class="coluna-12 coluna-sm-7 coluna-md-8 coluna-lg-6 mb-4 favorita float-left">
                <div class="cartao-item p-3">
                    <span class="selo">                
                        Staff favorite
                    </span>              
                    <div class="controle-img ">
                        <img src="${item.url}" />
                    </div>              
                    <div class="linha mt-0 mt-sm-2">
                        <div class="coluna-12 coluna-sm-12 coluna-md-8">
                            <p>${item.name}</p>
                        </div>
                        <div class="coluna-12 coluna-sm-12 coluna-md-4 txt-md-right ">
                            <span>$${item.price}</span>
                            <ul class="classificacao">
                                <li class="${verificaIcone(item.toxicity,'pets')}"></li>
                                <li class="${verificaIcone(item.sun,'sol')}"></li>
                                <li class="${verificaIcone(item.water,'agua')}"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                
        `;        
    }
    return aux;
}
function template(item)
{
    var aux;
    if(item.staff_favorite == false)
    {
        aux = `
        <div class="coluna-12 coluna-sm-5 coluna-md-4 coluna-lg-3 mb-4 float-left">
            <div class="cartao-item p-3">
                <div class="controle-img">
                    <img src="${item.url}" />
                </div>
                <p>${item.name}</p>
                <span>$${item.price}</span>
                <ul class="classificacao">
                    <li class="${verificaIcone(item.toxicity,'pets')}"></li>
                    <li class="${verificaIcone(item.sun,'sol')}"></li>
                    <li class="${verificaIcone(item.water,'agua')}"></li>
                </ul>
            </div>
        </div>
    `;
    }

    return aux;
}

function verificaIcone(item, tipo)
{
    var aux = '';
    if(tipo === 'sol')
    {
        if(item == 'no')    { aux = 'sun-no'; }
        if(item == 'low')   { aux = 'sun-low'; }
        if(item == 'high')  { aux = 'sun-high'; }
    }
    if(tipo === 'agua')
    {
        if(item == 'rarely')    { aux = 'water-rarely'; }
        if(item == 'daily')     { aux = 'water-daily'; }
        if(item == 'regularly') { aux = 'water-regularly'; }
    }    
    if(tipo === 'pets')
    {
        if(item == false)    { aux = 'toxicity-no'; }
        if(item == true)   { aux = 'toxicity-yes'; }        
    }
    return aux;
}

document.getElementById('sol')
        .addEventListener('change',getPlantas);
document.getElementById('agua')
        .addEventListener('change',getPlantas);
document.getElementById('pets')
        .addEventListener('change',getPlantas);                


var scrollParaTopoBtn = document.getElementById("voltarTopo");
var rootElement = document.documentElement;
scrollParaTopoBtn.addEventListener("click", scrollParaTopo);
function scrollParaTopo() {    
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}