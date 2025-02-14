---
id: piano_di_qualifica
title: "Piano di Qualifica"
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di Qualifica

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                                                                            | Autore                | Data Verifica | Verificatore          |
| ---------- | -------- | -------------------------------------------------------------------------------------- | --------------------- | ------------- | --------------------- |
| 08/12/2024 | 1.0.0    | Prima stesura del documento                                                            | Manuel Felipe Vasquez | 10/12/2024    | Luca Monetti          |
| 16/12/2024 | 1.1.0    | aggiunta qualità di processo                                                           | Giulia Marcon         | 17/12/2024    | Agnese Carraro        |
| 22/12/2024 | 1.2.0    | Aggiunte metriche di qualità di Prodotto                                               | Gaia Pistori          | 24/12/2024    | Manuel Felipe Vasquez |
| 03/01/2025 | 1.3.0    | Modifica descrizione e riferimenti                                                     | Manuel Felipe Vasquez | 06/01/2025    | Luca Monetti          |
| 16/01/2025 | 1.4.0    | Aggiunte misure                                                                        | Luca Monetti          |               |                       |

</details>

<TOCInlineWrapper toc={toc} numbered={true}/>
<NumberedWrapper toc={toc}>

## Introduzione

### Scopo del Documento

Questo documento delinea le strategie di verifica, validazione e quality assurance adottate durante lo sviluppo del progetto, definendo gli obiettivi qualitativi e le relative metriche di misurazione. Include la documentazione dettagliata delle procedure di verifica, dei processi di controllo qualità, e delle metodologie di test implementate nelle varie fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team.
Si concentra su:
- La qualità dei processi, in termini di aderenza agli standard e alle pratiche di gestione del ciclo di vita del software.
- La qualità del prodotto, attraverso la definizione di metriche misurabili e verificabili.
- L'adozione di un modello a V per la pianificazione e l'esecuzione delle attività di test e validazione.

### Glossario

Per una definizione dei termini tecnici utilizzati in questo documento, consultare il [Glossario](./Glossario.md).

### Riferimenti

#### Riferimenti Normativi

- **Norme di Progetto**: [Norme di Progetto](./Norme%20di%20Progetto.md)
- **Capitolato d'Appalto C8: Requirement Tracker- Plug-in VS Code**: https://www.math.unipd.it/~tullio/IS-1/2024/Progetto/C8.pdf

#### Riferimenti Informativi

- T2 - I processi di ciclo di vita del software
(https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)
T7 - Qualità del software (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf)
T8 - Qualità di processo (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf)

- **ISO/IEC 9126**: "Software engineering - Product quality - Part 1: Quality model"
- **ISO/IEC 12207**: "Information technology - Software life cycle processes"
- **ISO/IEC 14598**: "Information technology - Software product evaluation"
- **ISO/IEC 25010**: "Systems and software engineering - Systems and software Quality Requirements and Evaluation (SQuaRE) - System and software quality models"

## Qualità di Processo

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le attività di supporto necessarie per lo sviluppo di un prodotto software.

### Processi Primari

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPR01 | **Varianza di Budget** | Differenza tra il budget pianificato e quello effettivamente speso | Monitorare il controllo dei costi del progetto | ≤ 5% | ≤ 2% |
| MPR02 | **Varianza di impegno d'orario** | Differenza tra le ore pianificate e quelle effettivamente impiegate | Garantire l'efficienza nell'allocazione delle risorse | ≤ 10% | ≤ 5% |
| MPR03 | **Earned Value** | Valore del lavoro effettivamente svolto | Monitorare l'avanzamento economico del progetto | ≥ 95% | 100% |
| MPR04 | **Actual Cost** | Costo effettivo sostenuto per il lavoro svolto | Controllare le spese del progetto | ≤ Budget previsto | < Budget previsto |
| MPR05 | **Planned Value** | Valore del lavoro pianificato fino a una data specifica | Comparare il progresso pianificato con quello reale | N/A | N/A |
| MPR06 | **Cost Variance** | Differenza tra il valore acquisito e il costo effettivo | Valutare l'efficienza economica del progetto | ≥ -5% | ≥ 0% |
| MPR07 | **Schedule Variance** | Differenza tra il valore acquisito e il valore pianificato | Valutare l'aderenza ai tempi di progetto | ≥ -5% | ≥ 0% |
| MPR08 | **Cost Performance Index** | Rapporto tra il valore acquisito e il costo effettivo | Misurare l'efficienza dei costi | ≥ 0.95 | ≥ 1.0 |
| MPR09 | **Schedule Performance Index** | Rapporto tra il valore acquisito e il valore pianificato | Misurare l'efficienza temporale | ≥ 0.95 | ≥ 1.0 |

