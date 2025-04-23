---
id: piano_di_qualifica
title: "Piano di Qualifica - v1.8.1"
documentclass: TWDocumentFull
toc: true
lof: true
numbersections: true
version: 1.8.1
classification: Esterno
---

<!-- ::: {.no-export} -->

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di Qualifica

<details>
  <summary>Changelog</summary>

<!-- ::: -->

| Data       | Versione | Descrizione                                              | Autore                | Data Verifica | Verificatore          |
|------------| -------- |----------------------------------------------------------| --------------------- |---------------| --------------------- |
| 19/04/2025 | 1.8.1    | Aggiornati test di unità e aggiunti test di integrazione | Vasquez Manuel Felipe | 19/04/2025    | Monetti Luca          |
| 17/04/2025 | 1.8.0    | Aggiunta test di unità                                   | Carraro Agnese        | 18/04/2025    | Vasquez Manuel Felipe |
| 17/04/2025 | 1.7.7    | Fix link tabelle                                         | Vasquez Manuel Felipe | 17/04/2025    | Agnese Carraro        |
| 16/04/2025 | 1.7.6    | Aggiornamento test di sistema                            | Agnese Carraro        | 17/04/2025    | Vasquez Manuel Felipe |
| 10/04/2025 | 1.7.5    | Cambio stato test di accettazione                        | Giulia Marcon         | 10/04/2025    | Carraro Agnese        |
| 30/03/2025 | 1.7.4    | Controllo consistenza maiuscole                          | Dal Bianco Riccardo   | 30/03/2025    | Vasquez Manuel Felipe |
| 07/03/2025 | 1.7.3    | Aggiunta interpretazione dei grafici                     | Monetti Luca          | 07/03/2025    | Pistori Gaia          |
| 06/03/2025 | 1.7.2    | Miglioramento metriche                                   | Piola Andrea          | 07/03/2025    | Luca Monetti          |
| 24/02/2025 | 1.7.1    | Fix indici tabelle                                       | Piola Andrea          | 25/02/2025    | Gaia Pistori          |
| 09/02/2025 | 1.7.0    | Note di auto-miglioramento                               | Manuel Felipe Vasquez | 12/02/2025    | Luca Monetti          |
| 31/01/2025 | 1.6.0    | Inserimento cruscotto                                    | Gaia Pistori          | 05/02/2025    | Manuel Felipe Vasquez |
| 24/01/2025 | 1.5.0    | Aggiunti test                                            | Giulia Marcon         | 26/01/2025    | Gaia Pistori          |
| 16/01/2025 | 1.4.0    | Aggiunte misure                                          | Luca Monetti          | 17/01/2025    | Manuel Felipe Vasquez |
| 03/01/2025 | 1.3.0    | Modifica descrizione e riferimenti                       | Manuel Felipe Vasquez | 06/01/2025    | Luca Monetti          |
| 22/12/2024 | 1.2.0    | Aggiunte metriche di qualità di Prodotto                 | Gaia Pistori          | 24/12/2024    | Manuel Felipe Vasquez |
| 16/12/2024 | 1.1.0    | Aggiunta qualità di processo                             | Giulia Marcon         | 17/12/2024    | Agnese Carraro        |
| 08/12/2024 | 1.0.0    | Prima stesura del documento                              | Manuel Felipe Vasquez | 10/12/2024    | Luca Monetti          |

Table: Changelog

<!-- ::: {.no-export} -->

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

<!-- ::: -->

## Introduzione

### Scopo del documento

Questo documento delinea le strategie di verifica, validazione e quality assurance adottate durante lo sviluppo del progetto, definendo gli obiettivi qualitativi e le relative metriche di misurazione. Include la documentazione dettagliata delle procedure di verifica, dei processi di controllo qualità, e delle metodologie di test implementate nelle varie fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team.
Si concentra su:

- La qualità dei processi, in termini di aderenza agli standard e alle pratiche di gestione del ciclo di vita del software.
- La qualità del prodotto, attraverso la definizione di metriche misurabili e verificabili.
- L'adozione di un modello a V per la pianificazione e l'esecuzione delle attività di test e validazione.

### Glossario

Per una definizione dei termini tecnici utilizzati in questo documento, consultare il [Glossario - v2.2.0](./Glossario.md).

### Riferimenti

#### Riferimenti normativi

- **Norme di Progetto**: [Norme di Progetto - v1.8.1](./Norme%20di%20Progetto.md)
- **Capitolato d'Appalto C8: Requirement Tracker- Plug-in VS Code**: [https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf)

#### Riferimenti informativi

- T2 - I processi di ciclo di vita del software [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)
- T7 - Qualità del software [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf)
- T8 - Qualità di processo [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf)
- T9 - Verifica e Validazione [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T09.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T09.pdf)
- T10 - Analisi Statica [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T10.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T10.pdf)
- T11 - Analisi Dinamica [https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T11.pdf](https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T11.pdf)

- **ISO/IEC 9126**: "Software engineering - Product quality - Part 1: Quality model"
- **ISO/IEC 12207**: "Information technology - Software life cycle processes"
- **ISO/IEC 14598**: "Information technology - Software product evaluation"
- **ISO/IEC 25010**: "Systems and software engineering - Systems and software Quality Requirements and Evaluation (SQuaRE) - System and software quality models"

## Qualità di processo

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le attività di supporto necessarie per lo sviluppo di un prodotto software.

### Processi primari

| Metrica | Nome                           | Descrizione                                                | Obiettivo                                           | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------------------ | ---------------------------------------------------------- | --------------------------------------------------- | ------------------ | ------------------- |
| MPCR01  | **Planned Value**              | Valore del lavoro pianificato fino a una data specifica    | Comparare il progresso pianificato con quello reale | ≤ Budget previsto  | < Budget previsto   |
| MPCR02  | **Actual Cost**                | Costo effettivo sostenuto per il lavoro svolto             | Controllare le spese del progetto                   | ≤ Budget previsto  | < Budget previsto   |
| MPCR03  | **Earned Value**               | Valore del lavoro effettivamente svolto                    | Monitorare l'avanzamento economico del progetto     | ≥ Actual Cost      | -                   |
| MPCR04  | **Schedule Variance**          | Differenza tra il valore acquisito e il valore pianificato | Valutare l'aderenza ai tempi di progetto            | ≥ -5%              | ≥ 0%                |
| MPCR05  | **Cost Variance**              | Differenza tra il valore acquisito e il costo effettivo    | Valutare l'efficienza economica del progetto        | ≥ -5%              | ≥ 0%                |
| MPCR06  | **Schedule Performance Index** | Rapporto tra il valore acquisito e il valore pianificato   | Misurare l'efficienza temporale                     | ≥ 0.95             | ≥ 1.0               |
| MPCR07  | **Cost Performance Index**     | Rapporto tra il valore acquisito e il costo effettivo      | Misurare l'efficienza dei costi                     | ≥ 0.95             | ≥ 1.0               |

Table: Metriche per i processi primari

#### Planned value

**Metrica**: MPCR01

**Formula**: $\text{Planned Value} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Budget preventivo}_i)$

- Rappresenta il budget autorizzato assegnato al lavoro pianificato.
- Indica quanto lavoro dovrebbe essere stato completato ad una determinata data.

---

#### Actual cost

**Metrica**: MPCR02

**Formula:**: $\text{Actual Cost} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Budget Consuntivo}_i)$

- Somma di tutti i costi realmente sostenuti per il lavoro completato fino ad oggi.
- Indica l'effettivo costo per lo svolgimento delle attività.

---

#### Earned value

**Metrica**: MPCR03

**Formula:** $\text{Earned Value} = \text{Planned Value} \times \frac{\text{Actual Story Points}}{\text{Planned Story Points}}$

- Il valore del lavoro effettivamente completato, calcolato moltiplicando la percentuale di completamento (data dalla divisione dei Story Points effettivi e quelli preventivati) per il suo budget pianificato.
- Rappresenta quanto valore è stato prodotto in base al lavoro effettivamente svolto.

---

#### Schedule variance

**Metrica**: MPCR04

**Formula**: $\text{Schedule Variance} = \text{Earned Value} - \text{Planned Value}$

- Misura la differenza tra il lavoro completato e quello pianificato.
- Un valore positivo indica che il progetto è in anticipo sulla schedulazione.

---

#### Cost variance

**Metrica**: MPR05

**Formula**: $\text{Cost Variance} = \text{Earned Value} - \text{Actual Cost}$

- Misura la differenza tra il valore del lavoro completato e il suo costo effettivo.
- Un valore positivo indica che il progetto sta spendendo meno del previsto.

---

#### Schedule performance index

**Metrica**: MPCR06

**Formula**: $\text{Schedule Performance Index} = \dfrac{\text{Earned Value}}{\text{Planned Value}}$

- Indica l'efficienza nel rispetto dei tempi pianificati.
- Un valore maggiore di 1 indica che il progetto sta procedendo più velocemente del previsto.

---

#### Cost performance index

**Metrica**: MPCR07

**Formula**: $\text{Cost Performance Index} = \dfrac{\text{Earned Value}}{\text{Actual Cost}}$

- Indica l'efficienza nell'utilizzo delle risorse.
- Un valore maggiore di 1 indica che si sta spendendo meno del previsto per il lavoro completato.

### Processi di supporto

| Metrica | Nome                       | Descrizione                                        | Obiettivo                                                       | Valore Accettabile         | Valore Desiderabile          |
| ------- | -------------------------- | -------------------------------------------------- | --------------------------------------------------------------- | -------------------------- | ---------------------------- |
| MPCS01  | **Budget At Completion**   | Totale del budget allocato per il progetto         | Gestire e controllare le risorse finanziarie complessive        | ≤ +10% del budget iniziale | Corrispondente al preventivo |
| MPCS02  | **Estimate At Completion** | Stima dei costi per il completamento del progetto  | Prevedere i costi rimanenti e pianificare le risorse necessarie | ≤ Budget At Completion     | Corrispondente al preventivo |
| MPCS03  | **Estimate To Complete**   | Costo stimato per completare le attività rimanenti | Supportare la pianificazione finanziaria e delle risorse        | ≤ Budget At Completion     | ≤ Estimate At Completion     |
| MPCS04  | **Indice Gulpease**        | Indice di leggibilità dei documenti                | Garantire la comprensibilità della documentazione               | ≥ 40                       | ≥ 60                         |

Table: Metriche per i processi di supporto

#### Budget ct completion

**Metrica**: MPCS01

**Formula**: $\text{Budget At Completion} = \overset{\text{n° sprint}}{\underset{i=1}{\sum}} (\text{Planned Cost}_i)$

- Rappresenta il budget totale autorizzato per il progetto
- Serve come baseline per valutare le performance di costo
- Include tutte le riserve di contingenza allocate

---

#### Estimate to complete

**Metrica**: MPCS02

**Formula**: $\text{Estimate To Complete} = \dfrac{\text{Budget At Completion} - \text{Actual Cost}}{\text{Schedule Performance Index}}$

- Stima dei costi necessari per terminare il progetto
- Tiene conto dell'efficienza attuale del progetto attraverso il SPI
- Permette di pianificare le risorse necessarie per il completamento

---

#### Estimate at completion

**Metrica**: MPCS03

**Formula**: $\text{Estimate At Completion} = \text{Actual Cost } + \text{Estimate To Complete}$

- Stima del costo totale del progetto
- Combina i costi già sostenuti (AC) con la stima dei costi rimanenti (ETC)
- Utile per prevedere il budget finale e identificare potenziali sforamenti

---

#### Indice gulpease

**Metrica**: MPCS04

**Formula**: $\text{Indice Gulpease} = 89 + \dfrac{300 \times \text{numero frasi} - 10 \times \text{numero lettere}}{\text{numero parole}}$

- Misura la leggibilità dei documenti in italiano
- Scala da 0 (minima leggibilità) a 100 (massima leggibilità)
- Valori ottimali variano in base al livello di istruzione del target:
  - 40-50 per testi tecnici
  - \>60 per documenti destinati a un pubblico generale

### Processi Organizzativi

| Metrica | Nome                        | Descrizione                                                   | Obiettivo                                                  | Valore Accettabile | Valore Desiderabile |
| ------- | --------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- | ------------------ | ------------------- |
| MPCO01  | **Rischi non preventivati** | Numero di rischi emersi non pianificati inizialmente          | Identificare e gestire tempestivamente nuovi rischi        | ≤ 3                | 0                   |
| MPCO02  | **Errori ortografici**      | Numero di errori ortografici individuati in ciascun documento | Garantire la qualità e l'affidabilità della documentazione | ≤20                | 0                   |

Table: Metriche per i processi organizzativi

#### Rischi non preventivati

**Metrica**: MPCO01

**Formula**: $\text{Rischi non preventivati} = \text{Numero totale rischi emersi} - \text{Numero rischi previsti}$

- Monitora l'efficacia del processo di risk management
- Aiuta a valutare la completezza dell'analisi dei rischi iniziale
- Un numero elevato può indicare la necessità di migliorare il processo di identificazione dei rischi

---

#### Errori ortografici

**Metrica**: MPCO02

**Formula**: $\text{Errori ortografici} =  \sum {\text{Errori individuati in ciascun documento}}$

- Misura la qualità complessiva della documentazione prodotta
- Include errori di forma, contenuto e conformità agli standard
- Importante per garantire la comunicazione efficace e la manutenibilità del progetto
- Gli errori vengono identificati durante le revisioni e le verifiche formali per poi essere corretti

