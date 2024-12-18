# Documento delle Norme di Progetto

<details>
  <summary>Changelog</summary>

| Data | Versione | Descrizione | Autore | Data Verifica | Verificatore |
|------|----------|-------------|---------|------------------|-------------|
| 20/11/2024 | 0.1.1 | Aggiunta sezione 4 | Piola Andrea | 03/12/2024 | Pistori Gaia |
| 14/11/2024 | 0.1.0 | Prima stesura del documento con indice e sezione 1 | Piola Andrea | 19/11/2024 | Pistori Gaia |

</details>

**1. Introduzione**

    1.1 Scopo del Documento

    1.2. Scopo del Prodotto

    1.3. Glossario

    1.4. Riferimenti

**2. Processi Primari**

    2.1. Fornitura

    2.2. Sviluppo

**3. Processi di Supporto**

    3.1. Documentazione

    3.2. Gestione della Configurazione

    3.3. Accertamento della Qualità

    3.4. Verifica

    3.5. Validazione

**4. Processi Organizzativi**

    4.1. Gestione di Processo

    4.2. Infrastruttura

    4.3. Miglioramento

    4.4. Formazione

# 1. Introduzione

## 1.1 Scopo del Documento

Lo scopo del documento è quello di definire le norme che ogni componente del gruppo TechWave dovrà rispettare per ottenere un prodotto finale fatto a regola d'arte. In questo documento, inoltre, vengono descritte le convenzioni da rispettare nell'utilizzo degli strumenti e vengono esposti i processi che saranno adottati dal gruppo. Questo documento è redatto seguendo un approccio incrementale, in quanto durante tutta la durata del progetto possono cambiare oppure si possono aggiungere/rimuovere le norme a seconda delle necessità.

## 1.2 Scopo del Prodotto

Nello sviluppo di software per sistemi embedded la parte di controllo dell'implementazione di tutti i requisiti necessari al corretto funzionamento dello stesso risulta costosa e ripetitiva da parte dello sviluppatore, inoltre può risultare non esaustiva a causa di distrazioni o dimenticanze. Il capitolato ***Requirement Tracker - Plug-in VSCode*** propone lo sviluppo di un plugin per VSCode che permetta di tracciare i requisiti derivanti da documenti tecnici di sistemi embedded, valutare se il codice del software scritto da sviluppatori implementi i vari requisiti in modo esaustivo, ed in caso di mancata implementazione dia un avviso per avvertire dell'effettiva assenza.

## 1.3 Glossario

Per evitare incomprensioni riguardanti la terminologia utilizzata all'interno dei vari documenti, viene fornito un Glossario che racchiude tutti i vari termini tecnici, potenzialmente ambigui, con la propria definizione precisa. I termini presenti all'interno del glossario verranno evidenziati nei documenti tramite *("Come?")*.

## 1.4 Riferimenti

Riferimenti normativi:

-   Capitolato d'appalto C8

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

-   Corso di Ingegneria del software - Regolamento di Progetto

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/PD1.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/PD1.pdf)

Riferimenti informativi:

-   Corso di Ingegneria del software - Processi di Ciclo di Vita

