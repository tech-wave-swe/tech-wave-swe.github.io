---
id: norme_di_progetto
title: "Norme di Progetto"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.6.0
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

Lo scopo del documento è quello di definire le norme che ogni componente del gruppo TechWave dovrà rispettare per ottenere un %%prodotto|prodotto%% finale fatto a regola d'arte. In questo documento, inoltre, vengono descritte le convenzioni da rispettare nell'utilizzo degli strumenti e vengono esposti i processi che saranno adottati dal gruppo. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del %%progetto|progetto%% possono cambiare oppure si possono aggiungere/rimuovere le norme a seconda delle necessità.

### Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il %%capitolato|capitolato%% **_Requirement Tracker - Plug-in VSCode_** propone lo sviluppo di un plugin per VSCode che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

### Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti tramite _("Come?")_.

### Riferimenti

Riferimenti normativi:

- Capitolato d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

- Corso di Ingegneria del software - Regolamento di Progetto

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/PD1.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/PD1.pdf)

Riferimenti informativi:

- Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

## 2 Processi Primari

### 2.1 Fornitura

Il processo di fornitura definisce un insieme di metodi, pratiche e procedure finalizzati a garantire la consegna del %%prodotto|prodotto%% software richiesto dal committente.
Questo processo si occupa del monitoraggio e del coordinamento delle %%attività|attività%% svolte dal gruppo durante l'intero ciclo di vita del %%prodotto|prodotto%%, assicurando che il risultato finale sia conforme alle aspettative del committente.

### %%Attività|attività%%

Il processo, durante il ciclo di vita del software affronta varie fasi:

1. **Avvio del %%progetto|progetto%%**:
   Le prime %%attività|attività%% da svolgere riguardano l'individuazione delle necessità e dei requisiti del cliente. Queste informazioni si ottengono inizialmente dal %%Capitolato|capitolato%% per poi essere definite con maggiore dettaglio tramite colloqui o email.
2. **Preparazione della risposta alle richieste**:
   In seguito, vengono create delle proposte che rispondano alle richieste del cliente. In esse verranno definiti i requisiti e le condizioni contrattuali. Questa fase è particolarmente utile per stabilire quali punti sono di maggiore interesse per il cliente e quali sono più facilmente implementabili dal team.
3. **Contrattazione**:
   In questa %%attività|attività%% avviene la negoziazione dei termini contrattuali e viene stabilito un accordo sui requisiti del %%progetto|progetto%% e sulle condizioni di consegna.
4. **Pianificazione**:
   Una volta definite le aspettative del cliente si avvia la pianificazione. Questa è un'%%attività|attività%% cruciale che porta alla creazione del documento di Piano di %%Progetto|progetto%% nel quale vengono definiti i tempi, le risorse e i costi come specificato nel paragrafo 3.1.5.1.8.
5. **Esecuzione e controllo**:
   In questa fase viene attuato quanto definito dal documento del Piano di %%Progetto|progetto%%. Le %%attività|attività%% svolte richiedono una supervisione, sia per controllare il rispetto delle tempistiche, sia per accertarsi dell'effettivo rispetto del Piano di Qualifica.
6. **Revisione e valutazione**:
   Durante il ciclo di vita del software saranno necessarie revisioni periodiche per valutare lo stato del %%progetto|progetto%%, sia in termini di obiettivi conclusi sia per individuare il prima possibile eventuali problemi o rischi e attuare strategie risolutive.
7. **Consegna e completamento**:
   Il %%prodotto|prodotto%% software e la sua documentazione, una volta completata la validazione, verranno consegnate al cliente.

### Comunicazione con l'azienda

L'intero %%progetto|progetto%% è accompagnato da una forte e costante comunicazione con l'azienda. Questo è necessario sia per avere una definizione chiara delle esigenze, sia per ottenere feedback di quanto %%prodotto|prodotto%% nelle varie fasi per accertarsi che siano allineate con le aspettative.

All'azienda viene fornito un puntatore contenente tutta la documentazione di %%progetto|progetto%% prodotta. In particolare, hanno maggiore interesse:

- I **verbali esterni** che riassumono quanto definito durante il meeting e che necessitano la firma dell'azienda in quanto fonte per la definizione dei requisiti;
- Il documento di **%%Analisi dei Requisiti|analisi_dei_requisiti%%**;
- Il documento di **Piano di %%Progetto|progetto%%**.

### Strumenti

Lo scambio di informazioni avviene tramite l'uso di molteplici piattaforme:

- **Zoom** meeting per fare videochiamate, sia conoscitive, che di avanzamento solitamente svolte alla fine di ogni Sprint;
- Servizio interno dell'azienda per la prenotazione dei meeting;
- **Google Gmail** per l'invio di verbali e documenti e principale piattaforma per la comunicazione asincrona;
- **Git** per la consegna del PoC e del %%prodotto|prodotto%% finito;
- **Miro**, una board virtuale utilizzata per lo scambio rapido di informazioni e risorse;
- **Google slides** per la creazione di presentazioni in supporto alle videochiamate.

### Sviluppo

Il processo di sviluppo riguarda l'effettiva realizzazione del %%prodotto|prodotto%% software. Le %%attività|attività%% fondamentali sono:

- **%%Analisi dei Requisiti|analisi_dei_requisiti%%**:
  in seguito ad un brainstorming interno al team, avviene la definizione delle aspettative del %%prodotto|prodotto%% software. Viene redatto il documento di %%Analisi dei requisiti|analisi_dei_requisiti%% come specificato nel paragrafo 3.1.5.1.7.

#### Strumenti

Per la creazione dei diagrammi UML è stato utilizzato **StarUML**.

## Processi di Supporto

### Documentazione

#### Introduzione

Il processo di documentazione mira a raccogliere, organizzare e rappresentare in forma scritta tutte le informazioni prodotte da un processo o da un'attività durante il ciclo di vita di un %%prodotto|prodotto%% software. La documentazione prodotta ha lo scopo di fornire una comprensione del %%prodotto|prodotto%% a sviluppatori, distributori ed utenti senza la necessità di supporto umano.
Le norme definite all'interno di questo documento saranno applicate da tutti i membri del gruppo per la redazione e la modifica di tutta la documentazione prodotta.
SI intende adottare un approccio **Documentazione come Codice** per la redazione della documentazione. Questo consiste nel trattare la documentazione di un %%progetto|progetto%% software alla stregua del codice sorgente del %%prodotto|prodotto%% tramite l'utilizzo di pratiche e strumenti tipici dello sviluppo software.
L'approccio **Documentazione come Codice** permette di ottenere una migliore tracciabilità delle modifiche, maggiore coerenza e una facile manutenzione tramite l'utilizzo di:

