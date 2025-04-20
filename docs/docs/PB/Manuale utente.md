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

| Data       | Versione | Descrizione                 | Autore              | Data Verifica | Verificatore   |
| ---------- | -------- | --------------------------- | ------------------- | ------------- | -------------- |
| 17/04/2025 | 1.0.0    | Sezione Gestione errori     | Marcon Giulia       | 18/04/2025    |                |
| 17/04/2025 | 0.3.0    | Sezione Avvio               | Dal Bianco Riccardo | 17/04/2025    |                |
| 15/04/2025 | 0.2.0    | Sezione Utilizzo            | Marcon Giulia       | 16/04/2025    |                |
| 14/04/2025 | 0.1.0    | Prima stesura del documento | Pistori Gaia        | 15/04/2025    | Marcon Giulia  |

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

[SREEN EXPLORER]

Per poter utilizzare l'estensione Requirement Tracker, è fondamentale che un progetto sia attivo all’interno di Visual Studio Code. L’estensione è progettata per operare nel contesto di una cartella progetto aperta.

Se la struttura delle cartelle e dei file sarà visibile nella sezione Explorer di Visual Studio Code (Icona dei file nella barra laterale sinistra) il progetto è aperto correttamente e 
l’estensione è pronta per essere utilizzata nel contesto di lavoro attivo.

#### Configurazioni globali
L’estensione Requirement Tracker mette a disposizione una serie di impostazioni personalizzabili, accessibili dal pannello Settings di Visual Studio Code. Queste configurazioni, definite a livello globale, determinano il comportamento dell’estensione in tutti i progetti aperti nell’editor, indipendentemente dal contesto specifico.
Per accedervi: 
1. Vai su File > Preferences > Settings, oppure simbolo ingranaggio in basso a sinistra > Settings
2. Nella barra di ricerca, digita "Req Tracker".


[SCREEN IMPOSTAZIONII GLOBALI]


Dettaglio delle impostazioni disponibili
1. **Endpoint**:
URL dell'endpoint del server Ollama a cui l'estensione si connette per effettuare le richieste.
  - Default: http://127.0.0.1:11434 (esecuzione locale)
  - Può essere sostituito con un URL remoto se si usa server esterno

2. **Model**: 
Permette di selezionare, tramite un menu a tendina, il modello LLM da utilizzare come predefinito per le funzionalità dell'estensione. 
Il menù propone una lista di modelli preinstallati disponibili localmente tramite Ollama e oltre a questi è possibile selezionare "custom", in questo caso l'estensione userà un modello specificato manualmente dall'utente nel campo Custom-model.

3. **Custom-model**:
Campo utilizzato per indicare manualmente il nome di un modello LLM da usare, nel caso in cui si voglia utilizzare un modello non incluso tra quelli proposti nell'opzione Model. Il modello deve essere installato localmente in Ollama.
Questo valore viene utilizzato solo se nel campo Model è selezionato "custom".

4. **Embedding Model**:
Permette di selezionare, tramite un menu a tendina, il modello da utilizzare per la generazione degli embedding  per la rappresentazione vettoriale dei requisiti
Il menu propone una lista di modelli preinstallati localmente tramite Ollama.
Oltre a questi, è possibile selezionare l’opzione "custom", in tal caso, l’estensione utilizzerà il modello specificato manualmente nel campo Custom-embedding Model.

5. **Custom-embedding Model**:
Campo utilizzato per indicare manualmente il nome di un modello embedding da usare, nel caso in cui si voglia utilizzare un modello non incluso tra quelli proposti nell'opzione Embedding Model.
Il modello deve essere installato localmente in Ollama.
Questo valore viene utilizzato solo se nel campo Embedding Model è selezionato "custom".

6. **Temperature**:
Imposta il livello di creatività del modello LLM durante la generazione del testo. Valori più alti producono risposte più variate e creative, mentre valori più bassi rendono le risposte più coerenti e deterministiche.
Esempi:
  - 0.2 -> Risposte precise e ripetibili.
  - 0.7 -> Risposte più libere e diversificate.

7. **Bearer Token**:
Campo facoltativo per inserire un token di autenticazione da utilizzare per comunicare con un server esterno sicuro, utile se l'Endpoint punta a un server remoto protetto.
Se si utilizza Ollama in locale e senza autenticazione, questo campo può essere lasciato vuoto.


#### Configurazioni del progetto

[SCREEN CONF PROGETTO]