## Qualità di prodotto

Per garantire la qualità del prodotto, il team adotta il modello di riferimento ISO/IEC 9126, che definisce un modello di qualità del software basato su sei caratteristiche fondamentali: funzionalità, affidabilità, usabilità, efficienza, manutenibilità e portabilità.

### Funzionalità

| Metrica | Nome                   | Descrizione                                      | Obiettivo                         | Valore Accettabile | Valore Desiderabile |
| ------- | ---------------------- | ------------------------------------------------ | --------------------------------- | ------------------ | ------------------- |
| MPRF01  | Requisiti Obbligatori  | Percentuale soddisfazione requisiti obbligatori  | Garantire funzionalità essenziali | 100%               | 100%                |
| MPRF02  | Requisiti Desiderabili | Percentuale soddisfazione requisiti desiderabili | Fornire funzionalità aggiuntive   | ≥ 0%               | ≥ 80%               |
| MPRF03  | Requisiti Opzionali    | Percentuale soddisfazione requisiti opzionali    | Implementare funzionalità extra   | ≥ 0%               | ≥ 50%               |

Table: Metriche di funzionalità per la qualità di prodotto

### Affidabilità

| Metrica | Nome               | Descrizione                                 | Obiettivo                   | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------ | ------------------------------------------- | --------------------------- | ------------------ | ------------------- |
| MPRA01  | Statement Coverage | Copertura dei test per gli statement        | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA02  | Branch Coverage    | Copertura dei test per i branch del codice  | Garantire test completi     | ≥ 80%              | ≥ 90%               |
| MPRA03  | Condition Coverage | Copertura dei test le condition             | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA04  | Gestione Errori    | Percentuale di errori gestiti correttamente | Garantire robustezza        | ≥ 80%              | ≥ 90%               |

Table: Metriche di affidabilità per la qualità di prodotto

### Usabilità

| Metrica | Nome               | Descrizione                                   | Obiettivo            | Valore Accettabile | Valore Desiderabile |
| ------- | ------------------ | --------------------------------------------- | -------------------- | ------------------ | ------------------- |
| MPRU01  | Tempo di Risposta  | Tempo medio di risposta del modello           | Garantire reattività | ≤ 10s              | ≤ 5s                |
| MPRU02  | Errori Utente      | Tasso di errori utente per operazione         | Minimizzare errori   | ≤ 10%              | ≤ 5%                |
| MPRU03  | Prevenzione Errori | Percentuale di azioni utente errate prevenute | Proteggere da errori | ≥ 80%              | ≥ 90%               |

Table: Metriche di usabilità per la qualità di prodotto

### Efficienza

| Metrica | Nome                 | Descrizione                           | Obiettivo             | Valore Accettabile | Valore Desiderabile |
| ------- | -------------------- | ------------------------------------- | --------------------- | ------------------ | ------------------- |
| MPRE01  | Profondità Gerarchie | Livelli di profondità delle gerarchie | Ottimizzare struttura | ≤ 7                | ≤ 5                 |
| MPRE02  | Utilizzo Risorse     | Consumo medio CPU/memoria             | Minimizzare risorse   | ≤ 30%              | ≤ 20%               |
| MPRE03  | Capacità             | Numero massimo di requisiti gestibili | Garantire scalabilità | ≥ 50               | ≥ 100               |

Table: Metriche di efficienza per la qualità di prodotto

### Manutenibilità

| Metrica | Nome        | Descrizione                              | Obiettivo            | Valore Accettabile | Valore Desiderabile |
| ------- | ----------- | ---------------------------------------- | -------------------- | ------------------ | ------------------- |
| MPRM01  | Modularità  | Grado di accoppiamento tra moduli        | Ridurre dipendenze   | ≤ 0.5              | ≤ 0.3               |
| MPRM02  | Riusabilità | Percentuale di componenti riutilizzabili | Promuovere riuso     | ≥ 50%              | ≥ 70%               |
| MPRM03  | Complessità | Complessità ciclomatica media per modulo | Mantenere semplicità | ≤ 10               | ≤ 7                 |
| MPRM04  | Testabilità | Percentuale di codice coperto da test    | Facilitare testing   | ≥ 70%              | ≥ 85%               |

Table: Metriche di manutenibilità per la qualità di prodotto

### Portabilità

| Metrica | Nome           | Descrizione                        | Obiettivo              | Valore Accettabile | Valore Desiderabile |
| ------- | -------------- | ---------------------------------- | ---------------------- | ------------------ | ------------------- |
| MPRP01  | Adattabilità   | Effort per cambio ambiente (ore)   | Facilitare portabilità | ≤ 2h               | ≤ 1h                |
| MPRP02  | Installabilità | Tempo medio di installazione       | Semplificare setup     | ≤ 15min            | ≤ 5min              |
| MPRP03  | Sostituibilità | Effort per sostituire impostazioni | Facilitare modifiche   | ≤ 10m              | ≤ 5min              |

Table: Metriche di portabilità per la qualità di prodotto

## Specifica dei test

I test di verifica e validazione vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.

### Test di unità

| ID   | Descrizione                                                                                                                                                        | Stato    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU01 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _resetDatabase_ resetti il database rimuovendo e ricreando la directory                                   | Superato |
| TU02 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _resetDatabase_ gestisca correttamente i casi di errore                                                   | Superato |
| TU03 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni true se il file esiste                                                               | Superato |
| TU04 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni true se il file esiste con una checksum corrispondente                               | Superato |
| TU05 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ ritorni false se il file esiste con una checksum non corrispondente                          | Superato |
| TU06 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _fileExists_ gestisca correttamente errori nel database                                                   | Superato |
| TU07 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ gestisca correttamente il caso in cui viene chiamata senza files                               | Superato |
| TU08 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ aggiunga i files al database                                                                   | Superato |
| TU09 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ non aggiunga il file al database se è già presente                                             | Superato |
| TU10 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ elimini un file già esistente se la checksum non è corrispondente                              | Superato |
| TU11 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addFiles_ gestisca correttamente i casi di errore durante l'aggiunta dei files                           | Superato |
| TU12 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ gestisca correttamente il caso in cui viene chiamata senza requisiti                    | Superato |
| TU13 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ aggiunga i requisiti al database                                                        | Superato |
| TU14 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addRequirements_ gestisca correttamente i casi di errore durante l'aggiunta dei requisiti                | Superato |
| TU15 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ gestisca correttamente il caso in cui viene chiamata senza chunks                             | Superato |
| TU16 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ aggiunga i chunk al database                                                                  | Superato |
| TU17 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _addChunks_ gestisca correttamente i casi di errore durante l'aggiunta dei chunk                          | Superato |
| TU18 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForFiles_ interroghi i files in base a un termine di ricerca                                        | Superato |
| TU19 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForFiles_ gestisca correttamente i casi di errore durante l'interrogazione dei files                | Superato |
| TU20 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForRequirements_ interroghi i requisiti in base a un termine di ricerca                             | Superato |
| TU21 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForRequirements_ gestisca correttamente i casi di errore durante l'interrogazione dei requisiti     | Superato |
| TU22 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForChunks_ interroghi i chunks in base a un termine di ricerca                                      | Superato |
| TU23 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _queryForChunks_ gestisca correttamente i casi di errore durante l'interrogazione dei chunks              | Superato |
| TU24 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _getEmbeddings_ ritorni gli embeddings correttamente                                                      | Superato |
| TU25 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ gestisca correttamente il caso in cui viene chiamata senza files da rimuovere               | Superato |
| TU26 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ rimuova i files al database                                                                 | Superato |
| TU27 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _deleteFiles_ gestisca correttamente i casi di errore durante la rimozione dei files                      | Superato |
| TU28 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ inizializzi la connessione al database e la tabella                                        | Superato |
| TU29 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ gestisca il caso in cui il bearer token sia indefinito                                     | Superato |
| TU30 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_initialize_ gestisca i casi di errore durante l'inizializzazione                                       | Superato |
| TU31 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_determineEmbeddingDimension_ determini la dimensione degli embeddings correttamente                    | Superato |
| TU32 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_determineEmbeddingDimension_ ritorni il valore di default se non riesce a incorporare la query         | Superato |
| TU33 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getDB_ ritorni la connessione al database                                                              | Superato |
| TU34 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getDB_ crei la connessione al database se questa non esiste                                            | Superato |
| TU35 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ ritorni true se la tabella esiste                                                         | Superato |
| TU36 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ ritorni false se la tabella non esiste                                                    | Superato |
| TU37 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_tableExists_ gestisca correttamente i casi di errore durante il controllo dell'esistenza della tabella | Superato |
| TU38 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ ritorni la tabella se esiste                                                                 | Superato |
| TU39 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ ritorni un errore se viene fornito un tipo sconnosciuto                                      | Superato |
| TU40 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ crei una tabella se non esiste                                                               | Superato |
| TU41 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _\_getTable_ gestisca correttamente i casi di errore durante il recupero della tabella                    | Superato |
| TU42 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _GetInstance_ lanci un errore se l'istanza non è stata inizializzata                                      | Superato |
| TU43 | Verifica, sulla classe _LanceDBAdapter_, che la funzione _GetInstance_ ritorni l'istanza singleton quando inizializzata                                            | Superato |

Table: Test di unità sulla classe _LanceDBAdapter_

| ID   | Descrizione                                                                                                                                  | Stato    |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU44 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _GetInstance_ ritorni l'istanza inizializzata                               | Superato |
| TU45 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _\_initialize_ inizializzi Ollama ed Embeddings con i parametri corretti    | Superato |
| TU46 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _\_initialize_ inizializzi senza headers quando il bearer token è undefined | Superato |
| TU47 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _checkModelAvailability_ ritorni true quando il modello è disponibile       | Superato |
| TU48 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _checkModelAvailability_ ritorni false quando il modello non è disponibile  | Superato |
| TU49 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _checkModelAvailability_ gestisca correttamente gli errori                  | Superato |
| TU50 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _pullModel_ completi il pull del modello con successo                       | Superato |
| TU51 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _pullModel_ ritorni false quando lo stato del pull non è "success"          | Superato |
| TU52 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _pullModel_ gestisca correttamente gli errori                               | Superato |
| TU53 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generate_ generi la risposta correttamente                                 | Superato |
| TU54 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generate_ gestisca correttamente i casi di errore                          | Superato |
| TU55 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateStream_ esegua lo streaming dei token correttamente                | Superato |
| TU56 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateStream_ gestisca correttamente gli errori                          | Superato |
| TU57 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateEmbeddings_ generi l'array di embeddings correttamente             | Superato |
| TU58 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _generateEmbeddings_ gestisca correttamente i casi di errore                | Superato |
| TU59 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _getEmbeddings_ inizializzi correttamente gli embeddings e Ollama           | Superato |
| TU60 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _refreshModels_ re-inizializzi Ollama e gli embedding correttamente         | Superato |
| TU61 | Verifica, sulla classe _LangChainOllamaAdapter_, che la funzione _GetInstance_ lanci un errore quando l'istanza non è inizializzata          | Superato |

Table: Test di unità sulla classe _LangChainOllamaAdapter_

| ID   | Descrizione                                                                                                                                                           | Stato    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU62 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                                      | Superato |
| TU63 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ chiami la funzione _clearMessages_ della classe _ChatService_                             | Superato |
| TU64 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ mostri all'utente un messaggio di conferma per la cancellazione la cronologia della chat  | Superato |
| TU65 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ mostri il messeggio di conferma solo dopo che è stata cancellata la cronologia della chat | Superato |
| TU66 | Verifica, sulla classe _ClearChatHistoryCommand_, che la funzione _execute_ gestisca correttamente i casi di errore provenienti dalla classe _ChatService_            | Superato |

Table: Test di unità sulla classe _ClearChatHistoryCommand_

| ID   | Descrizione                                                                                                              | Stato    |
| ---- | ------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU67 | Verifica, sulla classe _ClearRequirementsHistoryCommand_, che la funzione _getName_ ritorni il nome corretto del comando | Superato |
| TU68 | Verifica, sulla classe _ClearRequirementsHistoryCommand_, che la funzione _execute_ esegua il comando e apra la sidebar  | Superato |

Table: Test di unità sulla classe _ClearRequirementsHistoryCommand_

| ID   | Descrizione                                                                                                                                                    | Stato    |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU69 | Verifica, sulla classe _CommandRegistry_, che la funzione _registerCommand_ registri un comando e lo aggiunga all'array _subscriptions_                        | Superato |
| TU70 | Verifica, sulla classe _CommandRegistry_, che la funzione _registerCommands_ registri più comandi e gli aggiunga all'array \_subscriptions\_\_                 | Superato |
| TU71 | Verifica, sulla classe _CommandRegistry_, che la funzione _getCommand_ ritorni il comando se esiste                                                            | Superato |
| TU72 | Verifica, sulla classe _CommandRegistry_, che la funzione _getCommand_ ritorni errore se il comando non esiste                                                 | Superato |
| TU73 | Verifica, sulla classe _CommandRegistry_, che, dopo che un comando è stato registrato, venga chiamata la funzione _execute_ quando quel comando viene attivato | Superato |

Table: Test di unità sulla classe _CommandRegistry_

| ID   | Descrizione                                                                                                                                                    | Stato    |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU74 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                            | Superato |
| TU75 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato | Superato |
| TU76 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo     | Superato |
| TU77 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo  | Superato |
| TU78 | Verifica, sulla classe _InterrogateDocumentCommand_, che la funzione _execute_ esegua il comando e invii un messaggio alla chat view                           | Superato |