- Versionamento
- Automazioni
- Integrazione Continua

#### Sorgente Documenti

La documentazione sarà redatta utilizzando il linguaggio **MarkDown** la cui semplicità consente di velocizzare il processo di scrittura garantendo, al contempo, la portabilità e la facilità di conversione in formati diversi.

La documentazione prodotta, archiviata nello stesso repository del %%progetto|progetto%%, è pensata per essere visualizzata tramite un sito web generato a partire dai file sorgenti tramite l'utilizzo di **Docusaurus**. Ogni documento è formato da un singolo file sorgente a partire da un template predefinito.

#### Ciclo di vita dei Documenti

Il ciclo di vita dei documenti può essere rappresentato come una sequenza di %%attività|attività%%. Adattando un approccio incrementale alla redazione della documentazione queste fasi vengono ripetute in modo ciclico:

1. **Redazione**: Ogni documento viene redatto osservando la sua struttura, specificata nella sezione corrispondente, e le norme definite.
2. **Verifica**: Al termine della fase precedente il documento viene revisionato dai verificatori che assicurano il rispetto delle norme e degli standard di qualità definiti.
3. **Approvazione**: Al termine della fase precedente il Responsabile di %%Progetto|progetto%% approva il documento che verrà quindi inserito nel branch di rilascio del repository dove verrà compilato, tramite automazione, e distribuito nelle varie forme definite.

#### Procedure correlate alla redazione dei documenti

##### Redattore

Il redattore è responsabile della redazione o modifica di un documento o di una sua sezione. Adottando un approccio **Documentazione come Codice** si utilizza il workflow **GitFlow** definito nella sezione 4.3.

###### Redazione di un nuovo documento o modifica di un documento esistente

Partendo dal branch develop del repository il redattore crea un nuovo branch seguendo la procedura definita nella sezione 3.2.6.1.
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

Se più redattori lavorano nello stesso documento su ticket differenti lavoreranno su due branch distinti utilizzando la metodologia descritta nella sezione 3.1.4.1.1.

##### Completamento attività di redazione

Al termine %%attività|attività%% richiesta dal ticket il documento deve essere versionato e sottoposto a verifica da parte di un revisore.
Il redattore:

1. Aggiorna il registro modifiche, sezione 3.1.5.1.5, inserendo i dati richiesti in una nuova riga.
2. Incrementa la versione del documento sia nel registro modifiche sia nei metadati utilizzando la convenzione definita in 3.2.5.2.
3. Porta le modifiche nella repository remota utilizzando la metodologia descritta in 3.1.4.1.1.
4. Crea una Pull Request verso develop seguendo la procedura definita nella sezione 3.2.6.2.

Se il documento viene approvato lo stato del ticket diventa "ToDeploy" ed il codice sorgente viene unito a develop. In caso contrario il redattore deve modificare il documento seguendo le indicazioni dei revisori e ripetere la procedura precedente.

#### Struttura del documento

Ogni documento %%prodotto|prodotto%% possiede una struttura prefissata che ne garantisce la coerenza ed il rispetto delle norme definite.

##### Metadati

Ogni file sorgente contiene una sezione dedicata alla definizione dei metadati del documento. Questa sezione fornisce una serie di informazioni aggiuntive e strutturate utilizzate per gestire dettagli relativi al ciclo di vita di un documento. Questi metadati possono essere utilizzati per generare automaticamente la documentazione in formato pdf e le pagine web accessibili attraverso il sito dedicato.

Di seguito vengono elencati tutti i metadati utilizzabili all'interno dei documenti divisi in due categorie:

- **Obbligatori**: Necessario inserire questi metadati all'interno dei documenti per eseguire correttamente il processo di build.
- **Opzionali**: Metadati che modificano lo stile di documento generato o alcune sue funzionalità.

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
- **participants**: Metadato presente solo all'interno dei verbali interni ed esterni. Rappresenta i membri del gruppo presenti durante il meeting. Deve essere scritto utilizzando il seguente formato:

```markdown
partecipants:

- name: Cognome Nome
  status: present | absent
```

- **duration**: Metadato presente solo all'interno dei verbali interni ed esterni. Rappresenta la durata della riunione scritta nel formato **\[numero ore\]h**.

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

- Verbali Interni
- Verbali Esterni
- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

La LOF (Elenco delle figure) rappresenta tutte le immagini presenti all'interno del documento riportandone il titolo e la pagina in cui si trova. Deve essere presente in tutti i documenti fatta eccezione per:

- Verbali Interni
- Verbali Esterni
- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

Sia il TOC sia la LOF sono generate, tramite automazione, a seguito dell'approvazione del documento e del suo passaggio al branch principale. La loro presenza deve essere dichiarata nei metadati del documento (vedi paragrafo Opzionali sulla sezione 3.1.5.1).

###### Registro delle modifiche

Il Registro delle modifiche, indicato con Changelog all'interno dei documenti, rappresenta la storia del documento. Viene rappresentato sotto forma di tabella nella quale ogni riga contiene:

- **Data Modifica**: Data in cui il documento è stato modificato.
- **Versione**: Versione del documento a seguito della modifica.
- **Descrizione**: Descrizione della modifica apportata.
- **Autore modifica**: Redattore della modifica.
- **Data Verifica**: Data in cui il documento è stato verificato.
- **Autore Verifica**: Revisione della modifica.

Il Registro delle modifiche è presente in ogni documento fatta eccezione per:

- Valutazione dei %%capitolati|capitolato%%
- Lettere di presentazione

###### Verbali

I verbali sono documento redatti a seguito di riunioni interne o esterne e ne riportano le discussioni e le decisioni prese. Sono composti da:

- **Tabella dei partecipanti**: Indica le presenze / assenze dei membri del gruppo alla riunione.
- **Ordine del giorno**: Indica i temi principali trattati durante la riunione.
- **Resoconto**: Descrive sinteticamente la riunione.
- **Conclusioni Raggiunte**: Rappresenta in forma schematica e riferibile le conclusioni raggiunte al termine della riunione.
- **Firma**: Presente solo nei verbali Esterni.

  Il nome del file deve rispettare la seguente struttura: AAAA-MM-GG_ID.md dove

  - **AAAA-MM-GG**: Data della riunione
  - **ID**: Indice progressivo che rappresenta il verbale.