> [https://www.math.unipd.it/\~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)

# 4. Processi Organizzativi

## 4.1 Gestione di progetto

### 4.1.1 Coordinamento

***Comunicazioni***

Le comunicazioni si dividono in 2 tipi: ***Interne***, ***Esterne***.

Le comunicazioni **interne** avvengono tra i vari membri del gruppo su canali appositamente predisposti attraverso riunioni comunitarie e scambi di messaggi tra singoli individui, ovviamente verrà utilizzato un registro adeguato e saranno seguite alcune convenzioni (decise nella sezione 4.2 Infrastruttura):

-   **Discord** (a seconda del canale utilizzato):

    -   **Testuale:** scambio di messaggi formali volti all'organizzazione di decisioni e reminder derivate da riunioni.

    -   **Vocale:** comunicazioni formali durante meeting interni al gruppo; comunicazioni semi-formali/informali durante "scambi" tra colleghi.

-   **Telegram** (a seconda della chat utilizzata):

    -   **Gruppo:** scambio di messaggi semi-formali strettamente
        inerenti al progetto.

    -   **Singola:** scambio di messaggi informali tra membri.

Le comunicazioni **esterne** avvengono tra il gruppo ed il proponente e committente. Queste hanno, generalmente, un valore importante e vengono adeguatamente preparate tramite riunioni di gruppo. Gli strumenti utilizzati per queste comunicazioni sono: **Zoom** e **Google Mail** (tramite l'indirizzo [techwave.unipd@gmail.com](mailto:techwave.unipd@gmail.com)). Il registro è sempre formale ed il mediatore predisposto per questo tipo di comunicazioni è il *Responsabile di Progetto*.

***Riunioni***

Le riunioni **interne** avvengono tra i membri del gruppo. Per quanto riguarda la frequenza non è definita ma avviene a seconda delle necessità, solitamente ne avviene almeno una a settimana. Questo tipo di riunioni sono concordate sul gruppo telegram e si cerca di svolgere in giorni in cui tutti i membri siano disponibili, in caso ciò non fosse possibile i membri assenti potranno comunque sapere tutto quello che è accaduto e che è stato deciso tramite i verbali prodotti, se necessario il Responsabile si renderà disponibile a chiarire qualsiasi dubbio.

Per sfruttare efficacemente il tempo di lavoro sincrono delle riunioni interne, si adottano queste accortezze:

-   *Scaletta*: questa rappresenta l'ordine del giorno ed indica gli argomenti da trattare.

-   *Organizzazione*: il Responsabile sarà tenuto a mantenere l'ordine durante la riunione ed verrà designato uno scriba con il compito di tenere traccia di ciò che avviene durante la riunione e redigere il verbale.

-   *Preparazione*: ogni membro del gruppo si impegna ad arrivare sufficientemente preparato sugli argomenti, soprattutto di carattere tecnico, che sono discussi durante la riunione con domande e spiegazioni, inoltre si mantiene un impegno attivo e produttivo durante tutta la sua durata.

Gli argomenti in scaletta saranno tratti dal backlog dello sprint e verrà ovviamente riservato un momento finale dove poter parlare di argomenti non in scaletta, ovviamente comunque inerenti al progetto.

Le riunioni **esterne** avvengono tra gruppo e committente o proponente. Queste servono soprattutto per valutare il lavoro svolto fino a quel momento e pianificare gli step successivi da seguire per poter continuare a lavorare nel modo più efficace ed efficiente possibile. Anche in questo caso i membri del gruppo si impegnano ad essere preparati a sufficienza per poter discutere con "personale esperto" di argomenti solitamente di non facile comprensione inerenti al progetto. Verranno ovviamente stilati verbali esterni per fissare il punto su ciò di cui si è trattato ed a cui si avrà approvazione dalla parte "esterna" al gruppo coinvolta nella discussione.

***Disponibilità***

Il lavoro personale è organizzato individualmente da ogni componente del gruppo per poter lasciare libertà in quanto impegnati con questioni accademiche, personali e seguendo quanto dichiarato nella candidatura alla sezione di dichiarazione impegni. Ovviamente l'organizzazione dovrà essere consona agli impegni totali del gruppo per evitare ritardi dovuti ad un singolo elemento. In caso di problematiche di indisponibilità che porteranno al non compimento degli impegni di progetto presi in carico dal singolo membro, questo si impegna ad avvisare prontamente il Responsabile che cercherà di ridistribuire il lavoro contattando singolarmente i membri oppure indicendo una riunione di gruppo.

### 4.1.2 Pianificazione

**Ruoli di progetto**

I ruoli che ogni membro dovrà assumere almeno una volta durante tutta la durata del progetto, rispettando quanto preventivato nella candidatura, sono:

-   ***Responsabile di progetto:*** figura di riferimento per il gruppo, committente e proponente con lo scopo di mediare durante tutte le tipologie di comunicazioni. Ha il ruolo di guidare il progetto a livello macroscopico gestendo i vari processi, in particolare:

    -   Pianificare e coordinare le task di progetto;

    -   Gestire le interazioni tra membri e con l'esterno;

    -   Studiare e amministrare i rischi;

    -   Approvare qualsiasi task completata e verificata.

-   ***Amministratore (sysAdmin):*** figura professionale incaricata di amministrare l'ambiente di lavoro e garantire il rispetto delle norme del *way of working* per assicurare l'efficacia ed efficienza dei processi, in particolare:

    -   Studiare ed implementare risorse per il miglioramento dell'ambiente di lavoro cercando di automatizzare i processi dove è possibile;

    -   Controllare il versionamento della documentazione e le configurazioni del prodotto software;

    -   Controllare la qualità del prodotto;

    -   Far rispettare il way of working ai vari membri.

-   ***Progettista:*** figura professionale incaricata di gestire la progettazione del prodotto software. I suoi incarichi sono:

    -   Produrre un'architettura che rispetti e soddisfi l'analisi dei requisiti;

    -   Prendere scelte riguardanti gli aspetti tecnico/tecnologici per ottenere efficacia ed efficienza massima;

    -   Redigere i documenti di specifica tecnica del prodotto software.

-   ***Analista:*** figura professionale incaricata di svolgere l'omonima analisi dei requisiti comprendendo le necessità dell'azienda proponente. I suoi incarichi sono:

    -   Redigere i documenti riguardanti l'analisi dei requisiti;

    -   Studiare il dominio d'interesse;

    -   Definire la complessità del problema e suddividerlo da un livello macroscopico ed un livello microscopico, individuando le task richieste.

-   ***Programmatore:*** figura professionale incaricata di implementare tramite codice l'architettura definita in fase di *design.* I suoi incarichi sono:

    -   Produrre codice che soddisfi i requisiti analizzati;

    -   Scrivere codice pulito e facile da mantenere versionandolo;

    -   Realizzare strumenti per la verifica del software prodotto;

-   ***Verificatore:*** figura professionale incaricata di verificare che le attività, documentazione e software prodotti seguano le regole e rispettino il livello di qualità atteso; ovviamente il verificatore non può verificare materiale prodotto da lui stesso. I suoi incarichi sono:

    -   Esaminare il materiale in fase di revisione utilizzando tecniche e strumenti specificate nelle norma di progetto;

    -   Segnalare errori con consigli di miglioramento.

**Gestione delle task/ticket**

Per la gestione delle task/ticket si utilizza come software *Jira*. Questo software permette di visualizzare un backlog generale in cui il Responsabile di progetto andrà, via via, ad inserire tutte le task che saranno svolte durante tutta la durata del progetto. Jira permette anche di creare degli sprint, di lunghezze anche diverse tra loro, in cui è presente lo *Sprint Backlog* contenente tutte le task da svolgere durante lo sprint. Ogni task può ricevere un assegnatario al momento della creazione oppure il singolo membro può assegnarsi autonomamente le task ed è possibile rendicontare le ore svolte per la singola task.

**Gestione della repository**

La repository di riferimento del gruppo si trova su GitHub ed è fruibile dall'esterno tramite *GitHub Pages* organizzate tramite *Docusaurus*. La repo è suddivisa in tre sezioni principali: candidatura, rtb e pb; al cui interno sono presenti sottocartelle contenenti documentazione, codice, script...

**Metodo di lavoro**

Per mantenere organizzato al meglio il lavoro il gruppo ha scelto di adottare la tecnica degli *Sprint* tipica del framework *Scrum*; che permette di suddividere il totale delle task contenuto nel *Product Backlog* in parti più piccole, che potranno poi essere prese in carico da ogni membro del gruppo, contenute nello *Sprint Backlog*.

Ogni sprint avrà durata, per lo meno nella prima parte del progetto, di due settimane che poi potrà essere modificata a seconda delle esigenze; sarà suddiviso nelle seguenti fasi:

-   **Sprint Planning:** a seguito di ogni riunione di "allineamento" avvenuta con l'azienda verrà effettuata una pianificazione dello sprint successivo. Le attività che compongono questa fase sono:

    -   Brainstorming di gruppo in cui ogni membro esprime le proprie opinioni.

    -   Rintracciare tutte le attività da svolgere da inserire nel backlog dello sprint.

    -   Suddividere le attività tra i vari componenti del gruppo.

-   **Sprint Review:** revisione di ciò che è avvenuto durante l'ultimo sprint, in presenza di tutto il gruppo. Le attività che compongono questa fase sono:

    -   Obiettivi raggiunti: tutte le task e gli obiettivi portati a compimento nello sprint.

    -   Obiettivi non raggiunti: tutte le task e gli obiettivi programmati che non sono stati portati a compimento durante lo sprint, con analisi sulle cause.

    -   Produttività individuale: ogni membro dichiara ciò che ha svolto per poter ottenere un consuntivo delle ore e dei costi.

-   **Sprint Retrospective:** retrospettiva dello sprint, che avviene con l'azienda, per poterlo concludere definitivamente e valutarne l'andamento. In questa fase verrà valutato ciò che è andato positivamente per poter continuare su questa strada, e ciò che è andato in maniera negativa proponendo soluzioni e miglioramenti per risolvere le questioni problematiche e migliorare il proprio metodo di lavoro.

## 4.2 Infrastruttura

Fanno parte dell'infrastruttura organizzativa tutti gli strumenti che permettono al gruppo di attuare in modo efficace ed efficiente i processi organizzativi. In particolare strumenti che permettono la **comunicazione**, il **coordinamento** e la **pianificazione**.

**Discord**

Strumento di **comunicazione interna sincrona**. Vengono usati due canali principali:

-   **Canale testuale:** comunicazioni sincrone per reminder di argomenti discussi e da discutere durante la riunione.

-   **Canale vocale:** canale di comunicazione utilizzato per le riunioni di gruppo con la possibilità di condivisione dello schermo.

Ogni categoria di canale può avere un numero variabile di sottocanali utilizzati a seconda delle necessità.

**Telegram**

Strumento di **comunicazione interna testuale asincrona**. Viene utilizzato in due modalità:

-   **Gruppo:** chat condivisa tra tutti i membri del gruppo utilizzata per la maggior parte delle comunicazioni riguardanti il progetto.

-   **Individuale:** chat utilizzata per contattare singolarmente un membro del gruppo per evitare "disturbi" a tutti gli altri membri.

**Google Drive**

Strumento utilizzato come **directory condivisa** dai membri del gruppo per archiviazione di file temporanei o non ufficiali. In questa directory si ha accesso alla *suite Google* con *Docs*, *Sheets*, *Slides*.

**Google Mail**

Strumento per lo scambio di email mediante l'indirizzo di posta condiviso [techwave.unipd@gmail.com](mailto:techwave.unipd@gmail.com) utilizzato per **comunicazioni esterne** con proponente e committente.

**Zoom**

Strumento di **comunicazione video sincrona** con il proponente.

**Miro**

Strumento di **collaborazione digitale** utilizzato durante le riunioni con il proponente per facilitare la comunicazione e fissare gli argomenti trattati nell'incontro.

**Jira**

Strumento utilizzato per il **ticketing e la gestione delle task** con cui si programmano i vari sprint, ci si divide le task e si rendicontano le ore produttive dei membri.

**GitHub**

Strumento di **controllo di versione** dove è situata la repository ufficiale contenente tutta la documentazione di progetto ed il codice prodotto.

## 4.3 Miglioramento

Durante lo svolgimento del progetto soprattutto nella fase stesura dei documenti e del prodotto software il gruppo cercherà di portare un miglioramento continuo del lavoro, per evitare di ripetere errori già fatti, fornendo delle soluzioni alle problematiche riscontrate durante il tragitto. Per svolgere al meglio questo processo di miglioramento usufruiremo delle sezioni apposite poste nel *Piano di Qualifica*. In queste sezioni del documento è possibile trovare i problemi principali riscontrati dal gruppo, con descrizioni e soluzioni opportune.

## 4.4 Formazione

Per garantire che tutti i membri del gruppo possano lavorare alla stessa velocità, allo stesso livello e seguendo le stesse convenzioni, i membri studiano in autonomia tutti gli strumenti di lavoro utilizzati per la documentazione, la gestione di progetto e lo sviluppo software. Verranno anche riservati dei momenti durante le varie riunioni di gruppo in cui, membri più esperti in alcuni campi, faranno una breve "spiegazione" per facilitare la comprensione degli strumenti agli altri membri.

Vengono riportati, di seguito, riferimenti alla documentazione dei vari strumenti/framework utilizzati:

-   LaTeX:

> [https://www.overleaf.com/learn](https://www.overleaf.com/learn)

-   GitHub:

> [https://docs.github.com](https://docs.github.com)

-   Jira:

> [https://www.atlassian.com/software/jira/guides/getting-started/introduction](https://www.atlassian.com/software/jira/guides/getting-started/introduction)

-   Framework SCRUM:

> [https://scrumguides.org/scrum-guide.html](https://scrumguides.org/scrum-guide.html)