Table: Test di unità sulla classe _InterrogateDocumentCommand_

| ID   | Descrizione                                                                                                                                                     | Stato    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU79 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _getName_ ritorni il nome corretto del comando                                            | Superato |
| TU80 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui nessun requisito sia stato caricato | Superato |
| TU81 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non ci sia nessun editor attivo     | Superato |
| TU82 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e gestisca il caso in cui non sia stato trovato nessun testo  | Superato |
| TU83 | Verifica, sulla classe _InterrogateSelectionCommand_, che la funzione _execute_ esegua il comando e invii un messaggio alla chat view                           | Superato |

Table: Test di unità sulla classe _InterrogateSelectionCommand_

| ID   | Descrizione                                                                                                  | Stato    |
| ---- | ------------------------------------------------------------------------------------------------------------ | -------- |
| TU84 | Verifica, sulla classe _OpenSettingsCommand_, che la funzione _getName_ ritorni il nome corretto del comando | Superato |
| TU85 | Verifica, sulla classe _OpenSettingsCommand_, che la funzione _execute_ esegua il comando e apra la sidebar  | Superato |

Table: Test di unità sulla classe _OpenSettingsCommand_

| ID   | Descrizione                                                                                                 | Stato    |
| ---- | ----------------------------------------------------------------------------------------------------------- | -------- |
| TU86 | Verifica, sulla classe _OpenSidebarCommand_, che la funzione _getName_ ritorni il nome corretto del comando | Superato |
| TU87 | Verifica, sulla classe _OpenSidebarCommand_, che la funzione _execute_ esegua il comando e apra la sidebar  | Superato |

Table: Test di unità sulla classe _OpenSidebarCommand_

| ID   | Descrizione                                                                                                                                 | Stato    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU88 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _getName_ ritorni il nome corretto del comando                               | Superato |
| TU89 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ esegua il comando e resetti il database                            | Superato |
| TU90 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ non resetti il database se l'utente sceglie l'opzione "No"         | Superato |
| TU91 | Verifica, sulla classe _ResetDatabaseCommand_, che la funzione _execute_ gestisca correttamente i casi di errore mentre resetta il database | Superato |

Table: Test di unità sulla classe _ResetDatabaseCommand_

| ID    | Descrizione                                                                                                                                                        | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU92  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _GetInstance_ ritorni un errore se l'istanza non è inizializzata                                     | Superato |
| TU93  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _Init_ ritorni un errore per ogni chiave quando il valore di configurazione è indefinito             | Superato |
| TU94  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _Init_ abbia inizializzato una configServiceFacade                                                   | Superato |
| TU95  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _GetInstance_ ritorni un'istanza di configServiceFacade                                              | Superato |
| TU96  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _sync_ sincronizzi la configurazione del ConfigService con la configurazione del ConfigServiceFacade | Superato |
| TU97  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getOllamaModel_ ritorni il nome corretto del modello di Ollama                                      | Superato |
| TU98  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getEmbeddingModel_ ritorni il nome corretto del modello di embedding                                | Superato |
| TU99  | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getMaxResults_ ritorni il valore del risultato massimo                                              | Superato |
| TU100 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getTemperature_ ritorni il valore della temperatura                                                 | Superato |
| TU101 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getEndpoint_ ritorni il valore di endpoint                                                          | Superato |
| TU102 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getBearerToken_ ritorni il valore del bearer token                                                  | Superato |
| TU103 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getFilters_ ritorni la configurazione dei filtri                                                    | Superato |
| TU104 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _getPrompt_ ritorni il valore del prompt                                                             | Superato |
| TU105 | Verifica, sulla classe _ConfigServiceFacade_, che la funzione _setWorkspaceFolder_ imposti la cartella di lavoro e sincronizzi la config                           | Superato |

Table: Test di unità sulla classe _ConfigServiceFacade_

| ID    | Descrizione                                                                                                                                             | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU106 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ salti files già indicizzati                                              | Superato |
| TU107 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ elabori un file valido                                                   | Superato |
| TU108 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ salti files più grandi di 20MB                                           | Superato |
| TU109 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processFiles_ gestisca correttamente i casi di errore durante l'elaborazione dei files | Superato |
| TU110 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ ritorni un errore se nessuna cartella di workspace è aperta     | Superato |
| TU111 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ ritorni un warning se non vengono trovati files corrispondenti  | Superato |
| TU112 | Verifica, sulla classe _DocumentServiceFacade_, che la funzione _processWorkspaceFiles_ elabori i files del workspace correttamente                     | Superato |

Table: Test di unità sulla classe _DocumentServiceFacade_

| ID    | Descrizione                                                                                                                                                                 | Stato    |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU113 | Verifica, sulla classe _RequirementsServiceFacade_, che il costruttore inizializzi l'oggetto con i servizi forniti                                                          | Superato |
| TU114 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ ritorni un errore se il file dei requisiti non è supportato                        | Superato |
| TU115 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti csv con un delimitatore indefinito     | Superato |
| TU116 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti csv con un delimitatore personalizzato | Superato |
| TU117 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ importi i requisiti da un file di requisiti requif                                 | Superato |
| TU118 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ ritorni un messaggio di warning se non sono presenti requisiti nel file            | Superato |
| TU119 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ incorpori i requisiti nel database vettoriale durante l'importazione               | Superato |
| TU120 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _importRequirements_ gestisca gli errori di embedding del database vettoriale                           | Superato |
| TU121 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni il risultato del tracciamento dei requisiti selezionati                     | Superato |
| TU122 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni il risultato del tracciamento di tutti i requisiti                          | Superato |
| TU123 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _trackRequirements_ ritorni un errore se è stato trovato nessun requisito da tracciare                  | Superato |
| TU124 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getRequirement_ ritorni il requisito cercato tramite id                                                | Superato |
| TU125 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getRequirement_ ritorni undefined se un requisito non è stato caricato                                 | Superato |
| TU126 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _getAllRequirements_ ritorni tutti i requisiti caricati                                                 | Superato |
| TU127 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _deleteRequirement_ rimuova il requisito specificato                                                    | Superato |
| TU128 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _clearRequirements_ rimuova tutti i requisiti                                                           | Superato |
| TU129 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _updateRequirementCodeReference_ aggiorni il riferimento al codice per un requisito                     | Superato |
| TU130 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _analyzeImplementation_ analizzi l'implementazione per un requisito                                     | Superato |
| TU131 | Verifica, sulla classe _RequirementsServiceFacade_, che la funzione _analyzeImplementation_ gestisca gli errori durante l'analisi dell'implementazione                      | Superato |

Table: Test di unità sulla classe _RequirementsServiceFacade_

| ID    | Descrizione                                                                                                                       | Stato    |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU132 | Verifica che nel file _chat.js_, l'inizializzazione della chat aggiunga correttamente i listener di eventi al caricamento del DOM | Superato |
| TU133 | Verifica che nel file _chat.js_, la chat gestisca correttamente il caso di elementi DOM mancanti nella funzione handleEvents      | Superato |
| TU134 | Verifica che nel file _chat.js_, l'invio del messaggio tramite pulsante funzioni correttamente                                    | Superato |
| TU135 | Verifica che nel file _chat.js_, non venga inviato alcun messaggio quando l'input è vuoto                                         | Superato |
| TU136 | Verifica che nel file _chat.js_, non venga inviato alcun messaggio se l'elemento userInput è null                                 | Superato |
| TU137 | Verifica che nel file _chat.js_, l'invio del messaggio tramite tasto Enter (senza Shift) funzioni correttamente                   | Superato |
| TU138 | Verifica che nel file _chat.js_, non venga inviato il messaggio quando si preme Enter con Shift                                   | Superato |
| TU139 | Verifica che nel file _chat.js_, il pulsante di pulizia della cronologia funzioni correttamente                                   | Superato |
| TU140 | Verifica che nel file _chat.js_, il click sulle domande di esempio aggiunga il testo corretto nell'input                          | Superato |
| TU141 | Verifica che nel file _chat.js_, il click sulle domande di esempio con testo vuoto non modifichi l'input                          | Superato |
| TU142 | Verifica che nel file _chat.js_, addMessage gestisca correttamente i messaggi null                                                | Superato |
| TU143 | Verifica che nel file _chat.js_, handleError gestisca correttamente i messaggi null                                               | Superato |
| TU144 | Verifica che nel file _chat.js_, setLoading gestisca correttamente i messaggi null                                                | Superato |
| TU145 | Verifica che nel file _chat.js_, updateMessage gestisca correttamente il caso di container dei messaggi null                      | Superato |
| TU146 | Verifica che nel file _chat.js_, setHistory gestisca correttamente il caso di container dei messaggi null                         | Superato |
| TU147 | Verifica che nel file _chat.js_, clearHistory pulisca correttamente la cronologia e mostri il messaggio di benvenuto              | Superato |
| TU148 | Verifica che nel file _chat.js_, setLoading mostri e nasconda correttamente l'indicatore di caricamento                           | Superato |
| TU149 | Verifica che nel file _chat.js_, i messaggi di errore vengano visualizzati correttamente con il colore appropriato                | Superato |
| TU150 | Verifica che nel file _chat.js_, updateMessage aggiorni correttamente il testo dei messaggi del modello                           | Superato |
| TU151 | Verifica che nel file _chat.js_, updateMessage gestisca correttamente i messaggi undefined                                        | Superato |
| TU152 | Verifica che nel file _chat.js_, formatMessageText formatti correttamente il testo del messaggio                                  | Superato |
| TU153 | Verifica che nel file _chat.js_, updateMessage gestisca correttamente il caso in cui non esistono messaggi del modello            | Superato |
| TU154 | Verifica che nel file _chat.js_, updateMessage gestisca correttamente l'elemento di testo mancante                                | Superato |
| TU155 | Verifica che nel file _chat.js_, handleError gestisca correttamente il container dei messaggi mancante                            | Superato |
| TU156 | Verifica che nel file _chat.js_, handleEQEvents gestisca correttamente l'input della chat mancante                                | Superato |
| TU157 | Verifica che nel file _chat.js_, addMessage gestisca correttamente il container dei messaggi mancante                             | Superato |
| TU158 | Verifica che nel file _chat.js_, setLoading gestisca correttamente l'indicatore di caricamento mancante                           | Superato |
| TU159 | Verifica che nel file _chat.js_, onUpdateMessage gestisca correttamente il parametro del messaggio mancante                       | Superato |
| TU160 | Verifica che nel file _chat.js_, clearHistory gestisca correttamente il container dei messaggi null                               | Superato |
| TU161 | Verifica che nel file _chat.js_, setHistory gestisca correttamente il caso di return anticipato con container dei messaggi null   | Superato |

Table: Test di unità sul file _chat.js_