###### Documento di %%Analisi dei Requisiti|analisi_dei_requisiti%%

Il documento dell'%%Analisi dei Requisiti|analisi_dei_requisiti%% è il risultato di quanto svolto nell'%%attività|attività%% omologa. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del %%prodotto|prodotto%%**.
- la **lista dei requisiti**, ciascuno associato ad un identificativo univoco e classificati per:
  - **tipologia**:
    - **Funzionali**: funzionalità che l'%%Applicativo|applicativo%% deve fornire.
    - **Tecnici**: vincoli riguardo le tecnologie che l'%%Applicativo|applicativo%% deve utilizzare.
    - **Qualitativi**: vincoli riguardo obiettivi minimi di qualità.
  - **obbligatorietà**:
    - **Obbligatori**: irrinunciabile per qualcuno degli stakeholder.
    - **Desiderabili**: non strettamente necessario ma con valore aggiunto riconoscibile.
    - **Opzionali**: utile o contrattabile più avanti.
- la **lista degli Use Case**, ciascuno descritto tramite il rispettivo use case diagram (UML) e accompagnato dalla sua descrizione testuale dove vengono specificati:
  - **Attori primari**: utente principale.
  - **Attori secondari** \[se presenti\]: utente secondario.
  - **Precondizioni**
  - **Postcondizioni**
  - **Scenario principale**
  - **User story**
  - **Generalizza** \[se presente\]: use case genitore.
  - **Estensioni** \[se presenti\]: use case che arrivano dal costrutto extend.

###### Documento di Piano di Progetto

Il documento di Piano di %%Progetto|progetto%% rappresenta tutta la parte di pianificazione e di analisi del %%progetto|progetto%% prodotta dal responsabile. Al suo interno sono presenti:

- un paragrafo dedicato a specificare lo **scopo del documento**.
- un paragrafo dedicato a specificare lo **scopo del %%prodotto|prodotto%%**.
- una sezione contenente l'**analisi dei rischi**: in essa è presente la lista dei rischi raggruppati per tipologia: organizzativi ed interpersonali, tecnologici. Per ciascun rischio viene specificata la descrizione, il grado di rischio, la sua pericolosità e una mitigazione.
- una sezione dedicata al **modello di sviluppo scelto**, ovvero SCRUM, e la **lista degli sprint** svolti.
- una sezione contenente il **preventivo dei costi e delle ore** di ciascun ruolo definite al momento della pianificazione dello sprint.
- una sezione contenente il **%%consuntivo|consuntivo%% dei costi e delle ore** effettivamente svolte da ciascun ruolo, calcolate durante la retrospettiva.

##### Piano di Qualifica

Il Piano di Qualifica contiene tutte le strategie di verifica e validazione utilizzate all'interno del ciclo di vita del %%progetto|progetto%% al fine di garantire la conformità del %%prodotto|prodotto%% alle aspettative del %%committente|committente%%.

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

- **GitHub**: Utilizzato per il versionamento, la distribuzione e la compilazione dei documenti.
- **Markdown**: Utilizzato per la redazione dei documenti.
- **VSCode**: Editor di testo utilizzato per la scrittura dei documenti.
- **Pandoc**: Utilizzato per la conversione da Markdown a PDF.
- **Docusaurus**: Utilizzato per la generazione di un sito statico a partire da file Markdown.

### Verifica

#### Introduzione

Il processo di verifica si pone l'obiettivo di garantire che ogni %%prodotto|prodotto%% o servizio di un processo o di un %%progetto|progetto%% sia conforme ai requisiti specificati. Questo processo accompagna l'intero ciclo di vita di un %%prodotto|prodotto%% software fino alla fase di manutenzione.

La verifica viene eseguita su tutti i processi in esecuzione al raggiungimento di un sufficiente grado di maturità. Seguendo le linee guida, definite all'interno del Piano di Qualifica, viene analizzata la qualità dei prodotti e dei processi al fine di garantire la conformità agli standard di qualità definiti.

Le %%attività|attività%% di verifica sono svolte dai verificatori seguendo l'ordine indicato dal **Modello a V** ed i requisiti di qualità definiti all'interno del Piano di Qualifica.

#### Verifica dei documenti

Il verificatore ha il compito di effettuare la revisione dei documenti al termine della loro redazione al fine di garantire la qualità e la conformità alle norme del loro contenuto.

Quando il redattore termina la sua %%attività|attività%% e crea una Pull Request (vedi sezione 3.1.4.3) il verificatore assegnato riceve una e-mail. Il verificatore può visualizzare le modifiche apportate all'interno della scheda "Pull Request" presente nella pagina GitHub del %%progetto|progetto%%.

Per verificare un documento è necessario revisionare:

- **Correttezza Tecnica**: Verificare che la Pull Request rispetti gli standard di nomenclatura, sia richiesta l'unione con il branch develop, non siano presenti conflitti con l'attuale stato del branch e tutti i test automatici siano stati eseguiti con successo.
- **Conformità alle norme**: Verificare che il documento segua le linee guida definite dagli standard per la formattazione, la struttura e lo stile.
- **Consistenza**: Verificare che il contenuto del documento sia consistente con tutti gli altri documenti presenti.
- **Comprensibilità**: Verificare che il documento sia chiaro, comprensibile e non ambiguo. Il documento non deve contenere errori grammaticali e/o ortografici.

Al termine, se questi criteri sono soddisfatti, il verificatore deve approvare la Pull Request ed effettuare l'unione sul branch develop. In caso contrario il verificatore ha il compito di inserire commenti e suggerimenti sulle modifiche da apportare.

Questo processo si ripete fino alla soddisfazione dei criteri di qualità.

#### Analisi

##### Analisi Statica

L'Analisi Statica è un'%%attività|attività%% di controllo condotta sul %%prodotto|prodotto%% senza la necessità di eseguirlo. Si basa sull'utilizzo di metodo di lettura, manuali o automatici, che permettono di individuare errori formali, difetti o proprietà indesiderate all'interno dei documenti. Il successo di questa %%attività|attività%% dipende dalla competenza e dall'attenzione dei verificatori coinvolti.

##### Analisi Dinamica

L'Analisi Dinamica è un'%%attività|attività%% di controllo condotta sul %%prodotto|prodotto%% durante la sua esecuzione effettiva al fine di verificarne il corretto funzionamento.

Questa %%attività|attività%% consiste nell'esecuzione di una serie di test al fine di individuare eventuali discrepanze tra risultati previsti e risultati effettivi.

