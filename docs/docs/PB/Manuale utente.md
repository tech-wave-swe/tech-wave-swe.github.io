---
id: manuale_utente
title: "Manuale utente - v1.0.0"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.0.0
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Manuale Utente

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                 | Autore         | Data Verifica | Verificatore   |
| ---------- | -------- | --------------------------- | -------------- | ------------- | -------------- |
| 14/04/2025 | 1.0.0    | Prima stesura del documento | Cognome? Nome? | ??/04/2025    | Cognome? Nome? |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->


## Introduzione

### Scopo del documento

Il presente documento ha lo scopo di fornire una guida dettagliata all'utilizzo dell'estensione di VS Code creata.

### Scopo del prodotto

Nello sviluppo di software per sistemi embedded, il controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento del sistema risulta costoso e ripetitivo per lo sviluppatore, oltre a poter essere non esaustivo a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **Requirement Tracker - Plug-in VSCode** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti nel glossario saranno evidenziati nei documenti nei seguenti modi:

- **Sito Web**: Grassetto colorato.
- **PDF**: Corsivo con pendice \[G\].

## Manuale utente

### Prerequisiti
Per poter utilizzare l'estensione Requirement Tracker - Plug-in per VS Code, è necessario che sul sistema siano presenti alcuni strumenti software di base. Di seguito sono elencati i requisiti minimi e i riferimenti per l'installazione.

### Software richiesto