| ID    | Descrizione                                                                                                                                     | Stato    |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU162 | Verifica che nel file _track.js_, l'interfaccia utente di track venga inizializzata correttamente al caricamento del DOM                        | Superato |
| TU163 | Verifica che nel file _track.js_, gestisca correttamente il caso di elementi DOM mancanti durante l'inizializzazione                            | Superato |
| TU164 | Verifica che nel file _track.js_, l'interfaccia utente venga inizializzata correttamente con le opzioni di importazione                         | Superato |
| TU165 | Verifica che nel file _track.js_, gestisca correttamente elementi non-select per l'importazione del formato                                     | Superato |
| TU166 | Verifica che nel file _track.js_, gestisca correttamente elementi non-checkbox per il tracciamento completo                                     | Superato |
| TU167 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nei listener delle schede                                            | Superato |
| TU168 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nei listener di importazione                                         | Superato |
| TU169 | Verifica che nel file _track.js_, gestisca correttamente elementi formato di altro tipo nei listener di importazione                            | Superato |
| TU170 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nei listener di tracciamento                                         | Superato |
| TU171 | Verifica che nel file _track.js_, gestisca correttamente elementi di tracciamento completo di altro tipo                                        | Superato |
| TU172 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nei listener della modalità di modifica                              | Superato |
| TU173 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti durante l'interruzione della modalità di modifica                    | Superato |
| TU174 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti durante l'aggiornamento del riferimento selezionato                  | Superato |
| TU175 | Verifica che nel file _track.js_, gestisca correttamente div di analisi mancante nel risultato dell'analisi                                     | Superato |
| TU176 | Verifica che nel file _track.js_, gestisca correttamente spinner mancante nel risultato dell'analisi                                            | Superato |
| TU177 | Verifica che nel file _track.js_, gestisca correttamente div del contenuto mancante nel risultato dell'analisi                                  | Superato |
| TU178 | Verifica che nel file _track.js_, gestisca correttamente risultati di tracciamento o dettagli dei requisiti mancanti nel risultato dell'analisi | Superato |
| TU179 | Verifica che nel file _track.js_, gestisca correttamente riferimenti al codice mancanti nel risultato dell'analisi                              | Superato |
| TU180 | Verifica che nel file _track.js_, gestisca correttamente riferimento selezionato mancante nel risultato dell'analisi                            | Superato |
| TU181 | Verifica che nel file _track.js_, gestisca correttamente gestore di eventi nel risultato dell'analisi                                           | Superato |
| TU182 | Verifica che nel file _track.js_, gestisca correttamente div del codice dell'analisi mancante nel risultato dell'analisi                        | Superato |
| TU183 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nella visualizzazione dei risultati                                  | Superato |
| TU184 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nella visualizzazione del grafico                                    | Superato |
| TU185 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nella visualizzazione della legenda                                  | Superato |
| TU186 | Verifica che nel file _track.js_, gestisca correttamente checkbox quando non sono elementi HTML input                                           | Superato |
| TU187 | Verifica che nel file _track.js_, gestisca correttamente il caso in cui trackAllCheckbox non sia un elemento HTML input                         | Superato |
| TU188 | Verifica che nel file _track.js_, gestisca correttamente trackAllCheckbox quando non è selezionato                                              | Superato |
| TU189 | Verifica che nel file _track.js_, gestisca correttamente azioni di eliminazione quando non sono elementi HTML                                   | Superato |
| TU190 | Verifica che nel file _track.js_, gestisca correttamente azioni di modifica quando non sono elementi HTML                                       | Superato |
| TU191 | Verifica che nel file _track.js_, gestisca correttamente azioni di visualizzazione quando non sono elementi HTML                                | Superato |
| TU192 | Verifica che nel file _track.js_, gestisca correttamente il caso di assenza di schede                                                           | Superato |
| TU193 | Verifica che nel file _track.js_, gestisca correttamente il caso di assenza di contenuti delle schede                                           | Superato |
| TU194 | Verifica che nel file _track.js_, gestisca correttamente l'indice negativo delle schede                                                         | Superato |
| TU195 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di tab-import come elemento HTML                                             | Superato |
| TU196 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di tab-track come elemento HTML                                              | Superato |
| TU197 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di tab-results come elemento HTML                                            | Superato |
| TU198 | Verifica che nel file _track.js_, gestisca correttamente riferimenti al codice vuoti o nulli                                                    | Superato |
| TU199 | Verifica che nel file _track.js_, gestisca correttamente il container dei riferimenti mancante                                                  | Superato |
| TU200 | Verifica che nel file _track.js_, aggiunga correttamente i gestori di eventi per la conferma dell'implementazione dei requisiti                 | Superato |
| TU201 | Verifica che nel file _track.js_, gestisca correttamente l'elemento padre del requisito mancante                                                | Superato |
| TU202 | Verifica che nel file _track.js_, gestisca correttamente il div di analisi mancante                                                             | Superato |
| TU203 | Verifica che nel file _track.js_, gestisca correttamente spinner o div del contenuto mancante                                                   | Superato |
| TU204 | Verifica che nel file _track.js_, gestisca correttamente ID del requisito o risultati di tracciamento mancanti                                  | Superato |
| TU205 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di risultati di tracciamento per il requisito                                | Superato |
| TU206 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di requisito per l'ID                                                        | Superato |
| TU207 | Verifica che nel file _track.js_, crei correttamente il container dei riferimenti al codice se non esiste                                       | Superato |
| TU208 | Verifica che nel file _track.js_, riutilizzi il container dei riferimenti al codice esistente                                                   | Superato |
| TU209 | Verifica che nel file _track.js_, gestisca correttamente gli ID dei requisiti con caratteri speciali                                            | Superato |
| TU210 | Verifica che nel file _track.js_, la tabella dei requisiti gestisca correttamente elementi mancanti                                             | Superato |
| TU211 | Verifica che nel file _track.js_, la tabella dei requisiti mostri un messaggio appropriato quando l'array è vuoto                               | Superato |
| TU212 | Verifica che nel file _track.js_, la tabella dei requisiti salti oggetti null o undefined                                                       | Superato |
| TU213 | Verifica che nel file _track.js_, la tabella dei requisiti gestisca correttamente riferimenti al codice undefined                               | Superato |
| TU214 | Verifica che nel file _track.js_, la tabella dei requisiti gestisca correttamente nome e descrizione undefined                                  | Superato |
| TU215 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nella barra laterale durante l'inizializzazione                      | Superato |
| TU216 | Verifica che nel file _track.js_, gestisca correttamente l'inserimento del testo delle domande di esempio nel campo di input                    | Superato |
| TU217 | Verifica che nel file _track.js_, gestisca correttamente il click sui pulsanti nel pannello dei controlli                                       | Superato |
| TU218 | Verifica che nel file _track.js_, la funzione _handleTabImportClick_ invii il messaggio corretto                                                | Superato |
| TU219 | Verifica che nel file _track.js_, la funzione _handleTabTrackClick_ invii il messaggio corretto                                                 | Superato |
| TU220 | Verifica che nel file _track.js_, la funzione _handleTabResultsClick_ invii il messaggio corretto                                               | Superato |
| TU221 | Verifica che nel file _track.js_, gestisca correttamente il cambio del formato di importazione                                                  | Superato |
| TU222 | Verifica che nel file _track.js_, gestisca correttamente la selezione/deselezione globale dei requisiti                                         | Superato |
| TU223 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di importazione                                                  | Superato |
| TU224 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di tracciamento                                                  | Superato |
| TU225 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di pulizia dei requisiti                                         | Superato |
| TU226 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di conferma modifica                                             | Superato |
| TU227 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di annullamento modifica                                         | Superato |
| TU228 | Verifica che nel file _track.js_, la funzione _onUpdateSelectedReference_ aggiorni correttamente il riferimento selezionato                     | Superato |
| TU229 | Verifica che nel file _track.js_, la funzione _onAnalysisResult_ gestisca correttamente il risultato dell'analisi                               | Superato |
| TU230 | Verifica che nel file _track.js_, la funzione _setReqActions_ imposti correttamente i gestori degli eventi per le azioni sui requisiti          | Superato |
| TU231 | Verifica che nel file _track.js_, la funzione _updateRequirementsDisplay_ aggiorni correttamente la visualizzazione dei requisiti               | Superato |
| TU232 | Verifica che nel file _track.js_, la funzione _handleTrackingResultsEvent_ gestisca correttamente l'evento dei risultati di tracciamento        | Superato |
| TU233 | Verifica che nel file _track.js_, la funzione _updateResultsDisplay_ aggiorni correttamente la visualizzazione dei risultati                    | Superato |
| TU234 | Verifica che nel file _track.js_, la funzione _updateChartDisplay_ aggiorni correttamente la visualizzazione del grafico                        | Superato |
| TU235 | Verifica che nel file _track.js_, la funzione _updateLegendDisplay_ aggiorni correttamente la visualizzazione della legenda                     | Superato |
| TU236 | Verifica che nel file _track.js_, la funzione _updateRequirementsTable_ aggiorni correttamente la tabella dei requisiti                         | Superato |
| TU237 | Verifica che nel file _track.js_, la funzione _handleRequirementsEvents_ gestisca correttamente gli eventi dei requisiti                        | Superato |
| TU238 | Verifica che nel file _track.js_, la funzione _assertNonNull_ gestisca correttamente i valori null e undefined                                  | Superato |
| TU239 | Verifica che nel file _track.js_, la funzione _handleError_ gestisca correttamente gli errori                                                   | Superato |
| TU240 | Verifica che nel file _track.js_, la funzione _escapeHtml_ sanitizzi correttamente l'input HTML                                                 | Superato |
| TU241 | Verifica che nel file _track.js_, la funzione _formatSnippet_ formatti correttamente gli snippet di codice                                      | Superato |
| TU242 | Verifica che nel file _track.js_, la funzione _switchToTab_ cambi correttamente la scheda attiva                                                | Superato |
| TU243 | Verifica che nel file _track.js_, la funzione _changeActiveTab_ gestisca correttamente il cambio di scheda attiva                               | Superato |
| TU244 | Verifica che nel file _track.js_, la funzione _addDropdownToggleEventHandler_ gestisca correttamente l'espansione/contrazione dei dropdown      | Superato |
| TU245 | Verifica che nel file _track.js_, la funzione _populateCodeReferences_ popoli correttamente i riferimenti al codice                             | Superato |
| TU246 | Verifica che nel file _track.js_, la funzione _setupAnalysisEventHandlers_ configuri correttamente i gestori degli eventi di analisi            | Superato |
| TU247 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di elementi DOM durante l'inizializzazione                                   | Superato |
| TU248 | Verifica che nel file _track.js_, gestisca correttamente il contenuto esistente nella tabella dei requisiti                                     | Superato |
| TU249 | Verifica che nel file _track.js_, gestisca correttamente la creazione dell'item dei requisiti con stato confirmed-match                         | Superato |
| TU250 | Verifica che nel file _track.js_, gestisca correttamente la creazione dell'item dei requisiti con stato possible-match                          | Superato |
| TU251 | Verifica che nel file _track.js_, gestisca correttamente elementi non-HTMLInputElement nella selezione dei requisiti                            | Superato |
| TU252 | Verifica che nel file _track.js_, gestisca correttamente trackAllCheckbox quando non è un elemento HTML input                                   | Superato |
| TU253 | Verifica che nel file _track.js_, gestisca correttamente trackAllCheckbox quando non è selezionato                                              | Superato |
| TU254 | Verifica che nel file _track.js_, gestisca correttamente deleteReqAction quando non è un elemento HTML                                          | Superato |
| TU255 | Verifica che nel file _track.js_, gestisca correttamente editReqAction quando non è un elemento HTML                                            | Superato |
| TU256 | Verifica che nel file _track.js_, gestisca correttamente viewReqAction quando non è un elemento HTML                                            | Superato |
| TU257 | Verifica che nel file _track.js_, gestisca correttamente il caso di nessuna scheda presente                                                     | Superato |
| TU258 | Verifica che nel file _track.js_, gestisca correttamente il caso di nessun contenuto delle schede                                               | Superato |
| TU259 | Verifica che nel file _track.js_, gestisca correttamente indici di scheda negativi                                                              | Superato |
| TU260 | Verifica che nel file _track.js_, la funzione setFilePath imposti correttamente i gestori di eventi per il percorso del file                    | Superato |
| TU261 | Verifica che nel file _track.js_, gestisca correttamente l'elemento filePath mancante                                                           | Superato |
| TU262 | Verifica che nel file _track.js_, imposti correttamente i gestori di eventi per l'azione di conferma                                            | Superato |
| TU263 | Verifica che nel file _track.js_, imposti correttamente i gestori di eventi per l'azione di eliminazione                                        | Superato |
| TU264 | Verifica che nel file _track.js_, imposti correttamente i gestori di eventi per l'azione di modifica                                            | Superato |
| TU265 | Verifica che nel file _track.js_, gestisca correttamente elementi di azione mancanti                                                            | Superato |
| TU266 | Verifica che nel file _track.js_, crei correttamente l'elemento dei requisiti con stati di implementazione diversi                              | Superato |
| TU267 | Verifica che nel file _track.js_, gestisca correttamente i riferimenti al codice nella creazione dell'elemento dei requisiti                    | Superato |
| TU268 | Verifica che nel file _track.js_, gestisca correttamente i codeReference vuoti o nulli nella populateCodeReferences                             | Superato |
| TU269 | Verifica che nel file _track.js_, gestisca correttamente il container dei riferimenti mancante nella populateCodeReferences                     | Superato |
| TU270 | Verifica che nel file _track.js_, gestisca correttamente elementi mancanti nei gestori degli eventi di analisi                                  | Superato |
| TU271 | Verifica che nel file _track.js_, gestisca correttamente il caso di assenza di risultati di tracciamento per un requisito                       | Superato |
| TU272 | Verifica che nel file _track.js_, gestisca correttamente l'assenza di requisito per un determinato ID                                           | Superato |
| TU273 | Verifica che nel file _track.js_, crei correttamente il container dei riferimenti al codice se non esiste                                       | Superato |
| TU274 | Verifica che nel file _track.js_, riutilizzi il container dei riferimenti al codice esistente                                                   | Superato |
| TU275 | Verifica che nel file _track.js_, gestisca correttamente gli ID dei requisiti con caratteri speciali                                            | Superato |
| TU276 | Verifica che nel file _track.js_, gestisca correttamente il caricamento di file attraverso il FileReader                                        | Superato |
| TU277 | Verifica che nel file _track.js_, gestisca correttamente il cambiamento dell'input file con target non-HTMLInputElement                         | Superato |
| TU278 | Verifica che nel file _track.js_, gestisca correttamente il cambiamento dell'input file senza file selezionati                                  | Superato |
| TU279 | Verifica che nel file _track.js_, gestisca correttamente il cambiamento dell'input file con textContent non-HTMLTextAreaElement                 | Superato |
| TU280 | Verifica che nel file _track.js_, gestisca correttamente il target undefined nell'evento di cambiamento del file                                | Superato |
| TU281 | Verifica che nel file _track.js_, gestisca correttamente il click sul pulsante di importazione con contenuto vuoto                              | Superato |
| TU282 | Verifica che nel file _track.js_, gestisca correttamente il formato CSV con delimitatore personalizzato                                         | Superato |
| TU283 | Verifica che nel file _track.js_, gestisca correttamente il delimitatore non-HTMLInputElement nel click sul pulsante di importazione            | Superato |
| TU284 | Verifica che nel file _track.js_, gestisca correttamente la visualizzazione e nascondimento dell'indicatore di caricamento                      | Superato |
| TU285 | Verifica che nel file _track.js_, gestisca correttamente l'elemento di caricamento mancante                                                     | Superato |
| TU286 | Verifica che nel file _track.js_, gestisca correttamente il toggle del dropdown e il cambio dell'icona                                          | Superato |
| TU287 | Verifica che nel file _track.js_, gestisca correttamente il caso di mancanza dell'elemento toggle                                               | Superato |
| TU288 | Verifica che nel file _track.js_, gestisca correttamente il caso di mancanza dell'icona nel toggle                                              | Superato |
| TU289 | Verifica che nel file _track.js_, gestisca correttamente il toggle senza propagazione degli eventi                                              | Superato |
| TU290 | Verifica che nel file _track.js_, il risultato dell'analisi sia visualizzato correttamente nel contenuto del div                                | Superato |
| TU291 | Verifica che nel file _track.js_, gli eventi di analisi siano gestiti correttamente quando mancano elementi UI                                  | Superato |
| TU292 | Verifica che nel file _track.js_, l'interfaccia gestisca correttamente requisiti con ID contenenti caratteri speciali                           | Superato |
| TU293 | Verifica che nel file _track.js_, gli eventi di click sui pulsanti siano gestiti correttamente anche in caso di errori                          | Superato |
| TU294 | Verifica che nel file _track.js_, la visualizzazione dei risultati dell'analisi sia correttamente aggiornata in tempo reale                     | Superato |