Ogni test deve essere ben definito, deterministico e automatizzato al fine di rendere l'Analisi Dinamica ripetibile ed oggettiva. La definizione di un test corrisponde a:

- Descrizione dell'input
- Descrizione dell'output
- Condizioni di Esecuzione

###### Test di unità

I Test di Unità sono progettati per verificare una singola funzionalità, in modo isolato dal sistema, al fine di garantire il corretto funzionamento e l'aderenza alle specifiche. Questi test vengono pianificati durante la **Progettazione di Dettaglio**, sono completamente automatizzabili e devono essere eseguiti per primi in quanto verificano il corretto funzionamento della singola unità.

###### Test di integrazione

I Testi di Integrazione sono progettati per verificare il corretto funzionamento delle diverse funzionalità quando sono integrate tra loro. Questi test vengono pianificati durante la fase di Progettazione Architetturale tramite approccio:

- **Top-Down**: Si inizia integrando le componenti di maggior valore esterno effettuando test prolungati sulle funzionalità principali. Necessita della simulazione di tutte le parti non ancora implementate tramite l'utilizzo di Mock.
- **Bottom-Up**: Si inizia integrando le componenti di basso livello, più lontane dell'utente. Questo riduce la necessità di Mock ma ritarda la verifica sulle funzionalità principali.

###### Test di sistema

I Test di Sistema sono progettati per verificare il sistema nella sua interezza rispetto ai requisiti software individuati durante l'%%Analisi dei Requisiti|analisi_dei_requisiti%%. Questi test hanno lo scopo di garantire che il %%prodotto|prodotto%% esegua le funzioni previste in modo efficace e affidabile in un ambiente realistico.

###### Test di Accettazione

I Test di Accettazione sono progettati per dimostrare che i requisiti individuati sono stati soddisfatti e garantire che il %%prodotto|prodotto%% sia conforme alle aspettative degli stakeholder. Questi test vengono eseguiti coinvolgendo gli utenti finali e determinano se il %%prodotto|prodotto%% può essere rilasciato.

###### Codici identificativi

Ad ogni test viene associato un codice identificativo al fine di permettere il riferimento univoco ad un test. Questo codice rispetta la seguente struttura: **T\[ Tipologia \]\[ ID \]**

Dove:

- \[ Tipologia \]: Rappresenta il tipo di test:
  - U: Unità
  - I: Integrazione
  - S: Sistema
  - A: Accettazione
- \[ ID \]: Numero progressivo associato al test all'interno del suo tipo.

###### Stato dei test

Ad ogni test viene associato uno stato che ne riflette il risultato di esecuzione all'interno del Piano di Qualifica. Ogni può essere associato con uno di questi stati:

- **NI**: Non implementato
- **S**: Superato
- **NS**: Non Superato

#### Validazione

##### Introduzione

Il processo di Validazione conferma, tramite una dimostrazione oggettiva, che i requisiti specificati sono stati soddisfatti e che il %%prodotto|prodotto%% software risponde alle esigenze degli utenti finali.

##### Procedura di Validazione

Il processo di validazione prende come input i test effettuati sul %%prodotto|prodotto%% e valuta:

- Il grado di soddisfacimento dei Casi D'Uso.
- Il grado di soddisfacimento dei requisiti obbligatori.
- Il grado di soddisfacimento dei requisiti concordati con il %%committente|committente%%.

Se il processo ha esito positivo il %%prodotto|prodotto%% risponde in modo adeguato a tutte le esigenze degli utenti inizialmente identificate.

#### Gestione della configurazione

##### Introduzione

Il processo di Gestione della configurazione si occupa di identificare, organizzare e controllare le modifiche apportate a tutti gli artefatti coinvolti nel ciclo di vita del %%prodotto|prodotto%%.

##### Sistema di Versionamento

Il sistema di versionamento rappresenta le convenzioni utilizzate per la gestione delle versione di tutti i vari artefatti. La struttura utilizzata è rappresentata da: **X.Y.Z**.

- **X (Major)**: Indica una modifica significativa, spesso incompatibile con le versioni precedenti. Introduce nuove funzionalità o cambiamenti radicali.
- **Y (Minor)**: Indica l'aggiunta o la modifica di una funzionalità compatibile con le versioni precedenti. Non altera il comportamento esistente.
- **Z (Patch)**: Indica la correzione di un bug o un miglioramento minore che non introduce nuove funzionalità e non modifica il comportamento esistente.

L'incremento di valori più significativi azzera quelli meno significativi. Tutte le modifiche devono essere riportate all'interno del registro delle modifiche. Ogni documento entra nella repository con una versione 1.0.0 o superiore.

##### Repository

Ogni %%progetto|progetto%% sarà interamente contenuto all'interno di un unico repository al fine di raggruppare tutti i sorgenti necessari all'interno dello stesso archivio.
Di seguito sono elencati tutti i repository attualmente presenti:

- tech-wave-swe.github.io: Repository principale che raccoglie tutto il codice sorgente %%prodotto|prodotto%% durante il ciclo di vita del %%progetto|progetto%%. La separazione tra documentazione e software è garantita da una struttura organizzata in cartelle dedicate, mentre l'utilizzo delle Github Action consente di gestire le diverse automazioni in modo autonomo ed efficiente.
  Riferimento: [https://github.com/tech-wave-swe/tech-wave-swe.github.io](https://github.com/tech-wave-swe/tech-wave-swe.github.io).
- DocumentStyle: Contiene le classi utilizzate per la generazione dei PDF.
  Riferimento: [https://github.com/tech-wave-swe/DocumentStyle](https://github.com/tech-wave-swe/DocumentStyle).

#### Sincronizzazione e Branching

##### Creazione di un nuovo branch di sviluppo

Partendo dal branch develop del repository il redattore crea un nuovo branch utilizzando l'interfaccia di Jira o la CLI di GitHub.

Tramite Jira sarà necessario aprire il ticket corrispondente, selezionare "Create Branch" nella sezione Details >> Development. Nella nuova pagina selezionare la repository corrente e il branch develop mantenendo il nome assegnato. Selezionare infine "Create Branch".
Tramite CLI di GitHub sarà necessario spostarsi sul branch develop:

```bash
git checkout develop
```

Portare, se presenti, le ultime modifiche in locale:

```bash
git pull origin develop
```

Creare un nuovo branch utilizzando il seguente formato definito nella sezione 3.2.6.1.

```bash
git checkout -B TWD-xx-Esempio-di-branch
```

##### Creazione di una nuova Pull Request

Le Pull Requests sono un meccanismo che consente di notificare il completamento di una funzionalità e richiederne la revisione. Un Pull Requesto fornisce un ambiente dedicato per discutere della funzionalità proposta, fornendo riscontri e apportando le modifiche necessarie.
Per creare una nuova Pull Request:

1. Accedere al repository GitHub e selezionare la scheda "Pull Request".
2. Selezionare "New Pull Request".
3. Selezionare il branch di partenza ed il branch target, solitamente develop.
4. Cliccare il pulsante "Create Pull Request".
5. Aggiungere un titolo alla Pull Request. Assicurarsi che contenga il codice identificativo di tutti i ticket associati.
6. Aggiungere una descrizione.
7. Selezionare i verificatori.
8. Clicca il pulsante "Create Pull Request".
9. Nel caso siano presenti conflitti seguire le istruzioni in Github per rimuovere tali conflitti.

##### Convenzioni sulla nomenclatura dei branch

All'interno di un repository esistono diverse tipologie di branch:

- **main**: Rappresenta il branch principale. Contiene l'ultima versione approvata del %%prodotto|prodotto%% e della documentazione annessa.
- **develop**: Rappresenta il branch principale di sviluppo. Contiene tutti i file sorgente che hanno passato il processo di verifica. Il branch develop è l'unico branch che può richiedere una Pull Request al branch main.
- **feature**: Ogni branch feature rappresenta una funzionalità alla quale stanno lavorando uno o più membri del gruppo. Ogni branche feature è legato ad un ticket su Jira e deve possedere la seguente nomenclatura: **\[CODICE-TICKET\]-\[BREVE-DESCRIZIONE\]**.
  - \[CODICE-TICKET\]: Indica il codice del ticket su Jira corrispondente.
  - \[BREVE-DESCRIZIONE\]: Indica una breve descrizione del compito.

##### Flusso generale di sviluppo

Per ogni ticket assegnato all'interno di Jira:

1. Viene creato un nuovo branch seguendo le indicazioni fornite nella sezione 3.2.6.1.
2. Si effettuano tutte le modifiche necessarie.
3. Si effettua una Pull Request verso develop quando il compito è completato per richiedere la revisione.
4. Se la revisione viene approvata il codice viene unito al branch develop. In caso contrario è necessario ripartire dal punto 2 ed effettuare le modifiche proposte.
5. Al termine dello sprint il Responsabile di %%progetto|progetto%% verifica tutto ciò che è stato %%prodotto|prodotto%%. In caso di approvazione le modifiche vengono inserite all'interno del branch main.

Durante questo processo la dashboard di Jira è costantemente aggiornata tramite automazioni. Il ciclo di vita di un ticket viene descritto nella sezione 4.2.2.4.

### Risoluzione dei problemi

#### Introduzione

Il processo di Risoluzione dei Problemi si pone come obiettivo fornire un approccio tempestivo e documentato per analizzare e risolvere i problemi, di qualsiasi natura o fonte, che vengono rilevati durante l'esecuzione degli altri processi.

Questo processo non si limita alla sola risoluzione dei problemi ma si propone di identificare le cause e adottare misure preventive per evitarne la ripetizione in futuro promuovendo un ambiente di miglioramento continuo.

#### Gestione dei rischi

Il processo di Gestione dei Rischi ha l'obiettivo di identificare, analizzare, trattare e monitorare tutti i potenziali rischi di %%progetto|progetto%% associandoli a delle specifiche misure di mitigazione.

I rischi individuati all'interno del %%progetto|progetto%% sono specificati all'interno del Piano di %%Progetto|progetto%% nella sezione dedicata.

##### Codifica dei Rischi

Per identificare univocamente ogni rischio esso viene associato ad un codice identificativo basato sulla seguente convenzione: **R [ Tipologia ] [ Indice ] - [ Nome Associato ]**, dove:

- \[ Tipologia \] : Rappresenta il tipo di rischio descritto.
  - T: Rischio Tecnico
  - O: Rischio Organizzativo
- \[ Indice \] : Numero progressivo interno alla Tipologia.
- \[ Nome Associato \] : Nome che descrive brevemente il rischio.

#### Identificazione dei problemi

Ogni problema identificato durante lo svolgimento del %%progetto|progetto%% da un membro del gruppo deve essere segnalato tramite apertura di un Ticket su Jira di tipo Bug.

#### Strumenti

- **Jira**: ITS utilizzato all'interno del %%progetto|progetto%% per il tracciamento delle azioni da svolgere e delle problematiche individuate.

### Gestione della qualità

#### Introduzione

Il processo di Gestione della Qualità ha l'obiettivo di garantire la qualità del flusso operativo al fine di soddisfare i requisiti di qualità specificati. Questo processo racchiude quindi tutte le %%attività|attività%% di definizione degli obiettivi di qualità, delle metriche e dei criteri di qualità, la pianificazione e l'esecuzione del controllo di qualità e la verifica della qualità.

Il processo di Gestione della Qualità interessa tutto il ciclo di vita del software.

#### Piano di Qualifica

Tutte le %%attività|attività%% di definizione, pianificazione, controllo e revisione di qualità sono trattate all'interno del documento Piano di Qualifica. All'interno di questo documento sono definite in dettaglio le specifiche di qualità del %%prodotto|prodotto%% associate alle azioni di controllo necessarie.

#### PDCA

L'%%attività|attività%% di miglioramento continuo e correzione adotta il ciclo PDCA: una metodologia che consente il controllo ed il miglioramento continuo dei processi e dei prodotti basato sulle seguenti 4 fasi:

- **Plan**: Pianificazione dei processi da avviare per raggiungere obiettivi specifici.
- **Do**: Effettiva esecuzione dei processi pianificati, raccogliendo dati durante lo svolgimento dell'%%attività|attività%%.
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

## 4 Processi Organizzativi

### Introduzione

I processi organizzativi sono trasversali rispetto al %%progetto|progetto%% e vengono applicati in modo tale da stabilire, controllare e migliorare i processi del ciclo di vita del software, ai quali, quindi, forniscono il supporto necessario. Questa sezione del Piano di %%Progetto|progetto%% definisce i seguenti processi organizzativi: gestione dei processi, infrastruttura, miglioramento dei processi e formazione.

### Gestione dei processi

#### Introduzione

La gestione dei processi comprende le %%attività|attività%% che definiscono il modo in cui bisogna implementare i processi primari del ciclo di vita del software. Le %%attività|attività%% che lo costituiscono sono la definizione dei processi, la loro pianificazione, la loro esecuzione e controllo, la revisione e la valutazione dei prodotti, e la chiusura dei processi.

La definizione dei processi è la prima %%attività|attività%% della gestione dei processi. Tramite questa %%attività|attività%% vengono stabiliti i processi necessari allo svolgimento del %%progetto|progetto%% e vengono identificati i loro requisiti, controllandone la fattibilità.

La pianificazione consiste nella preparazione di un piano per l'esecuzione dei processi nel quale vengono definite le %%attività|attività%% e i task che li costituiscono.

Con l'esecuzione viene avviata l'implementazione del processo, affiancata a un suo controllo continuo tramite l'identificazione, l'analisi e la risoluzione degli errori che sorgono man mano.
La revisione e la valutazione dei prodotti è necessaria per assicurarsi che essi soddisfino i requisiti.
Quando tutti i task e tutte le %%attività|attività%% vengono conclusi e si ha un %%prodotto|prodotto%% completo, è possibile completare e chiudere il processo.

#### Pianificazione

##### Introduzione

L'%%attività|attività%% di pianificazione è essenziale per poter svolgere al meglio le %%attività|attività%% del ciclo di vita del software. Infatti, durante questa %%attività|attività%% il responsabile è incaricato di definire le %%attività|attività%% e i task a loro associati effettuando delle stime dei tempi necessari al loro completamento e un'%%analisi dei requisiti|analisi_dei_requisiti%% e delle risorse necessarie per completare i task, e stabilendo i rischi a loro associati.
La pianificazione viene documentata nel Piano di %%Progetto|progetto%%, aggiornato di volta in volta dal responsabile corrente.

##### Ruoli di %%progetto|progetto%%

I ruoli che ogni membro dovrà assumere almeno una volta durante tutta la durata del %%progetto|progetto%%, rispettando quanto preventivato nella candidatura, sono:

**Responsabile di %%progetto|progetto%%**: figura di riferimento per il gruppo, %%committente|committente%% e proponente con lo scopo di mediare durante tutte le tipologie di comunicazioni. Ha il ruolo di guidare il %%progetto|progetto%% a livello macroscopico gestendo i vari processi, in particolare:

- Pianificare e coordinare le task di %%progetto|progetto%%;
- Gestire le interazioni tra membri e con l'esterno;
- Studiare e amministrare i rischi;
- Approvare qualsiasi task completata e verificata.

**Amministratore (sysAdmin)**: figura professionale incaricata di amministrare l'ambiente di lavoro e garantire il rispetto delle norme del way of working per assicurare l'efficacia e l'efficienza dei processi, e in particolare di:

- Studiare ed implementare risorse per il miglioramento dell'ambiente di lavoro cercando di automatizzare i processi dove è possibile;
- Controllare il versionamento della documentazione e le configurazioni del %%prodotto|prodotto%% software;
- Controllare la qualità del %%prodotto|prodotto%%;
- Far rispettare il way of working ai vari membri.

**Progettista**: figura professionale incaricata di gestire la progettazione del %%prodotto|prodotto%% software. I suoi incarichi sono:

- Produrre un'%%architettura|architettura%% che rispetti e soddisfi l'%%analisi dei requisiti|analisi_dei_requisiti%%;
- Prendere scelte riguardanti gli aspetti tecnici e tecnologici per ottenere efficacia ed efficienza massima;
- Redigere i documenti di specifica tecnica del %%prodotto|prodotto%% software.

**Analista**: figura professionale incaricata di svolgere l'omonima %%analisi dei requisiti|analisi_dei_requisiti%% comprendendo le necessità dell'azienda proponente. I suoi incarichi sono:

- Redigere i documenti riguardanti l'%%analisi dei requisiti|analisi_dei_requisiti%%;
- Studiare il dominio d'interesse;
- Definire la complessità del problema e suddividerlo da un livello macroscopico a un livello microscopico, individuando i task richiesti.

**Programmatore**: figura professionale incaricata di implementare tramite codice l'%%architettura|architettura%% definita in fase di design. I suoi incarichi sono:

- Produrre codice che soddisfi i requisiti analizzati;
- Scrivere codice pulito e facile da mantenere versionandolo;
- Realizzare strumenti per la verifica del software %%prodotto|prodotto%%.

**Verificatore**: figura professionale incaricata di verificare che le %%attività|attività%%, la documentazione e il software prodotti seguano le regole e rispettino il livello di qualità atteso; ovviamente il verificatore non può verificare materiale %%prodotto|prodotto%% da lui stesso. I suoi incarichi sono:

- Esaminare il materiale in fase di revisione utilizzando tecniche e strumenti specificati nelle norme di %%progetto|progetto%%;
- Segnalare errori con consigli di miglioramento.

##### Gestione ticketing

Per la gestione dei task/ticket si utilizza come software Jira. Questo software permette di visualizzare un %%backlog|backlog%% generale in cui il responsabile di %%progetto|progetto%% andrà, via via, ad inserire tutti i task che saranno svolti durante tutta la durata del %%progetto|progetto%%. Jira permette anche di creare degli sprint, di lunghezze anche diverse tra loro, in cui è presente lo Sprint Backlog contenente tutti i task da svolgere durante lo sprint. Ogni task può ricevere un assegnatario al momento della creazione oppure il singolo membro può assegnarsi autonomamente un task.
Ogni task presenta:

- una **chiave** per identificarlo;
- una breve **descrizione**;
- uno **stato**, che può essere:
  - "%%backlog|backlog%%" se è stato appena creato;
  - "in corso" se è stato iniziato;
  - "revisione" se è stato completato e deve essere revisionato;
  - "to deploy" se è stato revisionato ed è stato fatto il merge con il branch develop su GitHub;
  - "completato" se è stato fatto il merge con il branch main su GitHub.
- lo **sprint** a cui appartengono;
- l'**assegnatario**;
- la **priorità**.

Una volta che viene completato un task, la persona o le persone che hanno contribuito al suo completamento segnalano il tempo produttivo che hanno speso e il ruolo che hanno ricoperto durante il suo svolgimento, usando un'applicazione di Jira chiamata Timetracker. Su Timetracker, le ore di %%progetto|progetto%% svolte sono facilmente consultabili anche in base alla persona o al ruolo. Inoltre, i task sono organizzati in epic (liste di task) a seconda della loro tipologia, che può essere, ad esempio, "documentazione di %%progetto|progetto%%, "gestione repo", ecc.

##### Ciclo di vita di un task

Ogni task ha un ciclo di vita, che ha inizio nel momento in cui viene creato, e fine nel momento in cui viene completato e quindi rimosso dal %%backlog|backlog%%.

In primo luogo, il responsabile crea un task, che viene aggiunto al %%backlog|backlog%% dello sprint corrente. Quando l'assegnatario inizia a lavorare su quel task, crea un branch su GitHub dedicato a esso e aggiorna lo stato a "in corso". Una volta che il task è stato completato, l'assegnatario crea una pull request su GitHub verso il branch "develop" e sposta il task sullo stato "revisione". Successivamente, un verificatore revisiona il lavoro fatto, approva la pull request e sposta il task sullo stato "to deploy". Per concludere il ciclo di vita di un task, il responsabile approva il lavoro effettuato facendo merge sul branch "main" e segnando il task come "completato".

##### Gestione della repository

La repository di riferimento del gruppo si trova su GitHub ed è fruibile dall'esterno tramite GitHub Pages organizzate tramite Docusaurus. La repo è suddivisa in tre sezioni principali: Candidatura, RTB e PB; al cui interno è presente la corrispondente documentazione.

##### Metodo di lavoro

Per mantenere organizzato al meglio il lavoro, il gruppo ha scelto di adottare la tecnica degli Sprint tipica del framework Scrum; che permette di suddividere il totale dei task contenuti nel Product %%Backlog|backlog%% in parti più piccole, che potranno poi essere prese in carico da ogni membro del gruppo, contenute nello Sprint %%Backlog|backlog%%.

Ogni sprint avrà durata di due settimane che poi potrà essere modificata a seconda delle esigenze; sarà suddiviso nelle seguenti fasi:

- **Sprint Planning**: a seguito di ogni riunione di "allineamento" avvenuta con l'azienda verrà effettuata una pianificazione dello sprint successivo. Le %%attività|attività%% che compongono questa fase sono:
  brainstorming di gruppo in cui ogni membro esprime le proprie opinioni.
  rintracciare tutte le %%attività|attività%% da svolgere da inserire nel %%backlog|backlog%% dello sprint.
  suddividere le %%attività|attività%% tra i vari componenti del gruppo.

- **Sprint Review**: revisione di ciò che è avvenuto durante l'ultimo sprint, in presenza di tutto il gruppo. Le %%attività|attività%% che compongono questa fase sono:
  obiettivi raggiunti: tutte le task e gli obiettivi portati a compimento nello sprint.
  obiettivi non raggiunti: tutte le task e gli obiettivi programmati che non sono stati portati a compimento durante lo sprint, con analisi sulle cause.
  produttività individuale: ogni membro dichiara ciò che ha svolto per poter ottenere un %%consuntivo|consuntivo%% delle ore e dei costi.

- **Sprint Retrospective**: retrospettiva dello sprint per poterlo concludere definitivamente e valutarne l'andamento. In questa fase verrà valutato ciò che è andato positivamente per poter continuare su questa strada, e ciò che è andato in maniera negativa proponendo soluzioni e miglioramenti per risolvere le questioni problematiche e migliorare il proprio metodo di lavoro.

#### Coordinamento

##### Introduzione

L'%%attività|attività%% di coordinamento corrisponde all'organizzazione della comunicazione all'interno del gruppo e tra il gruppo e l'azienda o il %%committente|committente%%. La comunicazione può avvenire in formato testuale o tramite riunioni.

##### Comunicazioni

Le comunicazioni si dividono in 2 tipi: Interne, Esterne.

Le comunicazioni interne avvengono tra i vari membri del gruppo su canali appositamente predisposti attraverso riunioni comunitarie e scambi di messaggi tra singoli individui, ovviamente verrà utilizzato un registro adeguato e saranno seguite alcune convenzioni (decise nella sezione Infrastruttura):

- **Discord** (a seconda del canale utilizzato):

  - testuale: scambio di messaggi formali volti all'organizzazione di decisioni e reminder derivate da riunioni.
  - vocale: comunicazioni formali durante meeting interni al gruppo; comunicazioni semi-formali/informali durante "scambi" tra colleghi.

- **Telegram** (a seconda della chat utilizzata):
  - gruppo: scambio di messaggi semi-formali strettamente inerenti al %%progetto|progetto%%.
  - singola: scambio di messaggi informali tra membri.

Le comunicazioni esterne avvengono tra il gruppo ed il proponente e %%committente|committente%%. Queste hanno, generalmente, un valore importante e vengono adeguatamente preparate tramite riunioni di gruppo. Gli strumenti utilizzati per queste comunicazioni sono: **Zoom** e **Google Mail** (tramite l'indirizzo [techwave.unipd@gmail.com](techwave.unipd@gmail.com)). Il registro è sempre formale e il mediatore predisposto per questo tipo di comunicazioni è il Responsabile di %%Progetto|progetto%%.

##### Riunioni

Le **riunioni interne** avvengono tra i membri del gruppo. Per quanto riguarda la frequenza non è definita ma avviene a seconda delle necessità, solitamente ne avviene almeno una a settimana. Questo tipo di riunioni sono concordate sul gruppo Telegram e si cerca di svolgere in giorni in cui tutti i membri siano disponibili, in caso ciò non fosse possibile i membri assenti potranno comunque sapere tutto quello che è accaduto e che è stato deciso tramite i verbali prodotti, se necessario il Responsabile si renderà disponibile a chiarire qualsiasi dubbio.

Per sfruttare efficacemente il tempo di lavoro sincrono delle riunioni interne, si adottano queste accortezze:

- Scaletta: questa rappresenta l'ordine del giorno ed indica gli argomenti da trattare.
  organizzazione: il Responsabile sarà tenuto a mantenere l'ordine durante la riunione e verrà designato uno scriba con il compito di tenere traccia di ciò che avviene durante la riunione e redigere il verbale.
- Preparazione: ogni membro del gruppo si impegna ad arrivare sufficientemente preparato sugli argomenti, soprattutto di carattere tecnico, che sono discussi durante la riunione con domande e spiegazioni, inoltre si mantiene un impegno attivo e produttivo durante tutta la sua durata.

Gli argomenti in scaletta saranno tratti dal %%backlog|backlog%% dello sprint e verrà riservato un momento finale dove poter parlare di argomenti non in scaletta, ovviamente comunque inerenti al %%progetto|progetto%%.

Le **riunioni esterne** avvengono tra gruppo e %%committente|committente%% o proponente. Queste servono soprattutto per valutare il lavoro svolto fino a quel momento e pianificare gli step successivi da seguire per poter continuare a lavorare nel modo più efficace ed efficiente possibile. Anche in questo caso i membri del gruppo si impegnano ad essere preparati a sufficienza per poter discutere con "personale esperto" di argomenti solitamente di non facile comprensione inerenti al %%progetto|progetto%%. Verranno ovviamente stilati verbali esterni per fissare il punto su ciò di cui si è trattato e a cui si avrà approvazione dalla parte "esterna" al gruppo coinvolta nella discussione.

##### Disponibilità

Il lavoro personale è organizzato individualmente da ogni componente del gruppo per poter lasciare libertà in quanto impegnati con questioni accademiche, personali e seguendo quanto dichiarato nella candidatura nella sezione di dichiarazione impegni. Ovviamente l'organizzazione dovrà essere consona agli impegni totali del gruppo per evitare ritardi dovuti ad un singolo elemento. In caso di problematiche di indisponibilità che porteranno al non compimento degli impegni di %%progetto|progetto%% presi in carico dal singolo membro, questo si impegna ad avvisare prontamente il Responsabile che cercherà di ridistribuire il lavoro contattando singolarmente i membri oppure indicendo una riunione di gruppo.

### Infrastruttura

Fanno parte dell'infrastruttura organizzativa tutti gli strumenti che permettono al gruppo di attuare in modo efficace ed efficiente i processi organizzativi. In particolare strumenti che permettono la comunicazione, il coordinamento e la pianificazione del lavoro.

- **Discord**:
  Strumento di comunicazione interna sincrona. Vengono usati due canali principali:
  - **Canale testuale**: comunicazioni sincrone per reminder di argomenti discussi e da discutere durante la riunione.
  - **Canale vocale**: canale di comunicazione utilizzato per le riunioni di gruppo con la possibilità di condivisione dello schermo.

Ogni categoria di canale può avere un numero variabile di sottocanali utilizzati a seconda delle necessità.

- Telegram:
  Strumento di comunicazione interna testuale asincrona. Viene utilizzato in due modalità:

  - gruppo: chat condivisa tra tutti i membri del gruppo utilizzata per la maggior parte delle comunicazioni riguardanti il %%progetto|progetto%%.
  - individuale: chat utilizzata per contattare singolarmente un membro del gruppo per evitare "disturbi" a tutti gli altri membri.

- **Google Drive**:
  Strumento utilizzato come directory condivisa dai membri del gruppo per archiviazione di file temporanei o non ufficiali. In questa directory si ha accesso alla suite Google con Docs, Sheets, Slides.

- **Google Mail**:
  Strumento per lo scambio di email mediante l'indirizzo di posta condiviso [techwave.unipd@gmail.com](techwave.unipd@gmail.com) utilizzato per comunicazioni esterne con proponente e %%committente|committente%%.

- **Zoom**:
  Strumento di comunicazione video sincrona con il proponente.

- **Miro**:
  Strumento di collaborazione digitale utilizzato durante le riunioni con il proponente per facilitare la comunicazione e fissare gli argomenti trattati nell'incontro.

- **Jira**:
  Strumento utilizzato per il ticketing e la gestione delle task con cui si programmano i vari sprint, ci si divide le task e si rendicontano le ore produttive dei membri.

- **GitHub**:
  Strumento di controllo di versione dove è situata la repository ufficiale contenente tutta la documentazione di %%progetto|progetto%% ed il codice %%prodotto|prodotto%%.

- **GitFlow**:
  Modello di branching Git alternativo che prevede l'uso di feature branch e di più branch primari per il controllo di versione.

### Miglioramento dei processi

Il processo di miglioramento consiste di due %%attività|attività%% principali, una di valutazione e una di miglioramento dei processi.

#### Valutazione

Per effettuare l'%%attività|attività%% di valutazione in modo regolare, a fine sprint viene effettuata la sprint retrospective, che mira ad analizzare le cose fatte durante lo sprint cercando di capire cosa è andato bene e cosa è andato male, e, nel secondo caso, cosa si può cambiare nel modo in cui si stanno facendo le cose per poter avere un miglioramento.

#### Miglioramento

Durante lo svolgimento del %%progetto|progetto%% soprattutto nella fase stesura dei documenti e del %%prodotto|prodotto%% software il gruppo cercherà di portare un miglioramento continuo del lavoro, per evitare di ripetere errori già fatti, fornendo delle soluzioni alle problematiche riscontrate durante il tragitto. Per svolgere al meglio questo processo di miglioramento usufruiremo della sezione Valutazione di miglioramento posta nel Piano di Qualifica. In questa sezione del documento è possibile trovare i problemi principali riscontrati dal gruppo, con descrizioni e soluzioni opportune.

### Formazione

Per garantire che tutti i membri del gruppo possano lavorare alla stessa velocità, allo stesso livello e seguendo le stesse convenzioni, i membri studiano in autonomia tutti gli strumenti di lavoro utilizzati per la documentazione, la gestione di %%progetto|progetto%% e lo sviluppo software. Verranno anche riservati dei momenti durante le varie riunioni di gruppo in cui i membri più esperti in alcuni campi faranno una breve "spiegazione" per facilitare la comprensione degli strumenti agli altri membri.

Vengono riportati, di seguito, riferimenti alla documentazione dei vari strumenti/framework utilizzati:

LaTeX: [https://www.overleaf.com/learn](https://www.overleaf.com/learn).

GitHub: [https://docs.github.com](https://docs.github.com).

Jira: [https://www.atlassian.com/software/jira/guides/getting-started/introduction](https://www.atlassian.com/software/jira/guides/getting-started/introduction).

Framework SCRUM: [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html).

## Standard per la qualità

### Qualità dei processi

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le %%attività|attività%% di supporto necessarie per lo sviluppo di un %%prodotto|prodotto%% software.

In particolare è necessario individuare delle metriche che indicano l'avanzamento dei processi in relazione al budget, al valore pianificato e quello svolto, ai rischi emersi e agli errori individuati.

### Qualità di prodotto

Per garantire la qualità del %%prodotto|prodotto%%, il team adotta il modello di riferimento ISO/IEC 25010 (unione di ISO/IEC 9126 e ISO/IEC 14598) che definisce un modello di qualità del software basato su sei caratteristiche fondamentali: funzionalità, affidabilità, usabilità, efficienza, manutenibilità e portabilità.

In particolare è necessario individuare delle metriche rappresentanti la funzionalità, l'affidabilità, l'usabilità, l'efficienza, la manutenibilità e la portabilità.

I **test di verifica e validazione** vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del %%prodotto|prodotto%% con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