### Processi di Supporto

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPS01 | **Estimate At Completion** | Stima dei costi per il completamento del progetto | Prevedere i costi rimanenti e pianificare le risorse necessarie | ≤ Budget previsto | < Budget previsto |
| MPS02 | **Estimate To Complete** | Costo stimato per completare le attività rimanenti | Supportare la pianificazione finanziaria e delle risorse | ≤ Budget previsto | < Budget previsto |
| MPS03 | **Budget At Completion** | Totale del budget allocato per il progetto | Gestire e controllare le risorse finanziarie complessive | N/A | N/A |
| MPS04 | **Indice Gulpease** | Indice di leggibilità dei documenti | Garantire la comprensibilità della documentazione | ≥ 40 | ≥ 60 |

### Processi Organizzativi

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPO01 | **Rischi non preventivati** | Numero di rischi emersi non pianificati inizialmente | Identificare e gestire tempestivamente nuovi rischi | ≤ 3 | 0 |
| MPO02 | **Correttezza documenti** | Percentuale di documenti privi di errori | Garantire la qualità e l'affidabilità della documentazione | ≥ 90% | 100% |

## Qualità di Prodotto

Per garantire la qualità del prodotto, il team adotta il modello di riferimento ISO/IEC 9126, che definisce un modello di qualità del software basato su sei caratteristiche fondamentali: funzionalità, affidabilità, usabilità, efficienza, manutenibilità e portabilità.

### Funzionalità

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPF01 | Requisiti Obbligatori | Percentuale soddisfazione requisiti obbligatori | Garantire funzionalità essenziali | 100% | 100% |
| MPF02 | Requisiti Desiderabili | Percentuale soddisfazione requisiti desiderabili | Fornire funzionalità aggiuntive | ≥ 80% | ≥ 90% |
| MPF03 | Requisiti Opzionali | Percentuale soddisfazione requisiti opzionali | Implementare funzionalità extra | ≥ 50% | ≥ 70% |

### Affidabilità

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPA01 | Branch Coverage | Copertura dei test per i branch del codice | Garantire test completi | ≥ 80% | ≥ 90% |
| MPA02 | Statement Coverage | Copertura dei test per gli statement | Assicurare testing completo | ≥ 85% | ≥ 95% |
| MPA03 | Gestione Errori | Percentuale di errori gestiti correttamente | Garantire robustezza | ≥ 90% | ≥ 95% |

### Usabilità

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPU01 | Tempo di Risposta | Tempo medio di risposta del modello | Garantire reattività | ≤ 2s | ≤ 1s |
| MPU02 | Errori Utente | Tasso di errori utente per operazione | Minimizzare errori | ≤ 5% | ≤ 2% |
| MPU03 | Prevenzione Errori | Percentuale di azioni utente errate prevenute | Proteggere da errori | ≥ 80% | ≥ 90% |

### Efficienza

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPE01 | Profondità Gerarchie | Livelli di profondità delle gerarchie | Ottimizzare struttura | ≤ 5 | ≤ 3 |
| MPE02 | Utilizzo Risorse | Consumo medio CPU/memoria | Minimizzare risorse | ≤ 30% | ≤ 20% |
| MPE03 | Capacità | Numero massimo di requisiti gestibili | Garantire scalabilità | ≥ 50 | ≥ 100 |

### Manutenibilità

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPM01 | Modularità | Grado di accoppiamento tra moduli | Ridurre dipendenze | ≤ 0.5 | ≤ 0.3 |
| MPM02 | Riusabilità | Percentuale di componenti riutilizzabili | Promuovere riuso | ≥ 60% | ≥ 80% |
| MPM03 | Complessità | Complessità ciclomatica media per modulo | Mantenere semplicità | ≤ 10 | ≤ 7 |
| MPM04 | Testabilità | Percentuale di codice coperto da test | Facilitare testing | ≥ 80% | ≥ 90% |

### Portabilità

| Metrica | Nome | Descrizione | Obiettivo | Valore Accettabile | Valore Desiderabile |
| ------- | ---- | ----------- | --------- | ------------------ | ------------------- |
| MPP01 | Adattabilità | Effort per cambio ambiente (ore) | Facilitare portabilità | ≤ 2h | ≤ 1h |
| MPP02 | Installabilità | Tempo medio di installazione | Semplificare setup | ≤ 15min | ≤ 5min |
| MPP03 | Sostituibilità | Effort per sostituire impostazioni | Facilitare modifiche | ≤ 10m | ≤ 5min |

## Specifica dei Test

I test di verifica e validazione vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.


## Cruscotto di valutazione

</NumberedWrapper>