Table: Test di unità sul file _track.js_

| ID    | Descrizione                                                                                                                                                       | Stato    |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU295 | Verifica che l'enumerazione _COLLECTION_TYPE_ abbia i valori corretti                                                                                             | Superato |
| TU296 | Verifica, sulla classe _ChatWebviewProvider_, che il costruttore inizializzi l'oggetto con il servizio e il URI forniti                                           | Superato |
| TU297 | Verifica, sulla classe _ChatWebViewProvider_, che la funzione _resolveWebviewView_ configuri la webview senza caricare la cronologia della chat                   | Superato |
| TU298 | Verifica, sulla classe _ChatWebViewProvider_, che la funzione _resolveWebviewView_ carichi la cronologia della chat quando richiesto                              | Superato |
| TU299 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _resolveWebviewView_ gestisca correttamente il caso in cui la cronologia della chat sia vuota       | Superato |
| TU300 | Verifica, sulla classe _ChatWebViewProvider_, che la funzione _resolveWebviewView_ gestisca correttamente gli errori durante il caricamento della cronologia chat | Superato |
| TU301 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ invii il messaggio dell'utente e riceva la risposta del modello                   | Superato |
| TU302 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ gestisca gli errori del servizio di inferenza                                     | Superato |
| TU303 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onSendMessage_ gestisca gli errori sconosciuti                                                   | Superato |
| TU304 | Verifica, sulla classe _ChatWebviewProvider_, che la funzione _\_onClearHistory_ cancelli la cronologia della chat                                                | Superato |
| TU305 | Verifica, sulla classe _ChatWebviewProvider_, che, quando viene chiamata la funzione _\_onDidReceiveMessage_ gestisca correttamente il messagio ricevuto          | Superato |

Table: Test di unità sulla classe _ChatWebviewProvider_

| ID    | Descrizione                                                                                                                                                                        | Stato    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU306 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _resolveWebviewView_ configuri correttamente la webview                                                           | Superato |
| TU307 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _resolveWebviewView_ non invii messaggi di aggiornamento quando non ci sono requisiti                             | Superato |
| TU308 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _resolveWebviewView_ invii il messaggio startEditMode quando è in modalità di modifica                            | Superato |
| TU309 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onImportRequirements_ gestisca correttamente l'importazione dei requisiti                                      | Superato |
| TU310 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onImportRequirements_ gestisca correttamente l'importazione dei requisiti con opzioni predefinite              | Superato |
| TU311 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onImportRequirements_ gestisca correttamente gli errori durante l'importazione dei requisiti                   | Superato |
| TU312 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTrackRequirements_ gestisca correttamente il tracciamento dei requisiti                                      | Superato |
| TU313 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i tipi di messaggi sconosciuti                                | Superato |
| TU314 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente i messaggi di errore                                          | Superato |
| TU315 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onOpenFile_ gestisca correttamente l'apertura dei file                                                         | Superato |
| TU316 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onOpenFile_ gestisca correttamente gli errori durante l'apertura dei file                                      | Superato |
| TU317 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onClearRequirements_ gestisca correttamente la pulizia dei requisiti                                           | Superato |
| TU318 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onClearRequirements_ gestisca correttamente gli errori durante la pulizia dei requisiti                        | Superato |
| TU319 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onEditRequirement_ gestisca correttamente la modifica dei requisiti                                            | Superato |
| TU320 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onDeleteRequirement_ gestisca correttamente l'eliminazione dei requisiti                                       | Superato |
| TU321 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onDeleteRequirement_ gestisca correttamente gli errori durante l'eliminazione dei requisiti                    | Superato |
| TU322 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente gli errori di tipo Error                                      | Superato |
| TU323 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente gli errori non di tipo Error                                  | Superato |
| TU324 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente gli errori di tipo oggetto                                    | Superato |
| TU325 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onAnalyzeImplementation_ gestisca correttamente l'analisi dell'implementazione                                 | Superato |
| TU326 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onAnalyzeImplementation_ gestisca correttamente gli errori durante l'analisi dell'implementazione              | Superato |
| TU327 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _onChangeTextEditorSelection_ gestisca i cambiamenti di selezione nell'editor di testo in modalità modifica       | Superato |
| TU328 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _onChangeTextEditorSelection_ non gestisca i cambiamenti di selezione quando non è in modalità modifica           | Superato |
| TU329 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onConfirmRequirementImplementation_ gestisca correttamente la conferma dell'implementazione dei requisiti      | Superato |
| TU330 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onRejectRequirementImplementation_ gestisca correttamente il rifiuto dell'implementazione dei requisiti        | Superato |
| TU331 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onStartEditMode_ gestisca correttamente l'avvio della modalità modifica                                        | Superato |
| TU332 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onEndEditMode_ gestisca correttamente la fine della modalità modifica                                          | Superato |
| TU333 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onConfirmEditImplementation_ gestisca correttamente la conferma della modifica dell'implementazione            | Superato |
| TU334 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onConfirmEditImplementation_ gestisca gli errori durante la conferma quando non c'è un riferimento corrente    | Superato |
| TU335 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onConfirmEditImplementation_ gestisca gli errori durante la conferma quando non c'è un riferimento selezionato | Superato |
| TU336 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onCancelEditImplementation_ gestisca correttamente l'annullamento della modifica dell'implementazione          | Superato |
| TU337 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onCancelEditImplementation_ gestisca gli errori durante l'annullamento quando non c'è un riferimento corrente  | Superato |
| TU338 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_updateRequirementsDisplay_ gestisca correttamente l'aggiornamento della vista per requisiti non vuoti          | Superato |
| TU339 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_handleMessageFromWebview_ gestisca correttamente gli errori con formattazione personalizzata dei messaggi      | Superato |
| TU340 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_stopEditMode_ gestisca correttamente l'arresto della modalità modifica e la pulizia dei riferimenti            | Superato |
| TU341 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTabToImport_ gestisca correttamente il passaggio alla scheda di importazione                                 | Superato |
| TU342 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTabToTrack_ gestisca correttamente il passaggio alla scheda di tracciamento                                  | Superato |
| TU343 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTabToResults_ gestisca correttamente il passaggio alla scheda dei risultati                                  | Superato |
| TU344 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTabToResults_ non invii messaggi quando non ci sono risultati di tracciamento                                | Superato |
| TU345 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onConfirmRequirementImplementation_ arresti la modalità modifica durante la conferma dell'implementazione      | Superato |
| TU346 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onImportRequirements_ arresti la modalità modifica durante l'importazione dei requisiti                        | Superato |
| TU347 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onTrackRequirements_ arresti la modalità modifica durante il tracciamento dei requisiti                        | Superato |
| TU348 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onOpenFile_ arresti la modalità modifica durante l'apertura di un file                                         | Superato |
| TU349 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onClearRequirements_ arresti la modalità modifica durante la pulizia dei requisiti                             | Superato |
| TU350 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_updateRequirementsDisplay_ arresti la modalità modifica durante l'aggiornamento della visualizzazione          | Superato |
| TU351 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onEditRequirement_ arresti la modalità modifica durante la modifica di un requisito                            | Superato |
| TU352 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onDeleteRequirement_ arresti la modalità modifica durante l'eliminazione di un requisito                       | Superato |
| TU353 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_onRejectRequirementImplementation_ arresti la modalità modifica durante il rifiuto dell'implementazione        | Superato |
| TU354 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_serializeTrackingResults_ gestisca correttamente la serializzazione dei risultati di tracciamento              | Superato |
| TU355 | Verifica, sulla classe _TrackerWebviewProvider_, che la funzione _\_startEditMode_ gestisca correttamente il riferimento corrente durante la modalità modifica                     | Superato |

Table: Test di unità sulla classe _TrackerWebviewProvider_

| ID    | Descrizione                                                                                                  | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------ | -------- |
| TU356 | Verifica, sulla classe _ChatService_, che la funzione _addMessage_ aggiunga correttamente un nuovo messaggio | Superato |
| TU357 | Verifica, sulla classe _ChatService_, che la funzione _clearMessages_ rimuova tutti i messaggi               | Superato |

Table: Test di unità sulla classe _ChatService_

| ID    | Descrizione                                                                                                                                                                | Stato    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU358 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ ritorni un valore di tipo Config                                                                       | Superato |
| TU359 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ carichi e unisca i valori locali di configurazione                                                     | Superato |
| TU360 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ carichi da una configurazione globale se non è stata trovata una locale                                | Superato |
| TU361 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente valori non validi di configurazione locale                                      | Superato |
| TU362 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente file di configurazione locale vuoti o malformati                                | Superato |
| TU363 | Verifica, sulla classe _ConfigService_, che la funzione _GetConfig_ gestisca correttamente il caso in cui il percorso di ricerca sia mancante nei filtri dei requisiti     | Superato |
| TU364 | Verifica, sulla classe _ConfigService_, che la funzione _setWorkspaceFolder_ imposti correttamente la cartella di lavoro                                                   | Superato |
| TU365 | Verifica, sulla classe _ConfigService_, che la funzione _\_getLocalConfig_ utilizzi il modello personalizzato invece di quello predefinito quando disponibile              | Superato |
| TU366 | Verifica, sulla classe _ConfigService_, che la funzione _\_getLocalConfig_ utilizzi il modello di embedding personalizzato invece di quello predefinito quando disponibile | Superato |
| TU367 | Verifica, sulla classe _ConfigService_, che la funzione _\_getLocalConfig_ dia priorità al modello locale rispetto ai modelli personalizzati e predefiniti                 | Superato |

Table: Test di unità sulla classe _ConfigService_

| ID    | Descrizione                                                                                                                                | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU368 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ formatti correttamente il codice sorgente in C o C++ | Superato |
| TU369 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ formatti correttamente il codice sorgente in Rust    | Superato |
| TU370 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca le linee vuote correttamente                | Superato |
| TU371 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca estensioni di file sconosciute come testo   | Superato |
| TU372 | Verifica, sulla classe _DocumentFormatterService_, che la funzione _formatSourceCode_ gestisca i header files correttamente                | Superato |

Table: Test di unità sulla classe _DocumentFormatterService_

| ID    | Descrizione                                                                                                                                | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU373 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ legga il file correttamente                                             | Superato |
| TU374 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ ritorni un errore se la lettura del file fallisce                       | Superato |
| TU375 | Verifica, sulla classe _FileSystemService_, che la funzione _read_ lanci un'eccezione quando la cartella root non esiste                   | Superato |
| TU376 | Verifica, sulla classe _FileSystemService_, che la funzione _setRootFolder_ imposti correttamente la cartella root                         | Superato |
| TU377 | Verifica, sulla classe _FileSystemService_, che la funzione _getChecksum_ ritorni correttamente un checksum per un dato contenuto del file | Superato |
| TU378 | Verifica, sulla classe _FileSystemService_, che la funzione _getChecksum_ ritorni un errore se il calcolo del chacksum fallisce            | Superato |

Table: Test di unità sulla classe _FileSystemService_

| ID    | Descrizione                                                                                                                                                    | Stato    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU379 | Verifica, sulla classe _FilterService_, che il costruttore recuperi i filtri dal servizio di configurazione                                                    | Superato |
| TU380 | Verifica, sulla classe _FilterService_, che la funzione _getPathFilter_ ritorni il path filter correttamente                                                   | Superato |
| TU381 | Verifica, sulla classe _FilterService_, che la funzione _getFileExtensionFilter_ ritorni il filtro dell'estensione correttamente                               | Superato |
| TU382 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementsFilters_ ritorni il filtro dei requisiti correttamente                                 | Superato |
| TU383 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementFilters_ ritorni il filtro specifico per un requisito tramite ID                        | Superato |
| TU384 | Verifica, sulla classe _FilterService_, che la funzione _getRequirementFilters_ ritorni il un oggetto vuoto nel caso in cui il filtro dei requisiti non esista | Superato |
| TU385 | Verifica, sulla classe _FilterService_, che la funzione _hasRequirementsFilters_ ritorni true quando esistono filtri per un dato ID requisito                  | Superato |
| TU386 | Verifica, sulla classe _FilterService_, che la funzione _hasRequirementsFilters_ ritorni false quando non esistono filtri per un dato ID requisito             | Superato |

Table: Test di unità sulla classe _FilterService_