Oltre alle impostazioni globali, Requirement Tracker consente di definire configurazioni specifiche per ogni progetto. Queste impostazioni locali risiedono nel file 
"config.json" all'interno del progetto stesso, e permettono di personalizzare il comportamento dell’estensione in maniera più mirata, adattandolo alle esigenze del singolo contesto di sviluppo.
Tutti i campi descritti di seguito sono opzionali, ad eccezione di quelli utilizzati all'interno della sezione filters (che verranno approfonditi in una sezione dedicata).
Dettgli delle imposazioni disponibili.
1. **endpoint**: 
URL dell'endpoint del server Ollama a cui l'estensione si connette per effettuare le richieste.
  - Default: http://127.0.0.1:11434 (esecuzione locale)
  - Può essere sostituito con un URL remoto se si usa server esterno

2. **model**: 
Permette di selezionare, tramite un menu a tendina, il modello LLM da utilizzare come predefinito per le funzionalità dell'estensione. 
Il menù propone una lista di modelli preinstallati disponibili localmente tramite Ollama e oltre a questi è possibile selezionare "custom", in questo caso l'estensione userà un modello specificato manualmente dall'utente nel campo Custom-model.

3. **Embedding Model**:
Permette di selezionare, tramite un menu a tendina, il modello da utilizzare per la generazione degli embedding  per la rappresentazione vettoriale dei requisiti
Il menu propone una lista di modelli preinstallati localmente tramite Ollama.
Oltre a questi, è possibile selezionare l’opzione "custom", in tal caso, l’estensione utilizzerà il modello specificato manualmente nel campo Custom-embedding Model.

4. **Bearer Token**:
Campo facoltativo per inserire un token di autenticazione da utilizzare per comunicare con un server esterno sicuro, utile se l'Endpoint punta a un server remoto protetto.
Se si utilizza Ollama in locale e senza autenticazione, questo campo può essere lasciato vuoto.

5. **Temperature**:
Imposta il livello di creatività del modello LLM durante la generazione del testo. Valori più alti producono risposte più variate e creative, mentre valori più bassi rendono le risposte più coerenti e deterministiche.
Esempi:
  - 0.2 -> Risposte precise e ripetibili.
  - 0.7 -> Risposte più libere e diversificate.

6. **promptRequirementAnalysis**: 
definisce il prompt utilizzato dal modello per analizzare i requisiti rispetto al codice sorgente.
Questo prompt guida il comportamento del modello nella fase in cui, partendo da un file CSV contenente i requisiti, l’estensione verifica se questi sono stati implementati nel codice.
Il testo può essere personalizzato per adattarsi al contesto del progetto per ricevere risposte più puntuali.

7. **maxResults**: Definisce il numero massimo di risultati restituiti dal modello durante l'analisi dei requisiti.
Questo valore serve a limitare il numero di possibili corrispondenze tra requisiti e codice sorgente, evitando un sovraccarico di informazioni non rilevanti.
Per esempio, se il valore è impostato a 5, il modello restituirà al massimo cinque possibili implementazioni o riferimenti nel codice per ciascun requisito.

#### Configurazione filtri

[SCREEN CONFIGURAZIONE FILTRI]

All’interno del file .json di configurazione locale (lo stesso utilizzato per le impostazioni del progetto), è presente una sezione dedicata chiamata filters.
Questa sezione consente di controllare in modo preciso quali file analizzare, quali escludere e dove cercare l’implementazione dei singoli requisiti.
L’utilizzo dei filtri permette di affinare i risultati dell’analisi, evitando file irrilevanti e concentrando il processo solo sulle parti di codice realmente interessanti per il tracciamento dei requisiti.

Tipologie di filtri disponibili:       

`path`:
Consente di specificare quali file o cartelle includere o escludere dall’analisi.
```
<pre> <code>  "path": {
      	"include": ["Src/main.c"],
      	"exclude": []
    },   </code> </pre>
```
- **include**: elenco di file o directory da considerare.
- **exclude**: elenco di file o directory da ignorare.
Se entrambi sono presenti, il filtro exclude ha priorità.

`file_extension`:
Filtra i file in base alla loro estensione.
```
<pre> <code>  "file_extension": {  
     	 "include": ["c", "h"],  
     	 "exclude": ["md", "txt"]
    }   </code> </pre>
```
- **include**: solo i file con queste estensioni verranno analizzati.
- **exclude**: i file con queste estensioni verranno ignorati.

`requirements`:
Permette di associare ogni requisito (identificato tramite ID) a uno o più percorsi specifici del codice in cui cercarne l’implementazione.
```
<pre> <code>  "requirements": {
      	"{DEA4AB3D-B7F5-4ac6-A522-27D8FD6DA667}": {
        	"search_path": ["Src/main.c"]
      	},
      	"{1CC22054-EC4F-4a9b-9FAC-A4288B537E32}": {
        	"search_path": ["Src/stm32g0xx_it.c"]
      	}
    } </code> </pre>
```
- Ogni chiave corrisponde all’ID di un requisito.
- **search_path**: elenco dei file nei quali verificare l’implementazione del requisito.

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

