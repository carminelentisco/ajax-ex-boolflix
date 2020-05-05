# BoolFlix

>## *Nome della repository* : ajax-ex-boolfliX

## MILESTON 1 :

*Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.*
*Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato* : 

**Riferimento Template**
1.	Titolo
2.	Titolo Originale
3.	Lingua Originale
4.	Voto (media)

*Utilizzare un template Handlebars per mostrare ogni singolo film trovato.*

***

## MILESTONE 2 :
*Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote*
*Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene*
*Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API.*

**Riferimento template**
1.	Titolo: Barnyard - Ritorno al cortile
2.	Titolo Originale: Back at the Barnyard
3.	Lingua:  (bandiera o lingua)
4.	Voto:  (stelle da 1 a 5)
5.	Tipo: Tv o Film

*Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici)*

***