| ID    | Descrizione                                                                                                                       | Stato    |
| ----- | --------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU387 | Verifica, sulla classe _GlobalStateService_, che la funzione _updateState_ aggiorni lo stato tramite i messaggi della chat        | Superato |
| TU388 | Verifica, sulla classe _GlobalStateService_, che la funzione _updateState_ aggiorni lo stato tramite i requisiti                  | Superato |
| TU389 | Verifica, sulla classe _GlobalStateService_, che la funzione _getState_ ritorni i messaggi della chat dallo stato globale         | Superato |
| TU390 | Verifica, sulla classe _GlobalStateService_, che la funzione _getState_ ritorni un array vuoto se non esiste uno stato            | Superato |
| TU391 | Verifica, sulla classe _GlobalStateService_, che la funzione _clearState_ cancelli lo stato rendendolo un array vuoto per default | Superato |
| TU392 | Verifica, sulla classe _GlobalStateService_, che la funzione _clearState_ cancelli lo stato con un valore di reset personalizzato | Superato |

Table: Test di unità sulla classe _GlobalStateService_

| ID    | Descrizione                                                                                                                                                          | Stato    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU393 | Verifica, sulla classe _InferenceService_, che la funzione _\_getContextAndPrompt_ combini correttamente i chunks e i requirements nel contesto e formatti il prompt | Superato |
| TU394 | Verifica, sulla classe _InferenceService_, che la funzione _query_ recuperi i files rilevanti e generi una risposta                                                  | Superato |
| TU395 | Verifica, sulla classe _InferenceService_, che la funzione _query_ gestisca i casi di errore durante la query correttamente                                          | Superato |
| TU396 | Verifica, sulla classe _InferenceService_, che la funzione _query_ gestisca i casi di errore sconosciuti correttamente                                               | Superato |
| TU397 | Verifica, sulla classe _InferenceService_, che la funzione _queryStream_ recuperi il contesto, formatti il prompt e faccia lo streaming della risposta               | Superato |
| TU398 | Verifica, sulla classe _InferenceService_, che la funzione _queryStream_ gestisca correttamente gli errori durante lo streaming                                      | Superato |
| TU399 | Verifica, sulla classe _InferenceService_, che la funzione _checkSystemRequirements_ controlli la connessione al modello di Ollama                                   | Superato |
| TU400 | Verifica, sulla classe _InferenceService_, che la funzione _checkSystemRequirements_ gestisca correttamente il caso di errore di connessione                         | Superato |

Table: Test di unità sulla classe _InferenceService_

| ID    | Descrizione                                                                                                                                                             | Stato    |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU401 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con tutti i dati e attributi di nome diverso       | Superato |
| TU402 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con dati mancanti                                  | Superato |
| TU403 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con id mancante                                    | Superato |
| TU404 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array vuoto se la stringa è vuota                                                        | Superato |
| TU405 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se il delimitatore è sbagliato                                                    | Superato |
| TU406 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se mancano dati                                                                   | Superato |
| TU407 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un array di requisiti da una stringa csv con tutti i dati e con un delimitatore predefinito | Superato |
| TU408 | Verifica, sulla classe _ParsingService_, che la funzione _parseCSV_ ritorni un errore se la lunghezza delle linee è minnore di due                                      | Superato |
| TU409 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un array di requisiti da una stringa reqif con tutti i dati e attributi di nome diverso   | Superato |
| TU410 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un array di requisiti da una stringa reqif con dati mancanti                              | Superato |
| TU411 | Verifica, sulla classe _ParsingService_, che la funzione _parseREQIF_ ritorni un errore se la stringa è vuota                                                           | Superato |
| TU412 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia un singolo SPEC_OBJECT che un array di SPEC_OBJECTS          | Superato |
| TU413 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente variazioni di nomi di attributo in csv                           | Superato |
| TU414 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia singoli attributi che array di essi                          | Superato |
| TU415 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente sia un singolo valore che più valori negli attributi             | Superato |
| TU416 | Verifica, sulla classe _ParsingService_, che la funzione _parseReqIFSpecObject_ gestisca correttamente variazioni di identificativo                                     | Superato |

Table: Test di unità sulla classe _ParsingService_

| ID    | Descrizione                                                                                                                                                                          | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| TU417 | Verifica, sulla classe _RequirementsService_, che il costruttore inizializzi correttamente i requisiti dallo stato globale                                                           | Superato |
| TU418 | Verifica, sulla classe _RequirementsService_, che il costruttore gestisca correttamente il caso in cui lo stato globale è vuoto                                                      | Superato |
| TU419 | Verifica, sulla classe _RequirementsService_, che la funzione _addRequirement_ aggiunga il requisito e aggiorni lo stato globale                                                     | Superato |
| TU420 | Verifica, sulla classe _RequirementsService_, che la funzione _addRequirement_ aggiunga una lista di requisiti e aggiorni lo stato globale                                           | Superato |
| TU421 | Verifica, sulla classe _RequirementsService_, che la funzione _saveRequirements_ aggiorni la lista dei requisiti nello stato globale                                                 | Superato |
| TU422 | Verifica, sulla classe _RequirementsService_, che la funzione _getRequirements_ recuperi la lista dei requisiti dallo stato globale                                                  | Superato |
| TU423 | Verifica, sulla classe _RequirementsService_, che la funzione _deleteRequirement_ rimuova un requisito e aggiorni lo stato globale                                                   | Superato |
| TU424 | Verifica, sulla classe _RequirementsService_, che la funzione _clearRequirements_ rimuova tutti i requisiti dalla lista nello stato globale                                          | Superato |
| TU425 | Verifica, sulla classe _RequirementsService_, che la funzione _getById_ recuperi un requisito in base al suo id                                                                      | Superato |
| TU426 | Verifica, sulla classe _RequirementsService_, che la funzione _updateRequirementCodeReference_ aggiorni correttamente il riferimento al codice e lo stato per un requisito esistente | Superato |
| TU427 | Verifica, sulla classe _RequirementsService_, che la funzione _updateRequirementCodeReference_ non faccia nulla per un ID requisito non esistente                                    | Superato |
| TU428 | Verifica, sulla classe _RequirementsService_, che la funzione _updateRequirementStatus_ aggiorni correttamente lo stato per un requisito esistente                                   | Superato |
| TU429 | Verifica, sulla classe _RequirementsService_, che la funzione _updateRequirementStatus_ non faccia nulla per un ID requisito non esistente                                           | Superato |

Table: Test di unità sulla classe _RequirementsService_

| ID    | Descrizione                                                                                                                                                                     | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU430 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackRequirementImplementation_ gestisca correttamente gli errori durante il tracciamento dei requisiti   | Superato |
| TU431 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ gestisca correttamente gli errori durante l'elaborazione dei files                 | Superato |
| TU432 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _findRelatedCode_ ritorni pezzi di codice correlati al requisito                                           | Superato |
| TU433 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _findRelatedCode_ gestisca correttamente gli errori durante la ricerca di codice correlato                 | Superato |
| TU434 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "unlikely-match" nel caso di riferimenti vuoti                   | Superato |
| TU435 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "confirmed-match" nel caso di punteggi alti                      | Superato |
| TU436 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "possible-match" nel caso di punteggi medi                       | Superato |
| TU437 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_determineImplementationStatus_ ritorni "unlikely-match" nel caso di punteggi bassi                      | Superato |
| TU438 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ gestisca correttamente gli errori durante il tracciamento                           | Superato |
| TU439 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ tracci i requisiti e ritorni un riassunto                                           | Superato |
| TU440 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ crei un nuovo riepilogo quando non ne esiste uno                                    | Superato |
| TU441 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ elabori i file dei requisiti con i filtri                                           | Superato |
| TU442 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ tracci i requisiti con filtri usando file di codice filtrati                        | Superato |
| TU443 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ copra il caso "possible-match"                                                      | Superato |
| TU444 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _trackAllRequirements_ copra il caso "unlikely-match"                                                      | Superato |
| TU445 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findSingleRequirementCodeFiles_ ritorni un array vuoto quando non trova cartelle del workspace          | Superato |
| TU446 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findSingleRequirementCodeFiles_ utilizzi i filtri dei requisiti quando disponibili                      | Superato |
| TU447 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findSingleRequirementCodeFiles_ utilizzi il pattern predefinito quando non trova filtri dei requisiti   | Superato |
| TU448 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findSingleRequirementCodeFiles_ aggreghi i file da tutte le cartelle del workspace                      | Superato |
| TU449 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_processRequirementFile_ elabori i file per un requisito con file di codice                              | Superato |
| TU450 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_processRequirementFile_ non elabori i file quando non trova file di codice                              | Superato |
| TU451 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_processRequirementFile_ propaghi gli errori da processFiles                                             | Superato |
| TU452 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ ritorni i filtri corretti con solo i path inclusi                                           | Superato |
| TU453 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ ritorni i filtri corretti con entrambi i path e le estensioni incluse                       | Superato |
| TU454 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ gestisca correttamente i path con singoli include                                           | Superato |
| TU455 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ gestisca correttamente l'assenza di filtri                                                  | Superato |
| TU456 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ combini correttamente filtri multipli per path ed estensioni                                | Superato |
| TU457 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_getFilters_ mantenga l'ordine dei filtri durante il merge                                               | Superato |
| TU458 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ elabori tutti i files del workspace                                                | Superato |
| TU459 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _processWorkspaceFiles_ gestisca il caso in cui il workspace non abbia cartelle                            | Superato |
| TU460 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_findWorkspaceCodeFiles_ ritorni un warning se non sono state trovate cartelle nel workspace             | Superato |
| TU461 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateImplementationScore_ calcoli correttamente il punteggio di implementazione                     | Superato |
| TU462 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateImplementationScore_ ritorni zero se i riferimenti sono vuoti                                  | Superato |
| TU463 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_calculateAverageScore_ ritorni zero se il punteggio medio è indefinito                                  | Superato |
| TU464 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_convertToCodeReferences_ ordini al contrario                                                            | Superato |
| TU465 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _\_convertToCodeReferences_ gestisca correttamente il calcolo del numero di linea per il range di contesto | Superato |
| TU466 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _analyzeImplementation_ analizzi l'implementazione con successo                                            | Superato |
| TU467 | Verifica, sulla classe _RequirementsTrackerService_, che la funzione _analyzeImplementation_ gestisca gli errori durante l'analisi dell'implementazione                         | Superato |

Table: Test di unità sulla classe _RequirementsTrackerService_

| ID    | Descrizione                                                                                                                                                                      | Stato    |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU468 | Verifica, sulla classe _TrackingResultService_, che la funzione _saveTrackingResult_ salvi correttamente il riepilogo dei risultati di tracciamento                              | Superato |
| TU469 | Verifica, sulla classe _TrackingResultService_, che la funzione _saveTrackingResult_ gestisca correttamente i dettagli dei requisiti vuoti                                       | Superato |
| TU470 | Verifica, sulla classe _TrackingResultService_, che la funzione _saveTrackingResult_ aggiorni correttamente i dettagli di tracciamento esistenti quando salva un nuovo riepilogo | Superato |
| TU471 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrackingResult_ ritorni un array vuoto quando non esistono risultati                                         | Superato |
| TU472 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrackingResult_ ritorni un array di risultati di tracciamento quando esistono                                | Superato |
| TU473 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrackingDetails_ lanci un errore quando non esistono dettagli                                                | Superato |
| TU474 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrackingDetails_ ritorni i dettagli di tracciamento quando esistono                                          | Superato |
| TU475 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrackingDetails_ gestisca correttamente uno stato memorizzato undefined                                      | Superato |
| TU476 | Verifica, sulla classe _TrackingResultService_, che la funzione _clearRequirements_ pulisca correttamente tutti i risultati di tracciamento                                      | Superato |
| TU477 | Verifica, sulla classe _TrackingResultService_, che la funzione _removeCodeReference_ rimuova i riferimenti al codice e aggiorni i conteggi per le corrispondenze possibili      | Superato |
| TU478 | Verifica, sulla classe _TrackingResultService_, che la funzione _removeCodeReference_ rimuova i riferimenti al codice e aggiorni i conteggi per le corrispondenze improbabili    | Superato |
| TU479 | Verifica, sulla classe _TrackingResultService_, che la funzione _removeCodeReference_ gestisca correttamente riferimenti al codice multipli                                      | Superato |
| TU480 | Verifica, sulla classe _TrackingResultService_, che la funzione _removeCodeReference_ lanci un errore durante la rimozione di riferimenti quando non esistono dettagli           | Superato |
| TU481 | Verifica, sulla classe _TrackingResultService_, che la funzione _confirmResult_ aggiorni i conteggi quando conferma una corrispondenza possibile                                 | Superato |
| TU482 | Verifica, sulla classe _TrackingResultService_, che la funzione _confirmResult_ lanci un errore durante la conferma quando non esistono dettagli                                 | Superato |
| TU483 | Verifica, sulla classe _TrackingResultService_, che la funzione _confirmResult_ gestisca correttamente la conferma di una corrispondenza improbabile                             | Superato |
| TU484 | Verifica, sulla classe _TrackingResultService_, che la funzione _getById_ ritorni undefined per un ID non esistente                                                              | Superato |
| TU485 | Verifica, sulla classe _TrackingResultService_, che la funzione _getById_ ritorni il risultato di tracciamento per un ID esistente                                               | Superato |
| TU486 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrakingResultSummary_ ritorni undefined quando si verifica un errore nel recupero del riepilogo              | Superato |
| TU487 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrakingResultSummary_ ritorni il riepilogo dei risultati di tracciamento quando i dati esistono              | Superato |
| TU488 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrakingResultSummary_ gestisca uno stato memorizzato mancante nel recupero del riepilogo                     | Superato |
| TU489 | Verifica, sulla classe _TrackingResultService_, che gestisca correttamente il caricamento di uno stato memorizzato valido                                                        | Superato |
| TU490 | Verifica, sulla classe _TrackingResultService_, che lanci un errore quando tenta di salvare con dettagli undefined                                                               | Superato |
| TU491 | Verifica, sulla classe _TrackingResultService_, che gestisca un formato di stato memorizzato non valido                                                                          | Superato |
| TU492 | Verifica, sulla classe _TrackingResultService_, che gestisca uno stato memorizzato con risultati                                                                                 | Superato |
| TU493 | Verifica, sulla classe _TrackingResultService_, che gestisca risultati mancanti nello stato memorizzato                                                                          | Superato |
| TU494 | Verifica, sulla classe _TrackingResultService_, che gestisca uno stato memorizzato mancante                                                                                      | Superato |
| TU495 | Verifica, sulla classe _TrackingResultService_, che gestisca uno stato memorizzato parziale                                                                                      | Superato |
| TU496 | Verifica, sulla classe _TrackingResultService_, che carichi e memorizzi i requisiti dallo stato                                                                                  | Superato |
| TU497 | Verifica, sulla classe _TrackingResultService_, che aggiorni i dettagli esistenti durante il salvataggio di un nuovo risultato di tracciamento                                   | Superato |
| TU498 | Verifica, sulla classe _TrackingResultService_, che la funzione _deleteRequirement_ elimini un requisito e aggiorni i conteggi                                                   | Superato |
| TU499 | Verifica, sulla classe _TrackingResultService_, che la funzione _deleteRequirement_ non faccia nulla quando i dettagli sono undefined                                            | Superato |
| TU500 | Verifica, sulla classe _TrackingResultService_, che la funzione _getTrakingResultSummary_ ritorni undefined quand un errore occorre in \_DStoTRS                                 | Superato |

