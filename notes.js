import fs from 'fs';
import chalk from 'chalk';


const addNotes = (title, body)=>{

    const notes = loadNotes()
    const duplicateNots = notes.find((note)=>{  // if not duplicate title is there then find method returns undefined o/w it returns the object
        return note.title === title; // this function is to check whether the same title is available or not
    })
    
    if( !duplicateNots  ){

        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes);
        console.log(chalk.green.inverse('Notes added'));

    }else{
        console.log(chalk.red.inverse('Title already in use!'));
    }

    
}


const removeNotes = (title)=>{

    const notes = loadNotes();
    const notesToKeep = notes.filter((note)=>{
        return note.title !== title; // this removes the note which we didn't want
    })

    if(notes.length > notesToKeep.length){ // this is for checking if note is removed or not
        console.log(chalk.green.inverse('Note is removed'));
        saveNotes(notesToKeep);
    }else{
        console.log(chalk.inverse.red('No note found!'))
    }

    
}

const listNotes = ()=>{

    const notes = loadNotes();

    console.log(chalk.inverse('Your notes'));

    notes.forEach((note)=>{
        console.log(note.title);
    })



}

const readNote = (title)=>{

    const notes = loadNotes();

    const note = notes.find((note)=>{
        return note.title === title;
    })

    if(note){
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse('Note not found!'));
    }

}


const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
}


const loadNotes = ()=>{

    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(error){

        return [];

    }

}


// This export part is not compitable with es6

// module.exports = {
//     getNotes: getNotes,
//     addNotes: addNotes,
//     removeNotes: removeNotes
// }



// but this part is compitable with es6

export default { 
    addNotes,
    removeNotes,
    listNotes,
    readNote
}