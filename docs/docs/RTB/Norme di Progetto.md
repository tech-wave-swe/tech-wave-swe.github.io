---
id: norme_di_progetto
title: "Norme di Progetto"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.8
classification: Interno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento delle Norme di %%Progetto|progetto%%

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                        | Autore         | Data Verifica | Verificatore          |
| ---------- | -------- | -------------------------------------------------- | -------------- | ------------- | --------------------- |
| 27/02/2025 | 1.8      | Revisione del documento                            | Carraro Agnese | 28/02/2025    |                       |
| 23/02/2025 | 1.7.1    | Procedure per la rendicontazione delle ore         | Pistori Gaia   | 25/02/2025    | Carraro Agnese        |
| 20/02/2025 | 1.7.0    | Aggiunto tracciamento e rendicontazione delle ore  | Marcon Giulia  | 25/02/2025    | Carraro Agnese        |
| 06/02/2025 | 1.6.0    | Aggiunta processi di Supporto                      | Monetti Luca   | 08/02/2025    | Carraro Agnese        |
| 20/01/2025 | 1.5.0    | Aggiunta processi Primari                          | Pistori Gaia   | 21/01/2025    | Monetti Luca          |
| 30/12/2024 | 1.4.0    | Completamento processi Organizzativi               | Carraro Agnese | 30/12/2024    | Pistori Gaia          |
| 27/12/2024 | 1.3.0    | Corretta la formattazione del documento            | Monetti Luca   | 28/12/2025    | Pistori Gaia          |
| 19/12/2024 | 1.2.0    | Revisione struttura + Aggiunta sezione GitHub      | Monetti Luca   | 22/12/2024    | Vasquez Manuel Felipe |
| 20/11/2024 | 1.1.0    | Aggiunta sezione 4                                 | Piola Andrea   | 03/12/2024    | Pistori Gaia          |
| 14/11/2024 | 1.0.0    | Prima stesura del documento con indice e sezione 1 | Piola Andrea   | 19/11/2024    | Pistori Gaia          |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>

<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del Documento

Lo scopo del documento è quello di definire le norme che ogni componente del gruppo TechWave dovrà rispettare per ottenere un %%prodotto|prodotto%% finale fatto a regola d'arte. In questo documento, inoltre, vengono descritte le convenzioni da rispettare nell'utilizzo degli strumenti e vengono esposti i %%processi|processo%% che saranno adottati dal gruppo. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del %%progetto|progetto%% possono cambiare oppure si possono aggiungere/rimuovere le norme a seconda delle necessità.

### Scopo del %%Prodotto|prodotto%%

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i %%requisiti|requisito_software%% necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **_Requirement Tracker - Plug-in VSCode_** propone lo sviluppo di un %%plugin|plugin%% per %%VSCode|vscode%% che permetta di tracciare i %%requisiti|requisito_software%% derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari %%requisiti|requisito_software%% in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti in blu.

### Riferimenti

Riferimenti normativi:

- %%Capitolato|capitolato%% d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Corso di Ingegneria del software - Regolamento di %%Progetto|progetto%%

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/PD1.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/PD1.pdf)

Riferimenti informativi:

- Corso di Ingegneria del software - %%Processi|processo%% di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

## 2 %%Processi|processo%% Primari

### 2.1 Fornitura

Il %%processo|processo%% di fornitura definisce un insieme di metodi, pratiche e procedure finalizzati a garantire la consegna del %%prodotto|prodotto%% software richiesto dal %%committente|committente%%.
Questo %%processo|processo%% si occupa del monitoraggio e del coordinamento delle %%attività|attività%% svolte dal gruppo durante l'intero ciclo di vita del %%prodotto|prodotto%%, assicurando che il risultato finale sia conforme alle aspettative del %%committente|committente%%.

### %%Attività|attività%%

Il %%processo|processo%%, durante il ciclo di vita del software affronta varie fasi:

1. **Avvio del %%progetto|progetto%%**:
   Le prime %%attività|attività%% da svolgere riguardano l'individuazione delle necessità e dei %%requisiti|requisito_software%% del cliente. Queste informazioni si ottengono inizialmente dal %%Capitolato|capitolato%% per poi essere definite con maggiore dettaglio tramite colloqui o email.
2. **Preparazione della risposta alle richieste**:
   In seguito, vengono create delle proposte che rispondano alle richieste del cliente. In esse verranno definiti i %%requisiti|requisito_software%% e le condizioni contrattuali. Questa fase è particolarmente utile per stabilire quali punti sono di maggiore interesse per il cliente e quali sono più facilmente implementabili dal team.
3. **Contrattazione**:
   In questa %%attività|attività%% avviene la negoziazione dei termini contrattuali e viene stabilito un accordo sui %%requisiti|requisito_software%% del %%progetto|progetto%% e sulle condizioni di consegna.
4. **Pianificazione**:
   Una volta definite le aspettative del cliente si avvia la pianificazione. Questa è un'%%attività|attività%% cruciale che porta alla creazione del documento di Piano di %%Progetto|progetto%% nel quale vengono definiti i tempi, le risorse e i costi come specificato nel paragrafo [3.1.5.1.8](#documento-di-piano-di-progetto).
5. **Esecuzione e controllo**:
   In questa fase viene attuato quanto definito dal documento del Piano di %%Progetto|progetto%%. Le %%attività|attività%% svolte richiedono una supervisione, sia per controllare il rispetto delle tempistiche, sia per accertarsi dell'effettivo rispetto del Piano di Qualifica.
6. **Revisione e valutazione**:
   Durante il ciclo di vita del software saranno necessarie revisioni periodiche per valutare lo stato del %%progetto|progetto%%, sia in termini di obiettivi conclusi sia per individuare il prima possibile eventuali problemi o %%rischi|rischio%% e attuare strategie risolutive.
7. **Consegna e completamento**:
   Il %%prodotto|prodotto%% software e la sua documentazione, una volta completata la validazione, verranno consegnate al cliente.

### Comunicazione con l'azienda

L'intero %%progetto|progetto%% è accompagnato da una forte e costante comunicazione con l'azienda. Questo è necessario sia per avere una definizione chiara delle esigenze, sia per ottenere feedback di quanto %%prodotto|prodotto%% nelle varie fasi per accertarsi che siano allineate con le aspettative.

All'azienda viene fornito un puntatore contenente tutta la documentazione di %%progetto|progetto%% prodotta. In particolare, hanno maggiore interesse:

- I **%%verbali|verbale%% esterni** che riassumono quanto definito durante il meeting e che necessitano la firma dell'azienda in quanto fonte per la definizione dei %%requisiti|requisito_software%%;
- Il documento di **Analisi dei %%Requisiti|requisito_software%%**;
- Il documento di **Piano di %%Progetto|progetto%%**.

### Strumenti

Lo scambio di informazioni avviene tramite l'uso di molteplici piattaforme:

- **%%Zoom|zoom%%** meeting per fare videochiamate, sia conoscitive, che di avanzamento solitamente svolte alla fine di ogni %%sprint|sprint%%;
- Servizio interno dell'azienda per la prenotazione dei meeting;
- **Google Gmail** per l'invio di %%verbali|verbale%% e documenti e principale piattaforma per la comunicazione asincrona;
- **Git** per la consegna del %%PoC|poc%% e del %%prodotto|prodotto%% finito;
- **%%Miro|miro%%**, una board virtuale utilizzata per lo scambio rapido di informazioni e risorse;
- **Google slides** per la creazione di presentazioni in supporto alle videochiamate.

### Sviluppo

Il %%processo|processo%% di sviluppo riguarda l'effettiva realizzazione del %%prodotto|prodotto%% software. Le %%attività|attività%% fondamentali sono:

- **%%Analisi dei Requisiti|analisi_dei_requisiti%%**:
  in seguito ad un brainstorming interno al team, avviene la definizione delle aspettative del %%prodotto|prodotto%% software. Viene redatto il documento di Analisi dei %%requisiti|requisito_software%% come specificato nel paragrafo [3.1.5.1.7](#documento-di-analisi-dei-requisitianalisi_dei_requisiti).

#### Strumenti

Per la creazione dei diagrammi UML è stato utilizzato **StarUML**.

## %%Processi|processo%% di Supporto

### Documentazione

#### Introduzione

Il %%processo|processo%% di documentazione mira a raccogliere, organizzare e rappresentare in forma scritta tutte le informazioni prodotte da un %%processo|processo%% o da un'%%attività|attività%% durante il ciclo di vita di un %%prodotto|prodotto%% software. La documentazione prodotta ha lo scopo di fornire una comprensione del %%prodotto|prodotto%% a sviluppatori, distributori ed utenti senza la necessità di supporto umano.
Le norme definite all'interno di questo documento saranno applicate da tutti i membri del gruppo per la redazione e la modifica di tutta la documentazione prodotta.
Si intende adottare un approccio **Documentazione come Codice** per la redazione della documentazione. Questo consiste nel trattare la documentazione di un %%progetto|progetto%% software alla stregua del codice sorgente del %%prodotto|prodotto%% tramite l'utilizzo di pratiche e strumenti tipici dello sviluppo software.
L'approccio **Documentazione come Codice** permette di ottenere una migliore tracciabilità delle modifiche, maggiore coerenza e una facile manutenzione tramite l'utilizzo di:

- %%Versionamento|versionamento%%
- Automazioni
- Integrazione Continua

#### Sorgente Documenti

La documentazione sarà redatta utilizzando il linguaggio **MarkDown** la cui semplicità consente di velocizzare il processo di scrittura garantendo, al contempo, la portabilità e la facilità di conversione in formati diversi.

La documentazione prodotta, archiviata nello stesso %%repository|repository%% del %%progetto|progetto%%, è pensata per essere visualizzata tramite un sito web generato a partire dai file sorgenti tramite l'utilizzo di **%%Docusaurus|docusaurus%%**. Ogni documento è formato da un singolo file sorgente a partire da un template predefinito.

#### Ciclo di vita dei Documenti

Il ciclo di vita dei documenti può essere rappresentato come una sequenza di %%attività|attività%%. Adattando un approccio incrementale alla redazione della documentazione queste fasi vengono ripetute in modo ciclico:

1. **Redazione**: Ogni documento viene redatto osservando la sua struttura, specificata nella sezione corrispondente, e le norme definite.
2. **%%Verifica|verifica%%**: Al termine della fase precedente il documento viene revisionato dai verificatori che assicurano il rispetto delle norme e degli standard di %%qualità|qualità%% definiti.
3. **Approvazione**: Al termine della fase precedente il Responsabile di %%Progetto|progetto%% approva il documento che verrà quindi inserito nel branch di rilascio del %%repository|repository%% dove verrà compilato, tramite automazione, e distribuito nelle varie forme definite.

#### Procedure correlate alla redazione dei documenti

##### Redattore

Il redattore è responsabile della redazione o modifica di un documento o di una sua sezione. Adottando un approccio **Documentazione come Codice** si utilizza il workflow **GitFlow** definito nella sezione [4.3](#tracciamento-e-rendicontazione-delle-ore).

###### Redazione di un nuovo documento o modifica di un documento esistente

Partendo dal branch develop del %%repository|repository%% il redattore crea un nuovo branch seguendo la procedura definita nella sezione [3.2.6.1](#creazione-di-un-nuovo-branch-di-sviluppo).
Dopo aver creato o modificato il documento è necessario portare le modifiche in remoto:

```bash
git add .
git commit -m "[xxx] Esempio di commit"
git push origin  TWD-xx-Esempio-di-branch
```

##### Modifica ad un documento in stato di redazione

Se più redattori lavorano allo stesso ticket dovranno apportare le modifiche all'interno dello stesso branch:

```bash
git fetch
git checkout  TWD-xx-Esempio-di-branch
git pull
```

Se più redattori lavorano nello stesso documento su ticket differenti lavoreranno su due branch distinti utilizzando la metodologia descritta nella sezione [3.1.4.1.1](#redazione-di-un-nuovo-documento-o-modifica-di-un-documento-esistente).

##### Completamento %%attività|attività%% di redazione

Al termine dell'%%attività|attività%% richiesta dal ticket il documento deve essere versionato e sottoposto a %%verifica|verifica%% da parte di un revisore.
Il redattore:

1. Aggiorna il registro modifiche, sezione [3.1.5.1.5](#registro-delle-modifiche), inserendo i dati richiesti in una nuova riga.
2. Incrementa la versione del documento sia nel registro modifiche sia nei metadati utilizzando la convenzione definita in [3.2.5.2](#sistema-di-versionamento).
3. Porta le modifiche nella %%repository|repository%% remota utilizzando la metodologia descritta in [3.1.4.1.1](#redazione-di-un-nuovo-documento-o-modifica-di-un-documento-esistente).
4. Crea una Pull Request verso develop seguendo la procedura definita nella sezione [3.2.6.2](#creazione-di-una-nuova-pull-request).

Se il documento viene approvato lo stato del ticket diventa "ToDeploy" ed il codice sorgente viene unito a develop. In caso contrario il redattore deve modificare il documento seguendo le indicazioni dei revisori e ripetere la procedura precedente.

#### Struttura del documento

Ogni documento %%prodotto|prodotto%% possiede una struttura prefissata che ne garantisce la coerenza ed il rispetto delle norme definite.

##### Metadati

Ogni file sorgente contiene una sezione dedicata alla definizione dei metadati del documento. Questa sezione fornisce una serie di informazioni aggiuntive e strutturate utilizzate per gestire dettagli relativi al ciclo di vita di un documento. Questi metadati possono essere utilizzati per generare automaticamente la documentazione in formato pdf e le pagine web accessibili attraverso il sito dedicato.

Di seguito vengono elencati tutti i metadati utilizzabili all'interno dei documenti divisi in due categorie:

- **Obbligatori**: Necessario inserire questi metadati all'interno dei documenti per eseguire correttamente il processo di build.
- **Opzionali**: Metadati che modificano lo stile di documento generato o alcune sue %%funzionalità|funzionalità%%.

**Obbligatori**:

- **id**: Questo campo definisce l'id associato al documento. Viene visualizzato nel URL della pagina corrispondente. Per convenzione viene scritto utilizzando solo caratteri minuscoli sostituendo gli spazi con il carattere "\_".
- **title**: Rappresenta il titolo del documento. Visualizzato come nome del documento all'interno della sidebar del sito web.
- **documentclass**: Questo campo definisce la classe del documento utilizzata per la generazione del pdf. L'unica classe disponibile al momento è **TWDocumentFull**.
- **version**: Rappresenta la versione del documento e deve corrispondere alla versione indicata nella prima riga della tabella changelog.
- **classification**: Rappresenta la classificazione del documento. Un documento può essere **Interno** o **Esterno**.

**Opzionali**:

- **toc**: Se impostato al valore true indica che il documento pdf generato deve contenere una Tabella dei contenuti.
- **lof**: Se impostato al valore true indica che il documento pdf generato deve contenere una Tabella delle figure.
- **numbersections**: Se impostato al valore true indica che il documento pdf generato deve avere la titolazione numerata.
- **show-partecipants**: Se impostato al valore true indica che il documento pdf generato deve mostrare una lista dei partecipanti.
- **participants**: Metadato presente solo all'interno dei %%verbali|verbale%% interni ed esterni. Rappresenta i membri del gruppo presenti durante il meeting. Deve essere scritto utilizzando il seguente formato:

```markdown
partecipants:

- name: Cognome Nome
  status: present | absent
```

- **duration**: Metadato presente solo all'interno dei %%verbali|verbale%% interni ed esterni. Rappresenta la durata della riunione scritta nel formato **\[numero ore\]h**.

###### Intestazione

In ogni pagina del documento, fatta eccezione per il frontespizio, è presente un'Intestazione che presenta il logo del gruppo sul lato sinistro.

###### Piè di pagina

In ogni pagina del documento, fatta eccezione per il frontespizio, è presente un Piè di Pagina che presenta:

- La dicitura: Nome del gruppo - Titolo del documento / versione del documento sul lato sinistro.
- Il numero di pagina sul lato destro.

###### Frontespizio

Il Frontespizio, la prima pagina del documento, presenta:

- Il **logo di Unipd** nella parte sinistra della prima sezione.
- Il **logo** del gruppo **TechWave** sulla parte destra della prima sezione.
- La **email** del gruppo **TechWave**.
- Il **titolo** del **documento**.
- La sezione **dettagli documento**.

La sezione dettaglio documento contiene le informazioni principali del documento:

- **Redatto da:** rappresenta il redattore principale del documento. In caso di omissione il documento è da intendere come redatto da diversi membri del gruppo.
- **Revisionato da**: rappresenta i verificatori che hanno revisionato il documento. In caso di omissione il documento è da intendere come revisionato da diversi membri del gruppo.
- **Durata riunione**: rappresenta la durata effettiva della riunione descritta nel documento. Presente solamente all'interno dei verbali interni ed esterni.
- **Classificazione**: rappresenta la classificazione del documento. Può assumere i valori Interno ed Esterno.
- **Versione**: Rappresenta la versione del documento corrente. Corrisponde alla versione presente nella prima riga del registro delle modifiche.

###### Toc e Lof

Il TOC (Tabella dei contenuti) rappresenta l'indice della pagina. La sua presenza agevola la navigazione all'interno del documento e ne fornisce una visione d'insieme. Deve essere presente in tutti i documenti fatta eccezione per:

- %%Verbali|verbale%% Interni
- %%Verbali|verbale%% Esterni
- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

La LOF (Elenco delle figure) rappresenta tutte le immagini presenti all'interno del documento riportandone il titolo e la pagina in cui si trova. Deve essere presente in tutti i documenti fatta eccezione per:

- %%Verbali|verbale%% Interni
- %%Verbali|verbale%% Esterni
- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

Sia il TOC sia la LOF sono generate, tramite automazione, a seguito dell'approvazione del documento e del suo passaggio al branch principale. La loro presenza deve essere dichiarata nei metadati del documento (vedi paragrafo Opzionali sulla sezione [3.1.5.1](#metadati)).

###### Registro delle modifiche

Il Registro delle modifiche, indicato con Changelog all'interno dei documenti, rappresenta la storia del documento. Viene rappresentato sotto forma di tabella nella quale ogni riga contiene:

- **Data Modifica**: Data in cui il documento è stato modificato.
- **Versione**: Versione del documento a seguito della modifica.
- **Descrizione**: Descrizione della modifica apportata.
- **Autore modifica**: Redattore della modifica.
- **Data %%Verifica|verifica%%**: Data in cui il documento è stato verificato.
- **Autore %%Verifica|verifica%%**: Revisione della modifica.

Il Registro delle modifiche è presente in ogni documento fatta eccezione per:

- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

###### %%Verbali|verbale%%

I %%verbali|verbale%% sono documento redatti a seguito di riunioni interne o esterne e ne riportano le discussioni e le decisioni prese. Sono composti da:

- **Tabella dei partecipanti**: Indica le presenze / assenze dei membri del gruppo alla riunione.
- **Ordine del giorno**: Indica i temi principali trattati durante la riunione.
- **Resoconto**: Descrive sinteticamente la riunione.
- **Conclusioni Raggiunte**: Rappresenta in forma schematica e riferibile le conclusioni raggiunte al termine della riunione.
- **Firma**: Presente solo nei %%verbali|verbale%% Esterni.

  Il nome del file deve rispettare la seguente struttura: AAAA-MM-GG_ID.md dove

  - **AAAA-MM-GG**: Data della riunione
  - **ID**: Indice progressivo che rappresenta il %%verbale|verbale%%.

###### Documento di Analisi dei %%Requisiti|requisito_software%%

Il documento dell'Analisi dei %%Requisiti|requisito_software%% è il risultato di quanto svolto nell'%%attività|attività%% omologa. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del %%prodotto|prodotto%%**.
- la **lista dei %%requisiti|requisito_software%%**, ciascuno associato ad un identificativo univoco e classificati per:
  - **tipologia**:
    - **Funzionali**: %%funzionalità|funzionalità%% che l'%%Applicativo|applicativo%% deve fornire.
    - **Tecnici**: vincoli riguardo le tecnologie che l'%%Applicativo|applicativo%% deve utilizzare.
    - **Qualitativi**: vincoli riguardo obiettivi minimi di %%qualità|qualità%%.
  - **obbligatorietà**:
    - **Obbligatori**: irrinunciabile per qualcuno degli stakeholder.
    - **Desiderabili**: non strettamente necessario ma con valore aggiunto riconoscibile.
    - **Opzionali**: utile o contrattabile più avanti.
- la **lista degli %%Use Case|use_case%%**, ciascuno descritto tramite il rispettivo %%use case|use_case%% diagram (UML) e accompagnato dalla sua descrizione testuale dove vengono specificati:
  - **Attori primari**: utente principale.
  - **Attori secondari** \[se presenti\]: utente secondario.
  - **Precondizioni**
  - **Postcondizioni**
  - **Scenario principale**
  - **User story**
  - **Generalizza** \[se presente\]: %%use case|use_case%% genitore.
  - **Estensioni** \[se presenti\]: %%use case|use_case%% che arrivano dal costrutto extend.

###### Documento di Piano di %%Progetto|progetto%%

Il documento di Piano di %%Progetto|progetto%% rappresenta tutta la parte di pianificazione e di analisi del %%progetto|progetto%% prodotta dal responsabile. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del %%prodotto|prodotto%%**.
- una sezione contenente l'**analisi dei %%rischi|rischio%%**: in essa è presente la lista dei %%rischi|rischio%% raggruppati per tipologia: organizzativi ed interpersonali, tecnologici. Per ciascun %%rischio|rischio%% viene specificata la descrizione, il grado di %%rischio|rischio%%, la sua pericolosità e una %%mitigazione|mitigazione%%.
- una sezione dedicata al **modello di sviluppo scelto**, ovvero %%SCRUM|scrum%%, e la **lista degli %%sprint|sprint%%** svolti.
- una sezione contenente il **%%preventivo|preventivo%% dei costi e delle ore** di ciascun ruolo definite al momento della pianificazione dello %%sprint|sprint%%.
- una sezione contenente il **%%consuntivo|consuntivo%% dei costi e delle ore** effettivamente svolte da ciascun ruolo, calcolate durante la %%retrospettiva|retrospettiva%%.

##### Piano di Qualifica

Il Piano di Qualifica contiene tutte le strategie di %%verifica|verifica%% e validazione utilizzate all'interno del ciclo di vita del %%progetto|progetto%% al fine di garantire la conformità del %%prodotto|prodotto%% alle aspettative del %%committente|committente%%.

##### Glossario

Il Glossario contiene tutte le definizioni dei termini utilizzati all'interno della documentazione del %%progetto|progetto%% al fine di evitare ambiguità e chiarire l'utilizzo di una terminologia specifica.

#### Regole tipografiche

##### Stile del testo

L'utilizzo della formattazione all'interno della documentazione assume significati differenti a seconda del tipo di visualizzazione.

Per la visualizzazione all'interno del sito web:

- Grassetto:
  - Parole o frasi di rilievo
  - Titoli delle sezioni
- Corsivo:
  - Parole o frasi enfatizzate
- Grassetto colorato:
  - Parola appartenente al glossario
- Corsivo colorato:
  - Link

Per i documenti in versione pdf:

- Grassetto:
  - Parole o frasi di rilievo
  - Titoli delle sezioni
- Corsivo:
  - Parole o frasi da enfatizzare
- Corsivo seguito da pendice \[G\]:
  - Parola appartenente al glossario

#### Strumenti

Gli strumenti utilizzati per le %%attività|attività%% di redazione dei documenti sono i seguenti:

- **%%GitHub|github%%**: Utilizzato per il %%versionamento|versionamento%%, la distribuzione e la compilazione dei documenti.
- **Markdown**: Utilizzato per la redazione dei documenti.
- **%%VSCode|vscode%%**: Editor di testo utilizzato per la scrittura dei documenti.
- **Pandoc**: Utilizzato per la conversione da Markdown a PDF.
- **%%Docusaurus|docusaurus%%**: Utilizzato per la generazione di un sito statico a partire da file Markdown.

### %%Verifica|verifica%%

#### Introduzione

Il %%processo|processo%% di %%verifica|verifica%% si pone l'obiettivo di garantire che ogni %%prodotto|prodotto%% o servizio di un %%processo|processo%% o di un %%progetto|progetto%% sia conforme ai %%requisiti|requisito_software%% specificati. Questo %%processo|processo%% accompagna l'intero ciclo di vita di un %%prodotto|prodotto%% software fino alla fase di manutenzione.

La %%verifica|verifica%% viene eseguita su tutti i %%processi|processo%% in esecuzione al raggiungimento di un sufficiente grado di maturità. Seguendo le linee guida, definite all'interno del Piano di Qualifica, viene analizzata la %%qualità|qualità%% dei %%prodotti|prodotto%% e dei %%processi|processo%% al fine di garantire la conformità agli standard di %%qualità|qualità%% definiti.

Le %%attività|attività%% di %%verifica|verifica%% sono svolte dai verificatori seguendo l'ordine indicato dal **Modello a V** ed i %%requisiti|requisito_software%% di %%qualità|qualità%% definiti all'interno del Piano di Qualifica.

#### %%Verifica|verifica%% dei documenti

Il verificatore ha il compito di effettuare la revisione dei documenti al termine della loro redazione al fine di garantire la %%qualità|qualità%% e la conformità alle norme del loro contenuto.

Quando il redattore termina la sua %%attività|attività%% e crea una Pull Request (vedi sezione [3.1.4.3](#completamento-attività-di-redazione)) il verificatore assegnato riceve una e-mail. Il verificatore può visualizzare le modifiche apportate all'interno della scheda "Pull Request" presente nella pagina %%GitHub|github%% del %%progetto|progetto%%.

Per verificare un documento è necessario revisionare:

- **Correttezza Tecnica**: Verificare che la Pull Request rispetti gli standard di nomenclatura, sia richiesta l'unione con il branch develop, non siano presenti conflitti con l'attuale stato del branch e tutti i %%test|test%% automatici siano stati eseguiti con successo.
- **Conformità alle norme**: Verificare che il documento segua le linee guida definite dagli standard per la formattazione, la struttura e lo stile.
- **Consistenza**: Verificare che il contenuto del documento sia consistente con tutti gli altri documenti presenti.
- **Comprensibilità**: Verificare che il documento sia chiaro, comprensibile e non ambiguo. Il documento non deve contenere errori grammaticali e/o ortografici.

Al termine, se questi criteri sono soddisfatti, il verificatore deve approvare la Pull Request ed effettuare l'unione sul branch develop. In caso contrario il verificatore ha il compito di inserire commenti e suggerimenti sulle modifiche da apportare.

Questo processo si ripete fino alla soddisfazione dei criteri di %%qualità|qualità%%.

#### Analisi

##### Analisi Statica

L'Analisi Statica è un'%%attività|attività%% di controllo condotta sul %%prodotto|prodotto%% senza la necessità di eseguirlo. Si basa sull'utilizzo di metodo di lettura, manuali o automatici, che permettono di individuare errori formali, difetti o proprietà indesiderate all'interno dei documenti. Il successo di questa %%attività|attività%% dipende dalla competenza e dall'attenzione dei verificatori coinvolti.

##### Analisi Dinamica

L'Analisi Dinamica è un'%%attività|attività%% di controllo condotta sul %%prodotto|prodotto%% durante la sua esecuzione effettiva al fine di verificarne il corretto funzionamento.

Questa %%attività|attività%% consiste nell'esecuzione di una serie di %%test|test%% al fine di individuare eventuali discrepanze tra risultati previsti e risultati effettivi.

Ogni %%test|test%% deve essere ben definito, deterministico e automatizzato al fine di rendere l'Analisi Dinamica ripetibile ed oggettiva. La definizione di un %%test|test%% corrisponde a:

- Descrizione dell'input
- Descrizione dell'output
- Condizioni di Esecuzione

###### %%Test|test%% di unità

I %%Test|test%% di Unità sono progettati per verificare una singola %%funzionalità|funzionalità%%, in modo isolato dal sistema, al fine di garantire il corretto funzionamento e l'aderenza alle specifiche. Questi %%test|test%% vengono pianificati durante la **Progettazione di Dettaglio**, sono completamente automatizzabili e devono essere eseguiti per primi in quanto verificano il corretto funzionamento della singola unità.

###### %%Test|test%% di integrazione

I %%Test|test%% di Integrazione sono progettati per verificare il corretto funzionamento delle diverse %%funzionalità|funzionalità%% quando sono integrate tra loro. Questi %%test|test%% vengono pianificati durante la fase di Progettazione Architetturale tramite approccio:

- **Top-Down**: Si inizia integrando le componenti di maggior valore esterno effettuando %%test|test%% prolungati sulle %%funzionalità|funzionalità%% principali. Necessita della simulazione di tutte le parti non ancora implementate tramite l'utilizzo di Mock.
- **Bottom-Up**: Si inizia integrando le componenti di basso livello, più lontane dell'utente. Questo riduce la necessità di Mock ma ritarda la %%verifica|verifica%% sulle %%funzionalità|funzionalità%% principali.

###### %%Test|test%% di sistema

I %%Test|test%% di Sistema sono progettati per verificare il sistema nella sua interezza rispetto ai %%requisiti|requisito_software%% software individuati durante l'%%Analisi dei Requisiti|analisi_dei_requisiti%%. Questi %%test|test%% hanno lo scopo di garantire che il %%prodotto|prodotto%% esegua le funzioni previste in modo %%efficace|efficacia%% e affidabile in un ambiente realistico.

###### %%Test|test%% di Accettazione

I %%Test|test%% di Accettazione sono progettati per dimostrare che i %%requisiti|requisito_software%% individuati sono stati soddisfatti e garantire che il %%prodotto|prodotto%% sia conforme alle aspettative degli stakeholder. Questi %%test|test%% vengono eseguiti coinvolgendo gli utenti finali e determinano se il %%prodotto|prodotto%% può essere rilasciato.

###### Codici identificativi

Ad ogni %%test|test%% viene associato un codice identificativo al fine di permettere il riferimento univoco ad un %%test|test%%. Questo codice rispetta la seguente struttura: **T\[ Tipologia \]\[ ID \]**

Dove:

- \[ Tipologia \]: Rappresenta il tipo di %%test|test%%:
  - U: Unità
  - I: Integrazione
  - S: Sistema
  - A: Accettazione
- \[ ID \]: Numero progressivo associato al t%%test|test%%est all'interno del suo tipo.

###### Stato dei %%test|test%%

Ad ogni %%test|test%% viene associato uno stato che ne riflette il risultato di esecuzione all'interno del Piano di Qualifica. Ogni può essere associato con uno di questi stati:

- **NI**: Non implementato
- **S**: Superato
- **NS**: Non Superato

#### Validazione

##### Introduzione

Il %%processo|processo%% di Validazione conferma, tramite una dimostrazione oggettiva, che i requisiti specificati sono stati soddisfatti e che il %%prodotto|prodotto%% software risponde alle esigenze degli utenti finali.

##### Procedura di Validazione

Il %%processo|processo%% di validazione prende come input i %%test|test%% effettuati sul %%prodotto|prodotto%% e valuta:

- Il grado di soddisfacimento dei Casi D'Uso.
- Il grado di soddisfacimento dei %%requisiti|requisito_software%% obbligatori.
- Il grado di soddisfacimento dei %%requisiti|requisito_software%% concordati con il %%committente|committente%%.

Se il %%processo|processo%% ha esito positivo il %%prodotto|prodotto%% risponde in modo adeguato a tutte le esigenze degli utenti inizialmente identificate.

#### Gestione della configurazione

##### Introduzione

Il %%processo|processo%% di Gestione della configurazione si occupa di identificare, organizzare e controllare le modifiche apportate a tutti gli artefatti coinvolti nel ciclo di vita del %%prodotto|prodotto%%.

##### Sistema di %%Versionamento|versionamento%%

Il sistema di %%versionamento|versionamento%% rappresenta le convenzioni utilizzate per la gestione delle versione di tutti i vari artefatti. La struttura utilizzata è rappresentata da: **X.Y.Z**.

- **X (Major)**: Indica una modifica significativa, spesso incompatibile con le versioni precedenti. Introduce nuove %%funzionalità|funzionalità%% o cambiamenti radicali.
- **Y (Minor)**: Indica l'aggiunta o la modifica di una %%funzionalità|funzionalità%% compatibile con le versioni precedenti. Non altera il comportamento esistente.
- **Z (Patch)**: Indica la correzione di un bug o un miglioramento minore che non introduce nuove %%funzionalità|funzionalità%% e non modifica il comportamento esistente.

L'incremento di valori più significativi azzera quelli meno significativi. Tutte le modifiche devono essere riportate all'interno del registro delle modifiche. Ogni documento entra nella %%repository|repository%% con una versione 1.0.0 o superiore.

##### %%Repository|repository%%

Ogni %%progetto|progetto%% sarà interamente contenuto all'interno di un unico %%repository|repository%% al fine di raggruppare tutti i sorgenti necessari all'interno dello stesso archivio.
Di seguito sono elencati tutti i %%repository|repository%% attualmente presenti:

- tech-wave-swe.github.io: %%Repository|repository%% principale che raccoglie tutto il codice sorgente prodotto durante il ciclo di vita del %%progetto|progetto%%. La separazione tra documentazione e software è garantita da una struttura organizzata in cartelle dedicate, mentre l'utilizzo delle %%GitHub Action|github_action%% consente di gestire le diverse automazioni in modo autonomo ed %%efficiente|efficienza%%.
  Riferimento: [https://github.com/tech-wave-swe/tech-wave-swe.github.io](https://github.com/tech-wave-swe/tech-wave-swe.github.io).
- DocumentStyle: Contiene le classi utilizzate per la generazione dei PDF.
  Riferimento: [https://github.com/tech-wave-swe/DocumentStyle](https://github.com/tech-wave-swe/DocumentStyle).

#### Sincronizzazione e Branching

##### Creazione di un nuovo branch di sviluppo

Partendo dal branch develop del %%repository|repository%% il redattore crea un nuovo branch utilizzando l'interfaccia di %%Jira|jira%% o la CLI di %%GitHub|github%%.

Tramite %%Jira|jira%% sarà necessario aprire il ticket corrispondente, selezionare "Create Branch" nella sezione Details >> Development. Nella nuova pagina selezionare la %%repository|repository%% corrente e il branch develop mantenendo il nome assegnato. Selezionare infine "Create Branch".
Tramite CLI di %%GitHub|github%% sarà necessario spostarsi sul branch develop:

```bash
git checkout develop
```

Portare, se presenti, le ultime modifiche in locale:

```bash
git pull origin develop
```

Spostarsi sul nuovo branch utilizzando il seguente formato:

```bash
git checkout -B TWD-xx-Esempio-di-branch
```

##### Creazione di una nuova Pull Request

Le Pull Requests sono un meccanismo che consente di notificare il completamento di una %%funzionalità|funzionalità%% e richiederne la revisione. Un Pull Requesto fornisce un ambiente dedicato per discutere della %%funzionalità|funzionalità%% proposta, fornendo riscontri e apportando le modifiche necessarie.
Per creare una nuova Pull Request:

1. Accedere al %%repository|repository%% %%GitHub|github%% e selezionare la scheda "Pull Request".
2. Selezionare "New Pull Request".
3. Selezionare il branch di partenza ed il branch target, solitamente develop.
4. Cliccare il pulsante "Create Pull Request".
5. Aggiungere un titolo alla Pull Request. Assicurarsi che contenga il codice identificativo di tutti i ticket associati.
6. Aggiungere una descrizione.
7. Selezionare i verificatori.
8. Clicca il pulsante "Create Pull Request".
9. Nel caso siano presenti conflitti seguire le istruzioni in %%GitHub|github%% per rimuovere tali conflitti.

##### Convenzioni sulla nomenclatura dei branch

All'interno di un %%repository|repository%% esistono diverse tipologie di branch:

- **main**: Rappresenta il branch principale. Contiene l'ultima versione approvata del %%prodotto|prodotto%% e della documentazione annessa.
- **develop**: Rappresenta il branch principale di sviluppo. Contiene tutti i file sorgente che hanno passato il %%processo|processo%% di %%verifica|verifica%%. Il branch develop è l'unico branch che può richiedere una Pull Request al branch main.
- **feature**: Ogni branch feature rappresenta una %%funzionalità|funzionalità%% alla quale stanno lavorando uno o più membri del gruppo. Ogni branche feature è legato ad un ticket su %%Jira|jira%% e deve possedere la seguente nomenclatura: **\[CODICE-TICKET\]-\[BREVE-DESCRIZIONE\]**.
  - \[CODICE-TICKET\]: Indica il codice del ticket su %%Jira|jira%% corrispondente.
  - \[BREVE-DESCRIZIONE\]: Indica una breve descrizione del compito.

##### Flusso generale di sviluppo

Per ogni ticket assegnato all'interno di %%Jira|jira%%:

1. Viene creato un nuovo branch seguendo le indicazioni fornite nella sezione [3.2.6.1](#creazione-di-un-nuovo-branch-di-sviluppo).
2. Si effettuano tutte le modifiche necessarie.
3. Si effettua una Pull Request verso develop quando il compito è completato per richiedere la revisione.
4. Se la revisione viene approvata il codice viene unito al branch develop. In caso contrario è necessario ripartire dal punto 2 ed effettuare le modifiche proposte.
5. Al termine dello %%sprint|sprint%% il Responsabile di %%progetto|progetto%% %%verifica|verifica%% tutto ciò che è stato prodotto. In caso di approvazione le modifiche vengono inserite all'interno del branch main.

Durante questo processo la dashboard di %%Jira|jira%% è costantemente aggiornata tramite automazioni. Il ciclo di vita di un ticket viene descritto nella sezione [4.2.2.4](#ciclo-di-vita-di-un-task).

### Risoluzione dei problemi

#### Introduzione

Il %%processo|processo%% di Risoluzione dei Problemi si pone come obiettivo fornire un approccio tempestivo e documentato per analizzare e risolvere i problemi, di qualsiasi natura o fonte, che vengono rilevati durante l'esecuzione degli altri %%processi|processo%%.

Questo %%processo|processo%% non si limita alla sola risoluzione dei problemi ma si propone di identificare le cause e adottare misure preventive per evitarne la ripetizione in futuro promuovendo un ambiente di miglioramento continuo.

#### Gestione dei %%rischi|rischio%%

Il %%processo|processo%% di Gestione dei %%Rischi|rischio%% ha l'obiettivo di identificare, analizzare, trattare e monitorare tutti i potenziali %%rischi|rischio%% di %%progetto|progetto%% associandoli a delle specifiche misure di %%mitigazione|mitigazione%%.

I %%rischi|rischio%% individuati all'interno del %%progetto|progetto%% sono specificati all'interno del Piano di %%Progetto|progetto%% nella sezione dedicata.

##### Codifica dei %%Rischi|rischio%%

Per identificare univocamente ogni %%rischio|rischio%% esso viene associato ad un codice identificativo basato sulla seguente convenzione: **R [ Tipologia ] [ Indice ] - [ Nome Associato ]**, dove:

- \[ Tipologia \] : Rappresenta il tipo di %%rischio|rischio%% descritto.
  - T: %%Rischio|rischio%% Tecnico
  - O: %%Rischio|rischio%% Organizzativo
- \[ Indice \] : Numero progressivo interno alla Tipologia.
- \[ Nome Associato \] : Nome che descrive brevemente il %%rischio|rischio%%.

#### Identificazione dei problemi

Ogni problema identificato durante lo svolgimento del %%progetto|progetto%% da un membro del gruppo deve essere segnalato tramite apertura di un Ticket su %%Jira|jira%% di tipo Bug.

#### Strumenti

- **%%Jira|jira%%**: ITS utilizzato all'interno del %%progetto|progetto%% per il tracciamento delle azioni da svolgere e delle problematiche individuate.

### Gestione della %%qualità|qualità%%

#### Introduzione

Il %%processo|processo%% di Gestione della %%Qualità|qualità%% ha l'obiettivo di garantire la %%qualità|qualità%% del flusso operativo al fine di soddisfare i %%requisiti|requisito_software%% di %%qualità|qualità%% specificati. Questo %%processo|processo%% racchiude quindi tutte le %%attività|attività%% di definizione degli obiettivi di %%qualità|qualità%%, delle metriche e dei criteri di %%qualità|qualità%%, la pianificazione e l'esecuzione del controllo di %%qualità|qualità%% e la %%verifica|verifica%% della %%qualità|qualità%%.

Il %%processo|processo%% di Gestione della %%Qualità|qualità%% interessa tutto il ciclo di vita del software.

#### Piano di Qualifica

Tutte le %%attività|attività%% di definizione, pianificazione, controllo e revisione di %%qualità|qualità%% sono trattate all'interno del documento Piano di Qualifica. All'interno di questo documento sono definite in dettaglio le specifiche di %%qualità|qualità%% del %%prodotto|prodotto%% associate alle azioni di controllo necessarie.

#### PDCA

L'%%attività|attività%% di miglioramento continuo e correzione adotta il ciclo PDCA: una metodologia che consente il controllo ed il miglioramento continuo dei %%processi|processo%% e dei %%prodotti|prodotto%% basato sulle seguenti 4 fasi:

- **Plan**: Pianificazione dei %%processi|processo%% da avviare per raggiungere obiettivi specifici.
- **Do**: Effettiva esecuzione dei %%processi|processo%% pianificati, raccogliendo dati durante lo svolgimento dell'%%attività|attività%%.
- **Check**: Analisi ed interpretazione dei dati raccolti durante l'esecuzione. I dati vengono valutati utilizzando metriche prestabilite e confrontati con gli obiettivi previsti.
- **Act**: Consolidazione delle modifiche risultate positive e implementazione di strategie migliorative per correggere gli aspetti che non hanno funzionato.

#### Strumenti

#### Struttura e identificazione delle metriche

Ogni metrica definita all'interno del Piano di Qualifica è identificata da un codice che rispetta la seguente convenzione: **M \[ Tipologia \] \[ Codice \] \[P|S|Q\] \[ Abbreviazione \]**, dove:

- \[ Tipologia \]: Rappresenta la tipologia di metrica considerata
  - PC
  - PR
- \[ Codice \]: Codice numerico progressivo interno alla Tipologia.
- \[ Abbreviazione \]: Iniziali del nome della metrica.

Ad ogni metrica è inoltre associato:

- **Nome**: Specifica il nome della metrica.
- **Descrizione**: Descrive brevemente la metrica adottata.
- **Formula**: Specifica come viene calcolata la metrica.
- **Valore Accettabile**: Valore che la metrica deve raggiungere per essere considerata conforme agli standard.
- **Valore Preferibile**: Valore ideale che la metrica dovrebbe assumere.

## 4 %%Processi|processo%% Organizzativi

### Introduzione

I %%processi|processo%% organizzativi sono trasversali rispetto al %%progetto|progetto%% e vengono applicati in modo tale da stabilire, controllare e migliorare i %%processi|processo%% del ciclo di vita del software, ai quali, quindi, forniscono il supporto necessario. Questa sezione del Piano di %%Progetto|progetto%% definisce i seguenti %%processi|processo%% organizzativi: gestione dei %%processi|processo%%, infrastruttura, miglioramento dei %%processi|processo%% e formazione.

### Gestione dei %%processi|processo%%

#### Introduzione

La gestione dei %%processi|processo%% comprende le %%attività|attività%% che definiscono il modo in cui bisogna implementare i %%processi|processo%% primari del ciclo di vita del software. Le %%attività|attività%% che lo costituiscono sono la definizione dei %%processi|processo%%, la loro pianificazione, la loro esecuzione e controllo, la revisione e la valutazione dei %%prodotti|prodotto%%, e la chiusura dei %%processi|processo%%.

La definizione dei %%processi|processo%% è la prima %%attività|attività%% della gestione dei %%processi|processo%%. Tramite questa %%attività|attività%% vengono stabiliti i %%processi|processo%% necessari allo svolgimento del %%progetto|progetto%% e vengono identificati i loro %%requisiti|requisito_software%%, controllandone la fattibilità.

La pianificazione consiste nella preparazione di un piano per l'esecuzione dei %%processi|processo%% nel quale vengono definite le %%attività|attività%% e i %%task|task%% che li costituiscono.

Con l'esecuzione viene avviata l'implementazione del %%processi|processo%%, affiancata a un suo controllo continuo tramite l'identificazione, l'analisi e la risoluzione degli errori che sorgono man mano.

La revisione e la valutazione dei %%prodotti|prodotto%% è necessaria per assicurarsi che essi soddisfino i %%requisiti|requisito_software%%.

Quando tutti i %%task|task%% e tutte le %%attività|attività%% vengono conclusi e si ha un %%prodotto|prodotto%% completo, è possibile completare e chiudere il %%processo|processo%%.

#### Pianificazione

##### Introduzione

L'%%attività|attività%% di pianificazione è essenziale per poter svolgere al meglio le %%attività|attività%% del ciclo di vita del software. Infatti, durante questa %%attività|attività%% il responsabile è incaricato di definire le %%attività|attività%% e i %%task|task%% a loro associati effettuando delle stime dei tempi necessari al loro completamento e un'%%analisi dei requisiti|analisi_dei_requisiti%% e delle risorse necessarie per completare i %%task|task%%, e stabilendo i %%rischi|rischio%% a loro associati.
La pianificazione viene documentata nel Piano di %%Progetto|progetto%%, aggiornato di volta in volta dal responsabile corrente.

##### Ruoli di %%progetto|progetto%%

I ruoli che ogni membro dovrà assumere almeno una volta durante tutta la durata del %%progetto|progetto%%, rispettando quanto preventivato nella candidatura, sono:

**Responsabile di %%progetto|progetto%%**: figura di riferimento per il gruppo, %%committente|committente%% e %%proponente|proponente%% con lo scopo di mediare durante tutte le tipologie di comunicazioni. Ha il ruolo di guidare il %%progetto|progetto%% a livello macroscopico gestendo i vari %%processi|processo%%, in particolare:

- Pianificare e coordinare le %%task|task%% di %%progetto|progetto%%;
- Gestire le interazioni tra membri e con l'esterno;
- Studiare e amministrare i %%rischi|rischio%%;
- Approvare qualsiasi %%task|task%% completata e verificata.

**Amministratore (sysAdmin)**: figura professionale incaricata di amministrare l'ambiente di lavoro e garantire il rispetto delle norme del %%way of working|wow%% per assicurare l'%%efficacia|efficacia%% e l'%%efficienza|efficienza%% dei %%processi|processo%%, e in particolare di:

- Studiare ed implementare risorse per il miglioramento dell'ambiente di lavoro cercando di automatizzare i %%processi|processo%% dove è possibile;
- Controllare il %%versionamento|versionamento%% della documentazione e le configurazioni del %%prodotto|prodotto%% software;
- Controllare la %%qualità|qualità%% del %%prodotto|prodotto%%;
- Far rispettare il %%way of working|wow%% ai vari membri.

**Progettista**: figura professionale incaricata di gestire la progettazione del %%prodotto|prodotto%% software. I suoi incarichi sono:

- Produrre un'%%architettura|architettura%% che rispetti e soddisfi l'%%analisi dei requisiti|analisi_dei_requisiti%%;
- Prendere scelte riguardanti gli aspetti tecnici e tecnologici per ottenere %%efficacia|efficacia%% ed %%efficienza|efficienza%% massima;
- Redigere i documenti di specifica tecnica del %%prodotto|prodotto%% software.

**Analista**: figura professionale incaricata di svolgere l'omonima %%analisi dei requisiti|analisi_dei_requisiti%% comprendendo le necessità dell'azienda %%proponente|proponente%%. I suoi incarichi sono:

- Redigere i documenti riguardanti l'%%analisi dei requisiti|analisi_dei_requisiti%%;
- Studiare il dominio d'interesse;
- Definire la complessità del problema e suddividerlo da un livello macroscopico a un livello microscopico, individuando i %%task|task%% richiesti.

**Programmatore**: figura professionale incaricata di implementare tramite codice l'%%architettura|architettura%% definita in fase di design. I suoi incarichi sono:

- Produrre codice che soddisfi i %%requisiti|requisito_software%% analizzati;
- Scrivere codice pulito e facile da mantenere versionandolo;
- Realizzare strumenti per la %%verifica|verifica%% del software %%prodotto|prodotto%%.

**Verificatore**: figura professionale incaricata di verificare che le %%attività|attività%%, la documentazione e il software prodotti seguano le regole e rispettino il livello di %%qualità|qualità%% atteso; ovviamente il verificatore non può verificare materiale prodotto da lui stesso. I suoi incarichi sono:

- Esaminare il materiale in fase di revisione utilizzando tecniche e strumenti specificati nelle norme di %%progetto|progetto%%;
- Segnalare errori con consigli di miglioramento.

##### Gestione ticketing

Per la gestione dei %%task|task%%/ticket si utilizza come software %%Jira|jira%%. Questo software permette di visualizzare un %%backlog|backlog%% generale in cui il responsabile di %%progetto|progetto%% andrà, via via, ad inserire tutti i %%task|task%% che saranno svolti durante tutta la durata del %%progetto|progetto%%. %%Jira|jira%% permette anche di creare degli %%sprint|sprint%%, di lunghezze anche diverse tra loro, in cui è presente lo %%Sprint Backlog|backlog%% contenente tutti i %%task|task%% da svolgere durante lo %%sprint|sprint%%. Ogni %%task|task%% può ricevere un assegnatario al momento della creazione oppure il singolo membro può assegnarsi autonomamente un %%task|task%%.
Ogni %%task|task%% presenta:

- una **chiave** per identificarlo;
- una breve **descrizione**;
- uno **stato**, che può essere:
  - "%%backlog|backlog%%" se è stato appena creato;
  - "in corso" se è stato iniziato;
  - "revisione" se è stato completato e deve essere revisionato;
  - "to deploy" se è stato revisionato ed è stato fatto il merge con il branch develop su %%GitHub|github%%;
  - "completato" se è stato fatto il merge con il branch main su %%GitHub|github%%.
- lo **%%sprint|sprint%%** a cui appartengono;
- l'**assegnatario**;
- la **stima originale** del tempo per completarlo;
- il punteggio **%%story points|story_points%%** con una valore da 1 a 5 per indicare il valore del %%task|task%%;
- la **priorità**.

Una volta che viene completato un %%task|task%%, la persona o le persone che hanno contribuito al suo completamento segnalano il tempo produttivo che hanno speso e il ruolo che hanno ricoperto durante il suo svolgimento, usando un'applicazione di %%Jira|jira%% chiamata Timetracker. Su Timetracker, le ore di %%progetto|progetto%% svolte sono facilmente consultabili anche in base alla persona o al ruolo. Inoltre, i %%task|task%% sono organizzati in epic (liste di %%task|task%%) a seconda della loro tipologia, che può essere, ad esempio, "documentazione di %%progetto|progetto%%, "gestione repo", ecc.

##### Ciclo di vita di un %%task|task%%

Ogni %%task|task%% ha un ciclo di vita, che ha inizio nel momento in cui viene creato, e fine nel momento in cui viene completato e quindi rimosso dal %%backlog|backlog%%.

In primo luogo, il responsabile crea un %%task|task%%, che viene aggiunto al %%backlog|backlog%% dello %%sprint|sprint%% corrente. Quando l'assegnatario inizia a lavorare su quel %%task|task%%, crea un branch su %%GitHub|github%% dedicato a esso e aggiorna lo stato a "in corso". Una volta che il %%task|task%% è stato completato, l'assegnatario crea una pull request su %%GitHub|github%% verso il branch "develop" e sposta il %%task|task%% sullo stato "revisione". Successivamente, un verificatore revisiona il lavoro fatto, approva la pull request e sposta il %%task|task%% sullo stato "to deploy". Per concludere il ciclo di vita di un %%task|task%%, il responsabile approva il lavoro effettuato facendo merge sul branch "main" e segnando il %%task|task%% come "completato".

##### Gestione della %%repository|repository%%

La %%repository|repository%% di riferimento del gruppo si trova su %%GitHub|github%% ed è fruibile dall'esterno tramite %%GitHub Pages|github_pages%% organizzate tramite %%Docusaurus|docusaurus%%. La repo è suddivisa in tre sezioni principali: Candidatura, %%RTB|rtb%% e %%PB|pb%%; al cui interno è presente la corrispondente documentazione.

##### Metodo di lavoro

Per mantenere organizzato al meglio il lavoro, il gruppo ha scelto di adottare la tecnica degli %%sprint|sprint%% tipica del framework %%SCRUM|scrum%%; che permette di suddividere il totale dei %%task|task%% contenuti nel Product %%Backlog|backlog%% in parti più piccole, che potranno poi essere prese in carico da ogni membro del gruppo, contenute nello %%Sprint Backlog|backlog%%.

Ogni %%sprint|sprint%% avrà durata di due settimane che poi potrà essere modificata a seconda delle esigenze; sarà suddiviso nelle seguenti fasi:

- **%%Sprint|sprint%% Planning**: a seguito di ogni riunione di "allineamento" avvenuta con l'azienda verrà effettuata una pianificazione dello %%sprint|sprint%% successivo. Le %%attività|attività%% che compongono questa fase sono:
  brainstorming di gruppo in cui ogni membro esprime le proprie opinioni.
  rintracciare tutte le %%attività|attività%% da svolgere da inserire nel %%backlog|backlog%% dello %%sprint|sprint%%.
  suddividere le %%attività|attività%% tra i vari componenti del gruppo.

- **%%Sprint|sprint%% Review**: revisione di ciò che è avvenuto durante l'ultimo %%sprint|sprint%%, in presenza di tutto il gruppo. Le %%attività|attività%% che compongono questa fase sono:
  obiettivi raggiunti: tutte le %%task|task%% e gli obiettivi portati a compimento nello %%sprint|sprint%%.
  obiettivi non raggiunti: tutte le %%task|task%% e gli obiettivi programmati che non sono stati portati a compimento durante lo %%sprint|sprint%%, con analisi sulle cause.
  produttività individuale: ogni membro dichiara ciò che ha svolto per poter ottenere un %%consuntivo|consuntivo%% delle ore e dei costi.

- **%%Sprint|sprint%% %%Retrospective|retrospettiva%%**: %%retrospettiva|retrospettiva%% dello %%sprint|sprint%% per poterlo concludere definitivamente e valutarne l'andamento. In questa fase verrà valutato ciò che è andato positivamente per poter continuare su questa strada, e ciò che è andato in maniera negativa proponendo soluzioni e miglioramenti per risolvere le questioni problematiche e migliorare il proprio metodo di lavoro.

#### Coordinamento

##### Introduzione

L'%%attività|attività%% di coordinamento corrisponde all'organizzazione della comunicazione all'interno del gruppo e tra il gruppo e l'azienda o il %%committente|committente%%. La comunicazione può avvenire in formato testuale o tramite riunioni.

##### Comunicazioni

Le comunicazioni si dividono in 2 tipi: Interne, Esterne.

Le comunicazioni interne avvengono tra i vari membri del gruppo su canali appositamente predisposti attraverso riunioni comunitarie e scambi di messaggi tra singoli individui, ovviamente verrà utilizzato un registro adeguato e saranno seguite alcune convenzioni (decise nella sezione [4.2.3.3](#riunioni)):

- **%%Discord|discord%%** (a seconda del canale utilizzato):

  - testuale: scambio di messaggi formali volti all'organizzazione di decisioni e reminder derivate da riunioni.
  - vocale: comunicazioni formali durante meeting interni al gruppo; comunicazioni semi-formali/informali durante "scambi" tra colleghi.

- **%%Telegram|telegram%%** (a seconda della chat utilizzata):
  - gruppo: scambio di messaggi semi-formali strettamente inerenti al %%progetto|progetto%%.
  - singola: scambio di messaggi informali tra membri.

Le comunicazioni esterne avvengono tra il gruppo ed il %%proponente|proponente%% e %%committente|committente%%. Queste hanno, generalmente, un valore importante e vengono adeguatamente preparate tramite riunioni di gruppo. Gli strumenti utilizzati per queste comunicazioni sono: **%%Zoom|zoom%%** e **Google Mail** (tramite l'indirizzo [techwave.unipd@gmail.com](techwave.unipd@gmail.com)). Il registro è sempre formale e il mediatore predisposto per questo tipo di comunicazioni è il Responsabile di %%Progetto|progetto%%.

##### Riunioni

Le **riunioni interne** avvengono tra i membri del gruppo. Per quanto riguarda la frequenza non è definita ma avviene a seconda delle necessità, solitamente ne avviene almeno una a settimana. Questo tipo di riunioni sono concordate sul gruppo %%Telegram|telegram%% e si cerca di svolgere in giorni in cui tutti i membri siano disponibili, in caso ciò non fosse possibile i membri assenti potranno comunque sapere tutto quello che è accaduto e che è stato deciso tramite i %%verbali|verbale%% prodotti, se necessario il Responsabile si renderà disponibile a chiarire qualsiasi dubbio.

Per sfruttare efficacemente il tempo di lavoro sincrono delle riunioni interne, si adottano queste accortezze:

- Scaletta: questa rappresenta l'ordine del giorno ed indica gli argomenti da trattare.
  organizzazione: il Responsabile sarà tenuto a mantenere l'ordine durante la riunione e verrà designato uno scriba con il compito di tenere traccia di ciò che avviene durante la riunione e redigere il %%verbale|verbale%%.
- Preparazione: ogni membro del gruppo si impegna ad arrivare sufficientemente preparato sugli argomenti, soprattutto di carattere tecnico, che sono discussi durante la riunione con domande e spiegazioni, inoltre si mantiene un impegno attivo e produttivo durante tutta la sua durata.

Gli argomenti in scaletta saranno tratti dal %%backlog|backlog%% dello %%sprint|sprint%% e verrà riservato un momento finale dove poter parlare di argomenti non in scaletta, ovviamente comunque inerenti al %%progetto|progetto%%.

Le **riunioni esterne** avvengono tra gruppo e %%committente|committente%% o %%proponente|proponente%%. Queste servono soprattutto per valutare il lavoro svolto fino a quel momento e pianificare gli step successivi da seguire per poter continuare a lavorare nel modo più %%efficace|efficacia%% ed %%efficiente|efficienza%% possibile. Anche in questo caso i membri del gruppo si impegnano ad essere preparati a sufficienza per poter discutere con "personale esperto" di argomenti solitamente di non facile comprensione inerenti al %%progetto|progetto%%. Verranno ovviamente stilati %%verbali|verbale%% esterni per fissare il punto su ciò di cui si è trattato e a cui si avrà approvazione dalla parte "esterna" al gruppo coinvolta nella discussione.

##### Disponibilità

Il lavoro personale è organizzato individualmente da ogni componente del gruppo per poter lasciare libertà in quanto impegnati con questioni accademiche, personali e seguendo quanto dichiarato nella candidatura nella sezione di dichiarazione impegni. Ovviamente l'organizzazione dovrà essere consona agli impegni totali del gruppo per evitare ritardi dovuti ad un singolo elemento. In caso di problematiche di indisponibilità che porteranno al non compimento degli impegni di %%progetto|progetto%% presi in carico dal singolo membro, questo si impegna ad avvisare prontamente il Responsabile che cercherà di ridistribuire il lavoro contattando singolarmente i membri oppure indicendo una riunione di gruppo.

### Tracciamento e rendicontazione delle ore

#### Introduzione

La gestione delle ore è un aspetto cruciale per il successo del %%progetto|progetto%%, poiché consente di monitorare l'avanzamento delle %%attività|attività%%, garantire il rispetto delle tempistiche e ottimizzare l'utilizzo delle risorse. Questo %%processo|processo%% si basa su una corretta pianificazione, tracciamento e rendicontazione delle ore lavorative da parte di tutti i membri del team.

#### Pianificazione delle ore

Durante la fase di %%Sprint|sprint%% Planning, il Responsabile di %%Progetto|progetto%%, in collaborazione con il team, definisce le %%attività|attività%% da svolgere e stima le ore necessarie per ciascuna di esse e lo %%story points|story_points%%. Le ore preventivate vengono registrate nel Piano di %%Progetto|progetto%% e suddivise in base ai ruoli e alle competenze dei membri del team.

#### Tracciamento delle ore su %%Jira|jira%%

Ogni ticket su %%Jira|jira%% rappresenta una specifica %%attività|attività%% o %%task|task%%. Per tracciare le ore lavorative, i membri del team devono seguire questi passaggi:

- **Aprire il ticket**: accedere al ticket su %%Jira|jira%% a cui si sta lavorando.
- **Registrare le ore**:
  - Utilizzare la %%funzionalità|funzionalità%% Log Work di Timetracker per inserire le ore lavorative.
  - Specificare:
    - **Tempo impiegato**: ore e minuti dedicati all'%%attività|attività%%.
    - **Ruolo ricoperto**: selezionare il ruolo svolto durante l'%%attività|attività%%.
    - **Data e orario**: indicare la data e l'orario in cui è stato svolto il lavoro.

#### Assegnazione dei ruoli

Ogni ora lavorativa deve essere associata a un ruolo specifico:

- **Analista**: per %%attività|attività%% di %%analisi dei requisiti|analisi_dei_requisiti%% e studio del dominio.
- **Progettista**: per %%attività|attività%% di progettazione architetturale e di dettaglio.
- **Programmatore**: per %%attività|attività%% di codifica e sviluppo del software.
- **Verificatore**: per %%attività|attività%% di %%verifica|verifica%% e testing.
- **Responsabile di %%Progetto|progetto%%**: per %%attività|attività%% di coordinamento e gestione del %%progetto|progetto%%.

#### Rendicontazione delle ore nel cruscotto
Tramite un documento Google Sheets _cruscotto-avanzamento_, presente nella cartella Google Drive condivisa, il team è in grado di ottenere informazioni riguardo lo stato di avanzamento del progetto. Questo è di particolare importanza per il ruolo del Responsabile durante la compilazione del Piano di %%Progetto|progetto%%.

##### Inserimento ore svolte
Per inserire la rendicontazione delle ore effettivamente svolte all'interno dello %%sprint|sprint%% bisogna:
- **Scaricare il report da Timetracker (%%Jira|jira%%)**:
  - Dalla dashboard di %%Jira|jira%% selezionare, dal menu in alto, le voci _"App"_, poi _"Timetracker"_
  - Dal menu laterale selezionare la voce _"Saved Reports"_, poi _"Shared with me"_ e aprire il report denominato "visualizzazione ore registrate (totali)"
  - Qui modificare il range delle date con quelle corrispettive dello %%sprint|sprint%%, eseguire e scaricare (_Excell_) il report
- **Inserire i dati nel documento Google Sheets _cruscotto-avanzamento_**
  - Nella pagina _"parser-jira"_ incollare le ultime righe prese dal report scaricato. In automatico verranno usate per aggiornare i grafici di andamento e statistiche.

#### Inserimento ore preventivate
- **Inserire i dati nel documento Google Sheets _cruscotto-avanzamento_**
  - Nella pagina _"inserimento-preventivo-ruoli"_ specificare per ogni %%_issue_|issue%% le ore preventivate per ciascun ruolo.

#### Strumenti utilizzati

- **%%Jira|jira%%**: per la gestione dei ticket e il tracciamento delle ore.
- **Timetracker**: per la registrazione delle ore lavorative.
- **Google Sheets**: per la creazione di report e il monitoraggio delle ore preventivate vs effettive.

#### Ruoli e responsabilità

- **Responsabile di %%Progetto|progetto%%**: supervisiona il tracciamento delle ore, %%verifica|verifica%% il rispetto delle tempistiche e approva la rendicontazione.
- **Amministratore**: garantisce che gli strumenti di tracciamento siano configurati correttamente e accessibili a tutti i membri del team.
- **Membri del Team**: sono responsabili di registrare le ore lavorative in modo accurato e tempestivo, associando il ruolo ricoperto.

### Infrastruttura

Fanno parte dell'infrastruttura organizzativa tutti gli strumenti che permettono al gruppo di attuare in modo %%efficace|efficacia%% ed %%efficiente|efficienza%% i %%processi|processo%% organizzativi. In particolare strumenti che permettono la comunicazione, il coordinamento e la pianificazione del lavoro.

- **%%Discord|discord%%**:
  Strumento di comunicazione interna sincrona. Vengono usati due canali principali:
  - **Canale testuale**: comunicazioni sincrone per reminder di argomenti discussi e da discutere durante la riunione.
  - **Canale vocale**: canale di comunicazione utilizzato per le riunioni di gruppo con la possibilità di condivisione dello schermo.

Ogni categoria di canale può avere un numero variabile di sottocanali utilizzati a seconda delle necessità.

- %%Telegram|telegram%%:
  Strumento di comunicazione interna testuale asincrona. Viene utilizzato in due modalità:

  - gruppo: chat condivisa tra tutti i membri del gruppo utilizzata per la maggior parte delle comunicazioni riguardanti il %%progetto|progetto%%.
  - individuale: chat utilizzata per contattare singolarmente un membro del gruppo per evitare "disturbi" a tutti gli altri membri.

- **Google Drive**:
  Strumento utilizzato come directory condivisa dai membri del gruppo per archiviazione di file temporanei o non ufficiali. In questa directory si ha accesso alla suite Google con Docs, Sheets, Slides.

- **Google Mail**:
  Strumento per lo scambio di email mediante l'indirizzo di posta condiviso [techwave.unipd@gmail.com](techwave.unipd@gmail.com) utilizzato per comunicazioni esterne con %%proponente|proponente%% e %%committente|committente%%.

- **%%Zoom|zoom%%**:
  Strumento di comunicazione video sincrona con il %%proponente|proponente%%.

- **%%Miro|miro%%**:
  Strumento di collaborazione digitale utilizzato durante le riunioni con il %%proponente|proponente%% per facilitare la comunicazione e fissare gli argomenti trattati nell'incontro.

- **%%Jira|jira%%**:
  Strumento utilizzato per il ticketing e la gestione dei %%task|task%% con cui si programmano i vari %%sprint|sprint%%, ci si divide i %%task|task%% e si rendicontano le ore produttive dei membri.

- **%%GitHub|github%%**:
  Strumento di controllo di versione dove è situata la %%repository|repository%% ufficiale contenente tutta la documentazione di %%progetto|progetto%% ed il codice prodotto.

- **GitFlow**:
  Modello di branching Git alternativo che prevede l'uso di feature branch e di più branch primari per il controllo di versione.

### Miglioramento dei %%processi|processo%%

Il %%processo|processo%% di miglioramento consiste di due %%attività|attività%% principali, una di valutazione e una di miglioramento dei %%processi|processo%%.

#### Valutazione

Per effettuare l'%%attività|attività%% di valutazione in modo regolare, a fine %%sprint|sprint%% viene effettuata la %%sprint|sprint%% %%retrospective|retrospettiva%%, che mira ad analizzare le cose fatte durante lo %%sprint|sprint%% cercando di capire cosa è andato bene e cosa è andato male, e, nel secondo caso, cosa si può cambiare nel modo in cui si stanno facendo le cose per poter avere un miglioramento.

#### Miglioramento

Durante lo svolgimento del %%progetto|progetto%% soprattutto nella fase stesura dei documenti e del %%prodotto|prodotto%% software il gruppo cercherà di portare un miglioramento continuo del lavoro, per evitare di ripetere errori già fatti, fornendo delle soluzioni alle problematiche riscontrate durante il tragitto. Per svolgere al meglio questo %%processo|processo%% di miglioramento usufruiremo della sezione Valutazione di miglioramento posta nel Piano di Qualifica. In questa sezione del documento è possibile trovare i problemi principali riscontrati dal gruppo, con descrizioni e soluzioni opportune.

### Formazione

Per garantire che tutti i membri del gruppo possano lavorare alla stessa velocità, allo stesso livello e seguendo le stesse convenzioni, i membri studiano in autonomia tutti gli strumenti di lavoro utilizzati per la documentazione, la gestione di %%progetto|progetto%% e lo sviluppo software. Verranno anche riservati dei momenti durante le varie riunioni di gruppo in cui i membri più esperti in alcuni campi faranno una breve "spiegazione" per facilitare la comprensione degli strumenti agli altri membri.

Vengono riportati, di seguito, riferimenti alla documentazione dei vari strumenti/framework utilizzati:

LaTeX: [https://www.overleaf.com/learn](https://www.overleaf.com/learn).

%%GitHub|github%%: [https://docs.github.com](https://docs.github.com).

%%Jira|jira%%: [https://www.atlassian.com/software/jira/guides/getting-started/introduction](https://www.atlassian.com/software/jira/guides/getting-started/introduction).

Framework %%SCRUM|scrum%%: [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html).

## Standard per la %%qualità|qualità%%

### %%Qualità|qualità%% dei %%processi|processo%%

Per garantire la %%qualità|qualità%% dei %%processi|processo%%, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i %%processi|processo%% di ciclo di vita del software e le %%attività|attività%% di supporto necessarie per lo sviluppo di un %%prodotto|prodotto%% software.

In particolare è necessario individuare delle metriche che indicano l'avanzamento dei %%processi|processo%% in relazione al budget, al valore pianificato e quello svolto, ai %%rischi|rischio%% emersi e agli errori individuati.

### %%Qualità|qualità%% di %%prodotto|prodotto%%

Per garantire la %%qualità|qualità%% del %%prodotto|prodotto%%, il team adotta il modello di riferimento ISO/IEC 25010 (unione di ISO/IEC 9126 e ISO/IEC 14598) che definisce un modello di %%qualità|qualità%% del software basato su sei caratteristiche fondamentali: %%funzionalità|funzionalità%%, affidabilità, usabilità, %%efficienza|efficienza%%, manutenibilità e portabilità.

In particolare è necessario individuare delle metriche rappresentanti:
- la **funzionalità**: grado in cui il %%prodotto|prodotto%% fornisce %%funzionalità|funzionalità%% complete, corrette e adeguate.
- l'**affidabilità**: grado in cui il %%prodotto|prodotto%% svolge specifiche funzioni in termini di assenza di guasti, disponibilità, tolleranza ai guasti e riparabilità.
- l'**usabilità**: grado di interazione con il %%prodotto|prodotto%% da parte degli utenti in termini di appropriatezza, apprendibilità, operabilità, protezione da errori, _user experience_ e accessibilità.
- l'**%%efficienza|efficienza%%**: grado in cui il %%prodotto|prodotto%% esegue le sue funzioni in termini di risorse di tempo, di memoria, ecc.
- la **manutenibilità**: costo della correzione dei difetti e dell'aggiunta di %%funzionalità|funzionalità%%. 
- la **portabilità**: grado in cui il %%prodotto|prodotto%% è legato all'ambiente di esecuzione in termini di installabilità e sostituibilità.

I **%%test|test%% di %%verifica|verifica%% e validazione** vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del %%prodotto|prodotto%% con i %%requisiti|requisito_software%% specificati e gli standard qualitativi prestabiliti dal team. I %%test|test%% vengono classificati in quattro categorie principali: %%test|test%% di unità, %%test|test%% di integrazione, %%test|test%% di sistema e %%test|test%% di accettazione.

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