Table: Test di unità sulla classe _TrackingResultService_

| ID    | Descrizione                                                                                                                                       | Stato    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU501 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview senza CSS o JavaScript         | Superato |
| TU502 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview con CSS o JavaScript           | Superato |
| TU503 | Verifica, sulla classe _ChatWebView_, che la funzione _getHtmlForWebview_ gestica correttamente i casi di errore durante la lettura del file HTML | Superato |
| TU504 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ ritorni una stringa di lunghezza 32                                              | Superato |
| TU505 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ ritorni una stringa di soli caratteri alfanumerici                               | Superato |
| TU506 | Verifica, sulla classe _ChatWebView_, che la funzione _getNonce_ generi nonces diversi se viene chiamata più volte                                | Superato |

Table: Test di unità sulla classe _ChatWebView_

| ID    | Descrizione                                                                                                                                          | Stato    |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| TU507 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview senza CSS o JavaScript         | Superato |
| TU508 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ ritorni contenuto in HTML per la webview con CSS o JavaScript           | Superato |
| TU509 | Verifica, sulla classe _TrackerWebView_, che la funzione _getHtmlForWebview_ gestica correttamente i casi di errore durante la lettura del file HTML | Superato |
| TU510 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ ritorni una stringa di lunghezza 32                                              | Superato |
| TU511 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ ritorni una stringa di soli caratteri alfanumerici                               | Superato |
| TU512 | Verifica, sulla classe _TrackerWebView_, che la funzione _getNonce_ generi nonces diversi se viene chiamata più volte                                | Superato |

Table: Test di unità sulla classe _TrackerWebView_

### Test di Integrazione

| ID   | Descrizione                                                                                                             | Stato    |
| ---- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| TI01 | Verifica che il sistema carichi correttamente la configurazione predefinita                                             | Superato |
| TI02 | Verifica che il sistema consenta la sovrascrittura dei valori predefiniti tramite file di configurazione personalizzato | Superato |
| TI03 | Verifica che il sistema si aggiorni dopo le modifiche al file di configurazione                                         | Superato |
| TI04 | Verifica che il sistema gestisca correttamente i valori di configurazione non validi                                    | Superato |
| TI05 | Verifica che il sistema gestisca correttamente i messaggi nella memoria globale                                         | Superato |
| TI06 | Verifica che il sistema gestisca correttamente l'invio di messaggi                                                      | Superato |
| TI07 | Verifica che il sistema gestisca correttamente il recupero della cronologia dei messaggi                                | Superato |
| TI08 | Verifica che il sistema gestisca correttamente la pulizia della cronologia                                              | Superato |
| TI09 | Verifica che il sistema gestisca correttamente le chiamate a Ollama per generare risposte                               | Superato |
| TI10 | Verifica che il sistema gestisca correttamente lo streaming da Ollama                                                   | Superato |
| TI11 | Verifica che il sistema gestisca correttamente gli errori nelle risposte di Ollama                                      | Superato |
| TI12 | Verifica che il comando _clearChatHistory_ pulisca correttamente la cronologia della chat                               | Superato |
| TI13 | Verifica che il comando _clearRequirementsHistory_ pulisca correttamente la cronologia dei requisiti                    | Superato |
| TI14 | Verifica che il comando _openSettings_ apra correttamente le impostazioni dell'estensione                               | Superato |
| TI15 | Verifica che il comando _openSidebar_ apra correttamente la barra laterale dell'estensione                              | Superato |
| TI16 | Verifica che il comando _InterrogateSelectionCommand_ validi la presenza di requisiti caricati prima dell'esecuzione    | Superato |
| TI17 | Verifica che il comando _InterrogateDocumentCommand_ validi la presenza di un editor attivo prima dell'esecuzione       | Superato |
| TI18 | Verifica che il comando _ResetDatabaseCommand_ mostri una conferma e resetti il database quando confermato              | Superato |
| TI19 | Verifica che il sistema richieda conferma prima di resettare il database e lo resetti correttamente quando confermato   | Superato |
| TI20 | Verifica che il sistema validi correttamente il caricamento dei requisiti prima di interrogare una selezione            | Superato |
| TI21 | Verifica che il sistema validi correttamente l'esistenza di un editor attivo prima di interrogare un documento          | Superato |
| TI22 | Verifica che l'estensione sia presente e attivata correttamente                                                         | Superato |
| TI23 | Verifica che i comandi siano registrati correttamente                                                                   | Superato |
| TI24 | Verifica che i provider webview siano registrati correttamente                                                          | Superato |
| TI25 | Verifica che il servizio di configurazione sia inizializzato correttamente                                              | Superato |
| TI26 | Verifica che i gestori degli eventi siano registrati correttamente                                                      | Superato |
| TI27 | Verifica che i servizi di sistema siano inizializzati correttamente                                                     | Superato |
| TI28 | Verifica che il sistema importi correttamente i requisiti da CSV                                                        | Superato |
| TI29 | Verifica che il sistema elabori e indicizzi correttamente i file sorgente                                               | Superato |
| TI30 | Verifica che il sistema tracci correttamente l'implementazione dei requisiti                                            | Superato |
| TI31 | Verifica che il sistema aggiorni correttamente lo stato dei requisiti                                                   | Superato |
| TI32 | Verifica che il sistema recuperi correttamente un requisito specifico tramite ID                                        | Superato |
| TI33 | Verifica che il sistema esegua correttamente la ricerca vettoriale sui blocchi di codice                                | Superato |
| TI34 | Verifica che il sistema analizzi correttamente l'implementazione in base ai riferimenti nel codice                      | Superato |
| TI35 | Verifica che il sistema pulisca correttamente tutti i requisiti                                                         | Superato |

Table: Test di integrazione

### Test di sistema

| ID   | Descrizione                                                                                                                                                                                                                                                                               | ID Requisito | Stato    |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------- |
| TS01 | Verifica che l'utente possa scegliere il modello LLM per generare il codice                                                                                                                                                                                                               | RFO_1        | Superato |
| TS02 | Verifica che l'utente possa scegliere il modello LLM per l'embedding                                                                                                                                                                                                                      | RFO_2        | Superato |
| TS03 | Verifica che l'utente possa scegliere un modello custom per generare codice anche indicando il nome di uno già installato nel suo dispositivo                                                                                                                                             | RFD_3        | Superato |
| TS04 | Verifica che l'utente possa scegliere un modello custom per l'embedding anche indicando il nome di uno già installato nel suo dispositivo                                                                                                                                                 | RFD_4        | Superato |
| TS05 | Verifica che l'utente possa scegliere uno dei modelli proposti per generare codice                                                                                                                                                                                                        | RFO_5        | Superato |
| TS06 | Verifica che l'utente possa scegliere uno dei modelli proposti per l'embedding                                                                                                                                                                                                            | RFO_6        | Superato |
| TS07 | Verifica che l'utente possa impostare la temperature del modello per generare codice inserendo un valore decimale compreso tra 0 e 1                                                                                                                                                      | RFD_7        | Superato |
| TS08 | Verifica che l'utente possa inserire un Bearer Token per usare Ollama in un server esterno                                                                                                                                                                                                | RFP_8        | Superato |
| TS09 | Verifica che l'utente possa inserire un endpoint specifico a cui indirizzare le richieste di Ollama                                                                                                                                                                                       | RFP_9        | Superato |
| TS10 | Verifica che l'utente possa impostare il numero massimo di risultati da ottenere per ogni ricerca                                                                                                                                                                                         | RFP_10       | Superato |
| TS11 | Verifica che l'utente possa specificare il prompt per la richiesta al modello di generazione del codice                                                                                                                                                                                   | RFP_11       | Superato |
| TS12 | Verifica che l'applicativo restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se Ollama non risulta installato all'endpoint indicato                                                              | RFO_12       | Superato |
| TS13 | Verifica che l'applicativo restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se l'endpoint indicato non è raggiungibile                                                                          | RFO_13       | Superato |
| TS14 | Verifica che l'applicativo restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il modello, scelto tra quelli proposti o custom, non è installato nel dispositivo                                | RFO_14       | Superato |
| TS15 | Verifica che l'applicativo restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il modello custom indicato non esiste                                                                            | RFO_15       | Superato |
| TS16 | Verifica che l'applicativo restituisca un messaggio d'errore che fornisca una possibile soluzione al problema e indichi chiaramente il campo che ha generato l'errore se il bearer token indicato fallisce l'autenticazione e non viene autorizzato al collegamento con il server esterno | RFP_16       | Superato |
| TS17 | Verifica che l'utente, tramite l'interfaccia grafica, possa indicare la cartella del progetto software                                                                                                                                                                                    | RFO_17       | Superato |
| TS18 | Verifica che l'utente, tramite l'interfaccia grafica, possa indicare il file con presente la lista dei requisiti                                                                                                                                                                          | RFO_18       | Superato |
| TS19 | Verifica che l'utente, tramite l'interfaccia grafica, possa effettuare una selezione dei requisiti da analizzare                                                                                                                                                                          | RFD_19       | Superato |
| TS20 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per selezionare quali requisiti ricercare nel codice e quali ignorare                                                                                                                                  | RFD_20       | Superato |
| TS21 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali cartelle includere o escludere nella ricerca del codice                                                                                                                             | RFD_21       | Superato |
| TS22 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali file includere o escludere nella ricerca del codice                                                                                                                                 | RFD_22       | Superato |
| TS23 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare quali estensioni di file includere o escludere nella ricerca del codice                                                                                                                   | RFD_23       | Superato |
| TS24 | Verifica che l'utente, tramite l'interfaccia grafica, possa specificare dei filtri per indicare un file nel quale ricercare l'implementazione di un preciso requisito                                                                                                                     | RFD_24       | Superato |
| TS25 | Verifica che l'utente, tramite l'interfaccia grafica, possa selezionare una porzione di codice sulla quale eseguire nuovamente la ricerca                                                                                                                                                 | RFD_25       | Superato |
| TS26 | Verifica che l'utente, tramite l'interfaccia grafica, possa effettuare una nuova ricerca su tutto il codice                                                                                                                                                                               | RFO_26       | Superato |

Table: Test di sistema parte 1

