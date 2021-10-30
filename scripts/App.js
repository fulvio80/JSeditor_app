import { FileDoc } from "./FileDoc.js";

export class App {
    constructor() {
        //Costruzione array/attributo della classe
        this.files = [];
        this.idFile = -1; //numero non presente altrove per non avere problema con l'array
        this.openFile = null; //oggetto

        //Lettura di tutti i nodi e inserimento nelle variabili
        this.save = document.querySelector('#save');
        this.title = document.querySelector('#title_txt');
        this.editor = document.querySelector('#editor_txt');
        this.file_list = document.querySelector('#file_list');

        //Richiama variabili e ascolta eventi
        this.save.addEventListener('click', this.saveDoc);
        this.new.addEventListener('click', this.newDoc);
    }


    //Definizione dei metodi

    //NB: L'arrow function non ha un this proprio e lavora sempre 
    //sul this dell'oggetto globale, in questo caso l'oggetto chiamante (App) 
    //consentendomi di prendere il valore.
    saveDoc = () => {
        //condizione per save
        if (this.openFile === null) {
            this.files.push(new FileDoc(this.title.value, this.editor.value))
        } else {
            //condizione per modificare / loadFile
            this.openFile.title = this.title.value;
            this.openFile.text = this.editor.value;
            this.files[this.idFile] = this.openFile;
        }
        this.build();
        this.clean();
    }

    build = () => {
        this.file_list.innerHTML = '';
        //forEach primo parametro è l'elemento, il secondo è l'indice dell'array
        this.files.forEach((el, index) => {
            this.file_list.innerHTML +=
                `<li data-id="${index}" class="list-group-item list-group-item-action">
            ${el.title}
            <button type="button" class="close" aria-label="Close">
                <span id="deleteIcon" title="remove" data-id="${index}" aria-hidden="true">&times;</span>
            </li>`
        })
        this.file_list.addEventListener('click', this.loadFile)
    }

    clean = () => {
        this.title.value = '';
        this.editor.value = '';
        //soluzione alla sovrascrittura successiva all'else di saveDoc
        this.openFile = null;
    }

    loadFile = (e) => {
        //target contiene il nodo dell'evento scatenato, e stampando con dir
        //tutte le proprietà permette di individuare l'id in dataset.
        //console.dir(e.target.dataset.id)
        this.idFile = e.target.dataset.id;
        if (e.target.title === 'remove') {  //condizione per la cancellazione  che richiama il "remove" del button close e il metodo removeFile
            this.removeFile(this.idFile)
        } else {
            this.openFile = this.files[this.idFile];
            //valore in base all'id selezionato
            this.title.value = this.openFile.title;
            this.editor.value = this.openFile.text;
        }
    }

    removeFile = (index) => {
        this.files.splice(index, 1);
        this.clean(); //pulizia dei campi
        this.build(); //aggiornamento della lista 
    }
}



