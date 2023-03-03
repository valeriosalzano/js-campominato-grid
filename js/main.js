// il select determinerà il valore di difficoltà
const gridLevelSelect = document.getElementById("gridLevel");


const gridDom = document.getElementById("grid-container");

const generateGridBtn = document.getElementById("generateGrid");
// genero al click il campo minato
generateGridBtn.addEventListener('click',
    function(){
        // reset eventuale vecchia griglia
        gridDom.innerHTML = "";

        // il value avrà valore (Easy:10/Hard:9/Crazy:7) ossia elementi per riga/colonna
        let gridLevel = parseInt(gridLevelSelect.value);

        // invoco la funzione per creare la griglia
        generateGrid(Math.pow(gridLevel,2),gridLevel,gridLevel);

    }
)

function generateGrid (squaresNumber,rows,cols){
    for (let i=0; i<squaresNumber; i++){
        // invoco la funzione per generare il quadrato
        const square = generateGridSquare(rows,cols);

        // invoco una funzione per aggiungere il numero
        square.append(generateSquareText(i+1));

        // aggiungo un eventListener al quadrato
        square.addEventListener('click',
            function(){
                // stampo un messaggio diverso se ho già cliccato sul quadrato
                if (this.classList.contains('revealed')){
                    // numero già rivelato
                    console.log(`You really like ${this.innerText}, don't you?`);
                } else {
                    //rivelo il numero se non rivelato già e lo annuncio
                    this.classList.add('revealed');
                    console.log(`Your revealed: ${this.innerText}`);
                }
            }
        )
        gridDom.append(square);
    }
}

function generateGridSquare (squarePerRow,squarePerColumn){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `calc(100% / ${squarePerColumn}`;
    square.style.width = `calc(100% / ${squarePerRow}`;
    return square;
}

function generateSquareText (text){
    squareText = document.createElement('span');
    squareText.classList.add("square-text");
    squareText.innerHTML = text;
    return squareText;
}