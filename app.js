
// The custom command file

import notes from './notes.js';
import yargs from 'yargs';
import {hideBin}from 'yargs/helpers'


// const command = process.argv;  it gets the command line input


const yargs_argv =yargs(hideBin(process.argv));

// Add command

yargs_argv.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
        
    }
})

// Remove command

yargs_argv.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{ 
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
})

// List command

yargs_argv.command({
    command: 'list',
    describe: 'List note',
    handler(){
        notes.listNotes();
    }
})

// Read command

yargs_argv.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },    
    handler(argv){
        notes.readNote(argv.title);
    }
})


yargs_argv.parse(); //this is the main thing * never remove *

