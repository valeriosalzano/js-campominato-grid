// creo i collegamenti al DOM
const gridLevelSelect = document.getElementById("gridLevel");
const gridContainerDom = document.getElementById("grid-container");

const generateGridBtn = document.getElementById("generateGrid");
// genero al click il campo minato
generateGridBtn.addEventListener('click',
    function(){
        // reset eventuale vecchia griglia
        gridContainerDom.innerHTML = "";

        // il value avrà valore (Easy:10/Hard:9/Crazy:7) ossia elementi per riga/colonna
        let gridLevel = parseInt(gridLevelSelect.value);

        // invoco la funzione per creare la griglia e la inserisco nel contenitore
        gridContainerDom.append(generateGrid(Math.pow(gridLevel,2),gridLevel,gridLevel));
    }
)


// funzione che genera la griglia
function generateGrid (totalSquares,rows,cols){
    // creo la griglia da inserire
    const grid = document.createElement('div');
    grid.id = "grid";

    // creo una lista da cui saranno estratti i numeri
    let numbersList = [];
    for (i=1; i<=totalSquares; i++){
        numbersList.push(i);
    }

    for (let i=0; i<totalSquares; i++){
        // invoco la funzione per generare il quadrato
        const square = generateSquare(rows,cols);

        // punto a una posizione a caso della lista
        let randomIndex = Math.floor(Math.random()*numbersList.length);
        // pesco l'elemento in quella posizione
        let randomPick = numbersList[randomIndex];
        // invoco una funzione per aggiungerla al quadrato
        square.append(generateSquareText(randomPick));
        // controllo pari/dispari per il colore del quadratino
        if ((randomPick) % 2 == 0){
        square.classList.add('even');
        } else {
        square.classList.add('odd');
        }
        // elimino l'elemento dalle possibili prossime pescate
        numbersList.splice(randomIndex,1);

        

        // aggiungo un eventListener al quadrato
        square.addEventListener('click',
            function(){
                // stampo un messaggio diverso se ho già cliccato sul quadrato
                if (this.classList.contains('revealed')){
                    // numero già rivelato
                    console.log(`You really like ${this.innerText}, don't you?`);
                } else {
                    //rivelo il numero
                    this.classList.add('revealed');
                    console.log(`Your revealed: ${this.innerText}`);
                }
            }
        )
        // aggiungo lo square alla griglia
        grid.append(square);
    }
    return grid;
}

// funzione che genera il quadrato
function generateSquare (squarePerRow,squarePerColumn){
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.height = `${100 / squarePerColumn}%`;
    square.style.width = `${100 / squarePerRow}%`;
    return square;
}

// funzione che genera il contenuto del quadrato
function generateSquareText (text){
    squareText = document.createElement('span');
    squareText.classList.add("square-text");
    squareText.innerHTML = text;
    return squareText;
}