Gestione degli errori
Durante l’utilizzo dell’estensione possono comparire diversi messaggi di errore. Di seguito trovi un elenco dei più comuni, con una breve descrizione e cosa fare per risolverli.

#### Token mancante o non valido

<img src="/img/Errors/chat-missing-bearer-token-error.png" alt="Invalid or missing authentication token" data-width="70%" />

Descrizione: Il messaggio è restituito dal modello LLM direttamente nella chat. Indica che non è stato possibile generare embeddings per la richiesta a causa di un token mancante o non valido.
Origine possibile: il backend del modello richiede un token per l’elaborazione semantica delle richieste, ma tale token non è stato fornito o è scaduto/non corretto.

#### Modello non trovato (all’avvio dell’estensione)

<img src="/img/Errors/extension-init-model-not-found-error.png" alt="System check failed: Failed to generate response" data-width="70%" />

Descrizione: L’estensione non è riuscita ad avviare correttamente il modello specificato (gemma3) durante il controllo iniziale.
Origine possibile: il modello non è presente localmente o non è stato correttamente scaricato (comando: ollama pull gemma3).

#### Nessun file aperto

<img src="/img/Errors/interrogate-command-without-file-open-error.png" alt="No active editor found" data-width="70%" />

Descrizione: Il comando richiede un file aperto nell’editor, ma nessun file è attivo.
Origine possibile: l’editor di Visual Studio Code non ha un file sorgente attualmente aperto.

#### Nessun file requisiti caricato

<img src="/img/Errors/interrogate-without-requirements-error.png" alt="Please load requirements file first in the Requirements Tracker view" data-width="70%" />

Descrizione: Non è stato caricato un file contenente i requisiti nel tracker.
Origine possibile: l’interazione è avvenuta prima di importare un file di requisiti (CSV o ReqIF).

#### Modello mancante in chat

<img src="/img/Errors/model-not-found-chat-error.png" alt="model not found" data-width="70%" />

Descrizione: La generazione della risposta non è riuscita perché il modello non è stato trovato.
Origine possibile: il modello indicato non è disponibile o non è stato caricato nel sistema.

#### Connessione a Ollama fallita

<img src="/img/Errors/model-not-found-error.png" alt="Failed to connect to Ollama service" data-width="70%" />

Descrizione: Il sistema non riesce a connettersi al servizio Ollama per il modello specificato.
Origine possibile: il servizio è attivo, ma il modello richiesto non è stato trovato.

#### Errore durante il download del modello

<img src="/img/Errors/model-pull-error.png" alt="Failed to pull model" data-width="70%" />

Descrizione: Il tentativo di scaricare il modello è fallito perché non è stato trovato.
Origine possibile: il nome del modello è errato o non è disponibile nei repository remoti.

#### Nessun testo selezionato per il puntatore

<img src="/img/Errors/no-selected-test-in-document-selection-command-error.png" alt="No text selected" data-width="70%" />

Descrizione: Nessun testo è stato selezionato al momento dell’esecuzione del comando.
Origine possibile: il comando richiede la selezione di almeno una riga di codice.

#### CSV non valido

<img src="/img/Errors/parsing-error.png" alt="Invalid CSV format: Missing header or data" data-width="70%" />

Descrizione: Il file CSV importato non ha un formato valido: mancano intestazioni o dati.
Origine possibile: il file è incompleto, vuoto o strutturato in modo non conforme.

<img src="/img/Errors/parsing-error-2.png" alt="Invalid CSV format: Expected 2 columns but found 4 at line 2" data-width="70%" />

Descrizione: Il file CSV non ha il numero di colonne previsto.
Origine possibile: Il file contiene una struttura diversa da quella attesa (ad esempio, più colonne del previsto).

#### ReqIF non valido

<img src="/img/Errors/reqif-parsing-error.png" alt="Failed to parse ReqIF" data-width="70%" />

Descrizione: Il file ReqIF non è stato interpretato correttamente a causa di un formato XML non valido.
Origine possibile: Sono presenti caratteri non ammessi prima dell’inizio del documento XML o il contenuto non è conforme alla sintassi ReqIF.

#### Nessun modello selezionato

<img src="/img/Errors/unavailable-custom-model-error.png" alt="Cannot proceed without model, please select an available model" data-width="70%" />

Descrizione: L’azione richiede un modello, ma nessun modello è stato selezionato.
Origine possibile: nessun modello è attualmente configurato nell’estensione.

<!-- ::: {.no-export} -->
</NumberedWrapper>
<!-- ::: -->