| ID   | Descrizione                                                                                                                                                                                                                                                                                          | ID Requisito | Stato            |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ---------------- |
| TS27 | Verifica che l'utente, tramite l'interfaccia grafica, possa visualizzare la porzione di codice che implementa un requisito tramite il puntatore indicato nella tabella che lo riporta al file                                                                                                        | RFO_27       | Superato         |
| TS28 | Verifica che l'applicativo effettui il parsing del documento dei requisiti                                                                                                                                                                                                                           | RFO_28       | Superato         |
| TS29 | Verifica che l'applicativo generi una struttura dati a partire dal parsing del documento dei requisiti                                                                                                                                                                                               | RFO_29       | Superato         |
| TS30 | Verifica che l'applicativo generi una notifica di errore se il parsing non è andato a buon fine a causa del formato file scorretto                                                                                                                                                                   | RFO_30       | Superato         |
| TS31 | Verifica che l'applicativo generi una notifica di errore se il parsing non è andato a buon fine a causa del formato non supportato                                                                                                                                                                   | RFO_31       | Superato         |
| TS32 | Verifica che la struttura dati memorizzi per ogni requisito: codice identificativo, testo del requisito, stato di implementazione (implementato o non implementato) e il puntatore al frammento di codice (funzione o parte di essa) dove presume sia implementato                                   | RFO_32       | Superato         |
| TS33 | Verifica che l'applicativo per ogni requisito applichi il filtro corrispondente, se presente                                                                                                                                                                                                         | RFD_33       | Superato         |
| TS34 | Verifica che l'applicativo generi una notifica di errore se i filtri indicati dall'utente non sono applicabili                                                                                                                                                                                       | RFD_34       | Non implementato |
| TS35 | Verifica che l'applicativo, per ogni requisito selezionato, produca il codice corrispondente interrogando il modello selezionato per la generazione del codice                                                                                                                                       | RFO_35       | Superato         |
| TS36 | Verifica che l'applicativo effettui, per ogni requisito selezionato, il pattern matching tra il codice generato e il codice del progetto utilizzando il modello selezionato                                                                                                                          | RFO_36       | Superato         |
| TS37 | Verifica che l'applicativo invalidi i requisiti associati a un file che ha subito modifiche in seguito alla ricerca                                                                                                                                                                                  | RFD_37       | Non implementato |
| TS38 | Verifica che l'applicativo generi una notifica di errore se una o più richieste ai modelli sono fallite                                                                                                                                                                                              | RFO_38       | Superato         |
| TS39 | Verifica che l'applicativo, alla fine dell'esecuzione, aggiorni la struttura dati, modificando lo stato di implementazione e il puntatore al codice                                                                                                                                                  | RFO_39       | Superato         |
| TS40 | Verifica che l'applicativo fornisca un chatbot per porre domande al modello di generazione del codice                                                                                                                                                                                                | RFP_40       | Superato         |
| TS41 | Verifica che l'applicativo fornisca un'interfaccia grafica per la visualizzazione della struttura dati in forma tabellare e che per ogni requisito vengano mostrati: sigla identificativa, descrizione testuale, puntatore alla porzione di codice, stato di implementazione e stato di approvazione | RFO_41       | Superato         |
| TS42 | Verifica che l'interfaccia grafica per la visualizzazione della struttura dati permetta di selezionare o escludere un requisito                                                                                                                                                                      | RFD_42       | Superato         |
| TS43 | Verifica che la struttura dati sia esportabile in formato .csv e memorizzi l'hash code della commit per il versionamento                                                                                                                                                                             | RFP_43       | Non implementato |
| TS44 | Verifica che l'applicativo generi una notifica di errore se la struttura dati non è leggibile se il file risulta cancellato                                                                                                                                                                          | RFO_44       | Superato         |
| TS45 | Verifica che l'applicativo generi una notifica di errore se la struttura dati non è leggibile se il file risulta corrotto                                                                                                                                                                            | RFO_45       | Superato         |
| TS46 | Verifica che l'applicativo richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa approvare la proposta                                                                                       | RFP_46       | Superato         |
| TS47 | Verifica che l'applicativo richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa scartare la proposta                                                                                        | RFP_47       | Superato         |
| TS48 | Verifica che l'applicativo richieda all'utente di fornire un feedback riguardo la correttezza dei risultati della ricerca memorizzati nella struttura dati mostrata e che l'utente possa modificare il puntatore alla porzione di codice                                                             | RFP_48       | Superato         |
| TS49 | Verifica che l'applicativo generi una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se il puntatore è scorretto                                                                                                                                        | RFO_49       | Superato         |
| TS50 | Verifica che l'applicativo generi una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se il file è stato cancellato                                                                                                                                      | RFO_50       | Superato         |
| TS51 | Verifica che l'applicativo generi una notifica di errore se la porzione di codice che implementa un requisito non è raggiungibile se il file è corrotto                                                                                                                                              | RFO_51       | Superato         |
| TS52 | Verifica che l'applicativo possa eseguire un controllo di implementazione specifico su un requisito interrogando Ollama                                                                                                                                                                              | RFO_52       | Superato         |

Table: Test di sistema parte 2

### Test di accettazione

| ID   | Descrizione                                                                                                           | ID Requisito                                                                                                   | Stato        |
| ---- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------ |
| TA01 | Verifica funzionalità come estensione in VS Code                                                                      | RTO_1                                                                                                          | Implementato |
| TA02 | Verifica esecuzione locale dell'applicativo                                                                           | RTO_2                                                                                                          | Implementato |
| TA03 | Verifica integrazione con Ollama                                                                                      | RTO_3, RTO_4                                                                                                   | Implementato |
| TA04 | Verifica analisi di codice in linguaggio C/C++                                                                        | RTO_5                                                                                                          | Implementato |
| TA05 | Verifica analisi di codice in linguaggio Rust                                                                         | RTP_6                                                                                                          | Implementato |
| TA06 | Verifica supporto formato file requisiti .csv                                                                         | RTO_7                                                                                                          | Implementato |
| TA07 | Verifica supporto formato file requisiti .reqif                                                                       | RTP_8                                                                                                          | Implementato |
| TA08 | Verifica usabilità interfaccia grafica                                                                                | RFO_14, RFO_15                                                                                                 | Implementato |
| TA09 | Verifica esecuzione dell'applicativo con configurazioni di default                                                    | RFO_5, RFO_6, RFD_7, RFP_10                                                                                    | Implementato |
| TA10 | Verifica esecuzione dell'applicativo con configurazioni personalizzate (scelta e gestione modelli)                    | RFO_1, RFO_2, RFD_3, RFD_4, RFD_7, RFP_10, RFP_11                                                              | Implementato |
| TA11 | Verifica esecuzione dell'applicativo con configurazioni personalizzate (filtri: selezione cartelle, file e requisiti) | RFO_17, RFD_19, RFD_20, RFD_21, RFD_22, RFD_23, RFD_24                                                         | Implementato |
| TA12 | Verifica esecuzione della ricerca dei requisiti                                                                       | RFD_25, RFO_26, RFO_27, RFO_28, RFO_35, RFO_36, RFD_37, RFO_52                                                 | Implementato |
| TA13 | Verifica generazione, visualizzazione e aggiornamento dello stato dei requisiti                                       | RFO_29 RFO_32 RFO_39 RFO_41 RFD_42 RFP_43                                                                      | Implementato |
| TA14 | Verifica interazione con il ChatBot                                                                                   | RFP_40                                                                                                         | Implementato |
| TA15 | Verifica richiesta di feedback                                                                                        | RFP_46, RFP_47, RFP_48                                                                                         | Implementato |
| TA16 | Verifica copertura dei test superiore a 80%                                                                           | RQO_6                                                                                                          | Implementato |
| TA17 | Verifica esecuzione dell'applicativo in presenza di errori                                                            | RFO_12, RFO_13, RFO_14, RFO_15, RFP_16, RFO_30, RFO_31, RFD_34, RFO_38, RFO_44, RFO_45, RFO_49, RFO_50, RFO_51 | Implementato |

Table: Test di accettazione

## Cruscotto di valutazione

### Indice Gulpease

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1654995613&amp;format=interactive" data-image="ig.png" data-title="Indice Gulpease"></iframe>

#### RTB

Possiamo osservare che i valori riportati sono rimasti stabili durante questa prima fase di sviluppo. Tutti i documenti risultano, infatti, comprensibili ad utenti con una licenza media. Durante la prossima fase cercheremo di migliorare la leggibilità dei documenti per superare il valore ottimo.

### Errori ortografici

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1466111038&amp;format=interactive" data-image="eo.png" data-title="Errori Ortografici"></iframe>

#### RTB

Possiamo osservare che il numero di errori è stato minimizzato tramite l'utilizzo di "SpellCheck": un'estensione che permette di individuare gli errori ortografici all'interno dei documenti.

### Earned value, planned value & actual cost

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1002546531&amp;format=interactive" data-image="ev-pv-ac.png" data-title="Earned Value, Planned Value e Actual Cost"></iframe>

#### RTB

Possiamo osservare che, nonostante un iniziale sovrastima del carico di lavoro completabile, il progetto risulta al passo con la pianificazione iniziale. Questo è stato possibile attraverso uno %%sprint|sprint%% di recupero durante il quale il gruppo si è concentrato sul completamento delle attività rimaste in arretrato.

### Estimate to complete & estimate at completion

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=840721179&amp;format=interactive" data-image="etc-eac.png" data-title="Estimate to Complete e Estimate at Completion"></iframe>

#### RTB

Possiamo osservare che, nonostante una iniziale crescita delle stime di completamento, il grafico risulta stabile ed in linea con la pianificazione. La crescita iniziale è dovuta ad un rallentamento nel processo di sviluppo osservabile nel grafico [Schedule Variance](#schedule-variance--cost-variance).

### Schedule variance & cost variance

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1247587591&amp;format=interactive" data-image="sv-cv.png" data-title="Schedule Variance e Cost Variance"></iframe>

#### RTB

Possiamo osservare che durante gli %%sprint|sprint%% 2, 3 e 4 il gruppo ha sovrastimato la quantità di lavoro completabile vista la presenza della pausa invernale e della sessione d'esami. Il lavoro è stato recuperato negli sprint successivi riportando lo stato di avanzamento del progetto in linea con la pianificazione iniziale.

### Schedule performance index & cost performance index

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=467291162&amp;format=interactive" data-image="spi-cpi.png" data-title="Schedule Performance Index e Cost Performance Index"></iframe>

#### RTB

Possiamo osservare che durante gli %%sprint|sprint%% 2, 3 e 4 il valore del SPI non rispettava la soglia minima. Questo è dovuto ad un rallentamento nel processo di sviluppo causato dalla presenza della pausa invernale e della sessione d'esami. Grazie ad uno %%sprint|sprint di recupero il valore di questa metrica ha superato la soglia di accettazione.

### Rischi non preventivati

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=13872230&amp;format=interactive" data-image="rnp.png" data-title="Rischi non preventivati"></iframe>

#### RTB

Possiamo osservare che, allo stato attuale del progetto, non sono stati individuati rischi non previsti. Il gruppo è stato quindi in grado di gestire il progetto in maniera efficace mitigando la comparse di nuovi rischi non preventivati.

### Requisiti obbligatori

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=550686990&amp;format=interactive" data-image="ro.png" data-title="Requisiti Obbligatori"></iframe>

### Requisiti desiderabili

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=99639478&amp;format=interactive" data-image="rd.png" data-title="Requisiti Desiderabili"></iframe>

### Requisiti opzionali

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1136804738&amp;format=interactive" data-image="rop.png" data-title="Requisiti Opzionali"></iframe>

### Branch coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1042212840&amp;format=interactive" data-image="bc.png" data-title="Branch Coverage"></iframe>

### Statement coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=959844727&amp;format=interactive" data-image="sc.png" data-title="Statement Coverage"></iframe>

### Condition coverage

<iframe width="800" height="500" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vS0txzzEKqHdhrji9fd49Hd7k4zLchkVRCsBk1Oil4yILOSzL3kxO2DtdxCC9W1ni5uqytaJaVwcHAV/pubchart?oid=1162915206&amp;format=interactive" data-image="cc.png" data-title="Condition Coverage"></iframe>

## Valutazione di miglioramento

L'adozione di un processo di valutazione di miglioramento continuo permette di monitorare sistematicamente l'efficacia e l'efficienza dei processi organizzativi e di sviluppo. Questo approccio favorisce l'identificazione tempestiva di criticità e opportunità di ottimizzazione, contribuendo a:

- Incrementare la qualità dei processi e del prodotto finale.
- Ridurre i costi attraverso azioni correttive mirate.
- Promuovere un ambiente di lavoro orientato alla crescita costante.
- Supportare il processo decisionale con dati oggettivi e misurabili.

### Valutazione sull'organizzazione

| Problema                | Descrizione                                                                                                         | Gravità | Soluzione                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Rotazione dei ruoli     | Difficoltà nel mantenere una rotazione efficace dei ruoli tra i membri del team, con squilibri nel carico di lavoro | Media   | Adottare un sistema di rotazione per ricoprire ruoli differenti ad ogni sprint, permettendo così l'acquisizione di competenze trasversali |
| Coordinamento asincrono | Sfide nella comunicazione e nel coordinamento quando i membri lavorano in momenti diversi                           | Alta    | Adottare strumenti di collaborazione asincrona e stabilire procedure chiare per la documentazione delle attività                          |

Table: Valutazione organizzazione

### Valutazione sui ruoli

| Problema     | Descrizione                                                                                                      | Gravità | Soluzione                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ |
| Analista     | Difficoltà nell'identificazione e documentazione corretta dei requisiti di sistema                               | Media   | Si è deciso di porre maggiore attenzione alla fase di analisi attraverso revisioni più frequenti |
| Verificatore | Criticità nell'esecuzione delle verifiche formali, con conseguente necessità di multiple iterazioni di revisione | Bassa   | Implementato un processo di verifica più approfondito in sviluppo e rilascio                     |

Table: Valutazione sui ruoli

### Valutazione sugli strumenti e le tecnologie utilizzate

| Problema    | Descrizione                                                                                            | Gravità | Soluzione                                                                                      |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------- | ---------------------------------------------------------------------------------------------- |
| Typescript  | La maggior parte dei membri del gruppo non è ancora familiare con questo linguaggio di programmazione. | Bassa   | Ogni membro ha seguito autonomamente un breve tutorial per acquisire le nozioni di base.       |
| API VS Code | La maggior parte dei membri del gruppo non conosce a fondo l'integrazione delle API in VS Code.        | Media   | Fornire documentazione dedicata e workshop per supportare l’integrazione delle API in VS Code. |

Table: Valutazione delle tecnologie

<!-- ::: {.no-export} -->

</NumberedWrapper>

<!-- ::: -->
