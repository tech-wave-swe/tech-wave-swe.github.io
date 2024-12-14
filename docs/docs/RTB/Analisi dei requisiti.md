# Documento dell'analisi dei requisiti

<details>
  <summary>Changelog</summary>

| Data | Versione | Descrizione | Autore | Data Verifica | Verificatore |
|------|----------|-------------|---------|------------------|-------------|
| 13/12/2024 | 0.1.0 | Prima stesura del documento | Pistori Gaia | 13/12/2024 | Luca Monetti |

</details>

**1. Introduzione**

    1.1 Scopo del Documento

    1.2. Scopo del Prodotto

**2. Analisi dei requisiti**

	2.1 Requisiti funzionali 

		2.1.1 Requisiti funzionali obbligatori
		2.1.2 Requisiti funzionali opzionali

	2.2 Requisiti non funzionali 
		2.2.1 Requisiti non funzionali obbligatori
		2.2.2 Requisiti non funzionali opzionali

	2.3 Requisiti tecnici 
		2.3.1 Requisiti tecnici obbligatori
		2.3.2 Requisiti tecnici opzionali

# 1. Introduzione

## 1.1 Scopo del Documento

Lo scopo del documento è quello di definire i requisiti che il gruppo di sviluppo TechWave dovrà rispettare per consegnare il prodotto ***Requirement Tracker - Plug-in VSCode*** rispettando le aspettative dell'azienda Bluewind.

## 1.2 Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il capitolato ***Requirement Tracker - Plug-in VSCode*** propone lo sviluppo di un plugin per VSCode che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

# 2. Analisi dei requisiti

## 2.1 Requisiti funzionali 

### 2.1.1 Requisiti funzionali obbligatori
- L'applicativo deve permettere di impostare il suo ambiente di lavoro indicato il file dei requisiti e la cartella con il codice scritto dagli sviluppatori in C / C++dove effettuare il controllo utilizzando una semplice interfaccia grafica.
- L'applicativo deve essere in grado di estrapolare le informazioni necessarie all'analisi a partire da un file dei requisiti in formato *.csv*.
- L'applicativo deve, una volta ottenuti i requisiti, avviare un processo di ricerca (in buona parte svolto da un LLM) nella cartella, contenente i file di codice, per generare in output la lista dei requisiti e il loro stato di implementazione. Per stato di implementazione si intende: il testo del requisito, la sua descrizione e una indicazione sul frammento di codice (funzione o parte di essa) dove potrebbe essere implementato.
- Il large language model (LLM) deve subire un processo di addestramento specifico sugli argomenti relativi allo sviluppo dell'azienda Bluewind a partire dai manuali forniti.

### 2.1.2 Requisiti funzionali opzionali
- L'applicativo deve essere in grado di estrapolare le informazioni necessarie all'analisi a partire da un file dei requisiti in formato *.requif*.
- L'utente programmatore, una volta ottenuto in output può valutare la risposta ottenuta indicando se la posizione di implementazione del requisito suggerita è corretta o no. Questa informazione può essere memorizzata e utilizzata per miglioramenti futuri del modello.
- L'applicativo deve essere in grado di fornire suggerimenti per l'implementazione di un requisito selezionato.

## 2.2 Requisiti non funzionali 
		
### 2.2.1 Requisiti non funzionali obbligatori
- L'applicativo deve avere una struttura modulare: gli step da effettuare per l'analisi dei requisiti devono essere modificabili (scelta dei filtri sui file, delle azioni da svolgere e del modello da utilizzare da una lista definita di opzioni).
- L'applicativo deve avere una struttura estensibile: deve essere facile aggiungere funzionalità (integrazione di nuovi modelli e funzioni nella lista delle opzioni).

### 2.2.2 Requisiti non funzionali opzionali
- L'applicativo può fornire delle statistiche di correttezza per il confronto dei modelli messi a disposizione tra le opzioni.

## 2.3 Requisiti tecnici

### 2.3.1 Requisiti tecnici obbligatori

- L'applicativo deve essere un'estensione di Visual Studio Code.
- L'applicativo deve essere eseguibile interamente in locale. Viene richiesto, quindi, di utilizzare Ollama come interfaccia per l'interrogazione e l'addestramento dei modelli.


### 2.3.2 Requisiti tecnici opzionali