| Software           | Versione consigliata | Descrizione | Link installazione |
| -------------------|----------------------|-------------|--------------------|
| Visual Studio Code | 1.95 | Editor di codice sorgente utilizzato per l'esecuzione dell'estensione | [Download VS Code](https://code.visualstudio.com) |
| Node.js            | ? | Ambiente di esecuzione JavaScript necessario per il backend dell'estensione | [Download Node.js](https://nodejs.org/en) |
| Ollama             | 0.6.2 | Sistema locale per l’esecuzione di modelli LLM, utile per la funzionalità Chat | [Download Ollama](https://ollama.com) |


### Avvio
[ NO comandi per l'avvio "in modalità sviluppo"]

#### Apertura di un progetto e configurazione
[screen VS Code area progetto -> "Esplora risorse"]
[descrizione procedura]

#### Configurazioni globali
[screen impostazioni globali VS Code]
[descrizione procedura]

#### Configurazioni del progetto
[screen impostazioni del progetto VS Code]
[descrizione procedura]

#### Configurazione filtri
[screen file per filtri]
[descrizione procedura e spiegazione funzionamento]


### Utilizzo

#### Importare requisiti

<img src="/img/Screenshot/ScreenImport.png" alt="Import" data-width="70%" />

Per iniziare a utilizzare il Requirement Tracker, è necessario importare un insieme di requisiti. L'estensione supporta i formati **CSV** e **ReqIF**, che possono essere caricati da file oppure incollati direttamente.

##### Accesso alla sezione Import

Aprire l’estensione dal pannello laterale di VSCode(1) e selezionare il tab **Import**(2) nella parte superiore dell’interfaccia.

##### Scelta del formato

Nel menu a tendina **Format**(3), selezionare il tipo di file da importare:
- **CSV**: file delimitati da virgola (o altro separatore personalizzabile)
- **ReqIF**: formato standard utilizzato per documenti di requisiti

##### Opzioni per l’importazione
È possibile importare i requisiti in due modi:
- **Caricando un file**(5): selezionare **Choose File** e scegliere il file dal proprio sistema
- **Incollando il contenuto**(6): incollare direttamente i dati nel campo **Or Paste Content**

Se si seleziona il formato CSV, è possibile specificare un delimitatore personalizzato (es. , o $) tramite il campo "CSV Delimiter"(4).

##### Confermare l’importazione
Una volta inseriti i dati, cliccare sul pulsante **Import Requirements**(7) per completare l’operazione. I requisiti verranno salvati e resi disponibili nella sezione **Track** per la successiva analisi.

#### Tracciamento

<img src="/img/Screenshot/ScreenTrack.png" alt="Track" data-width="70%" />

La sezione **Track** consente di monitorare lo stato di implementazione dei requisiti all'interno del codice sorgente del progetto.

##### Visualizzazione dei requisiti

Dopo l'importazione, i requisiti vengono elencati in una tabella con le seguenti colonne:
- **ID**: identificativo del requisito
- **Description**: descrizione testuale del requisito
- **Status**: stato corrente del requisito
- **Actions**: azioni disponibili per ciascun requisito

##### Stato dei requisiti

Ciascun requisito può trovarsi in uno dei seguenti stati:
- **Pending**: in attesa di conferma. L'analisi è stata eseguita, ma è necessario che l’utente selezioni una tra le alternative suggerite nella sezione Results o aggiorni manualmente il riferimento.
- **Tracked**: il requisito è stato collegato a una porzione specifica del codice.
- **Not Tracked**: non è stata trovata alcuna corrispondenza nel codice.

##### Selezione e avvio del tracciamento

Ogni requisito può essere selezionato individualmente tramite la relativa casella di spunta. Per selezionare tutti i requisiti contemporaneamente, è possibile spuntare l’opzione **Track all requirements**(3).

Dopo aver effettuato la selezione, fare clic su Start Tracking(1) per avviare il tracciamento automatico.

##### Pulizia dei requisiti importati

È disponibile il pulsante **Clear Requirements**(2), che consente di rimuovere tutti i requisiti attualmente importati nel progetto. Questa operazione svuota la tabella dei requisiti e permette di eseguire una nuova importazione da zero.

Attenzione: questa azione è irreversibile e comporta la perdita di eventuali collegamenti o modifiche manuali effettuati.

##### Azioni disponibili

Per ciascun requisito sono disponibili diverse azioni:
- Vai al codice (solo se tracciato): Quando un requisito ha stato Tracked, viene mostrata un’icona aggiuntiva(4) che consente di aprire direttamente il file e posizionarsi sulla riga corrispondente.
- Modifica riferimento: Selezionando l'icona(5), si apre la finestra **Modalità Editing**(7), , che consente di aggiornare manualmente il collegamento tra il requisito e una riga specifica del codice sorgente.
- Elimina requisito(6): Consente di rimuovere il requisito dall'elenco attuale.

##### Modalità Editing

Quando si seleziona l'icona Modifica riferimento(5), nella parte inferiore dell’interfaccia viene visualizzato in pannello **Modalità Editing**(7) con queste informazioni:
- **Riferimento originale**(8): mostra il file e la linea attualmente collegata al requisito.
- **Anteprima codice**(9): quando si selezionano righe nel file aperto, queste vengono mostrate in tempo reale all’interno del pannello.
- Pulsanti di azione:
	- **Conferma**(10): salva il nuovo puntatore selezionato e aggiorna il riferimento del requisito.
	- **Annulla**(11): annulla la modifica e ripristina il riferimento originale.

È possibile modificare nuovamente il riferimento in qualsiasi momento ripetendo l’operazione.

#### Analisi dei Risultati

<img src="/img/Screenshot/ScreenResults.png" alt="Results" data-width="70%" />

Dopo aver avviato il tracciamento tramite **Start Tracking**, i risultati dell’analisi sono mostrati nella sezione Results, che fornisce una panoramica dello stato di corrispondenza tra i requisiti e il codice sorgente.

##### Panoramica dei risultati

In alto è presente una barra colorata(1) che riepiloga graficamente i risultati per tutti i requisiti selezionati:
- **Confirmed Match** (verde): requisito tracciato e confermato
- **Possible Match** (giallo): possibile corrispondenza
- **Unlikely Match** (rosso): bassa probabilità di corrispondenza

Sotto alla barra viene mostrato il conteggio numerico di ciascuna categoria.

##### Dettaglio per requisito

Sotto la barra, viene visualizzata la lista dei requisiti analizzati. Ogni requisito ha:
- L’ID e la categoria di match(2) (Confirmed, Possible, Unlikely Match)
- La descrizione e metadati aggiuntivi(3) (tipo, priorità, stato)
- Un elenco dei riferimenti(5) nel codice con la percentuale di match maggiore al requisito

Ogni riferimento include:
- Il puntatore alla riga di codice(6)
- Un estratto del codice circostante(7)
- Una percentuale(8) che indica la probabilità che il punto nel codice rispecchi il requisito

##### Analisi semantica con Ollama

Per ogni requisito è presente il pulsante **Analyze Implementation**(4). Cliccandolo, l’estensione interroga Ollama per un’analisi semantica del codice.

Al termine dell'analisi viene mostrato un commento, che descrive come il codice soddisfa (o meno) il requisito in linguaggio naturale.
Viene evidenziata la porzione di codice ritenuta più rilevante, accompagnata dal puntatore alla riga corrispondente.

##### Azioni disponibili sui risultati

Per ogni riga di codice suggerita (sia tramite Vector Embeddings sia tramite Ollama), l’utente può:
- **Modificare manualmente il puntatore**(9): attiva la Modalità Editing per collegare il requisito a una riga diversa
- **Accettare il risultato**(10): il requisito viene marcato come **Tracked** nella sezione Track e il match viene spostato nella categoria Confirmed Match
- Eliminare il risultato(11): rimuove il suggerimento dall'elenco

Per impostazione predefinita, l’analisi mostra i 5 risultati con la percentuale di match più alta. Questo valore è personalizzabile dalle impostazioni dell’estensione.

#### Interazione tramite chat

<img src="/img/Screenshot/ScreenChat.png" alt="Chat" data-width="70%" />

Nella parte inferiore dell’estensione è presente una chat integrata che consente di interagire direttamente con il modello. È possibile scrivere liberamente nel campo di testo(2) o cliccare su uno dei **suggerimenti predefiniti**(1) per porre domande al sistema.

Sotto al campo di input sono disponibili due pulsanti:
- **Invia**(4): per inviare il messaggio al modello
- **Clear**(3): per eliminare l'intera conversazione

La chat è utile per chiarimenti specifici, approfondimenti tecnici o per ricevere spiegazioni in linguaggio naturale sui risultati ottenuti.

#### Persistenza dei dati

I dati dell’estensione sono **salvati automaticamente**, anche in caso di chiusura di VSCode.

Vengono mantenuti:
- La **tabella dei requisiti** importati
- La **lista dei risultati** del tracciamento
- L’intera **conversazione nella chat**

Alla riapertura dell’editor, sarà quindi possibile riprendere il lavoro esattamente da dove si era interrotto.


### Gestione errori
[Screen e/o lista degli errori]

<!-- ::: {.no-export} -->
</NumberedWrapper>
<!-- ::: -->