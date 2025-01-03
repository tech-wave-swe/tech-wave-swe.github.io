---
id: piano_di_qualifica
title: "Piano di Qualifica"
---

import TOCInlineWrapper from "@site/src/components/TOCInlineWrapper.jsx";
import NumberedWrapper from "@site/src/components/NumberedWrapper.jsx";

# Documento del Piano di Qualifica

<details>
  <summary>Changelog</summary>

| Data       | Versione | Descrizione                              | Autore                | Data Verifica | Verificatore          |
|------------|----------|------------------------------------------|-----------------------|---------------|-----------------------|
| 03/01/2025 | 1.3.0    | Modifica descrizione e riferimenti       | Manuel Felipe Vasquez | 06/01/2025    |                       |
| 22/12/2024 | 1.2.0    | Aggiunte metriche di qualità di Prodotto | Gaia Pistori          | 24/12/2024    | Manuel Felipe Vasquez |
| 16/12/2024 | 1.1.0    | aggiunta qualità di processo             | Giulia Marcon         | 17/12/2024    | Agnese Carraro        |
| 08/12/2024 | 1.0.0    | Prima stesura del documento              | Manuel Felipe Vasquez | 10/12/2024    | Luca Monetti          |

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

- T2 - I processi di ciclo di vita del software (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T02.pdf)
- T7 - Qualità del software (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T07.pdf)
- T8 - Qualità di processo (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T08.pdf)
- T9 - Verifica e Validazione (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T09.pdf)
- T10 - Analisi Statica (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T10.pdf)
- T11 - Analisi Dinamica (https://www.math.unipd.it/~tullio/IS-1/2024/Dispense/T11.pdf)

- **ISO/IEC 9126**: "Software engineering - Product quality - Part 1: Quality model"
- **ISO/IEC 12207**: "Information technology - Software life cycle processes"
- **ISO/IEC 14598**: "Information technology - Software product evaluation"
- **ISO/IEC 25010**: "Systems and software engineering - Systems and software Quality Requirements and Evaluation (SQuaRE) - System and software quality models"

## Qualità di Processo

Per garantire la qualità dei processi, il team adotta il modello di riferimento ISO/IEC 12207, che definisce i processi di ciclo di vita del software e le attività di supporto necessarie per lo sviluppo di un prodotto software.

### Processi Primari

| Metrica | Nome                           | Descrizione                                                        | Obiettivo                                           | Valore Accettabile | Valore Desiderabile |
|---------|--------------------------------|--------------------------------------------------------------------|-----------------------------------------------------|--------------------|---------------------|
| MPCR01  | **Budget Variance**            | Differenza tra il budget pianificato e quello effettivamente speso | Monitorare il controllo dei costi del progetto      | ≤ 5%               | ≤ 2%                |
| MPCR02  | **Earned Value**               | Valore del lavoro effettivamente svolto                            | Monitorare l'avanzamento economico del progetto     | ≥ Actual Cost      | -                   |
| MPCR03  | **Actual Cost**                | Costo effettivo sostenuto per il lavoro svolto                     | Controllare le spese del progetto                   | ≤ Budget previsto  | < Budget previsto   |
| MPCR04  | **Planned Value**              | Valore del lavoro pianificato fino a una data specifica            | Comparare il progresso pianificato con quello reale | N/A                | N/A                 |
| MPCR05  | **Cost Variance**              | Differenza tra il valore acquisito e il costo effettivo            | Valutare l'efficienza economica del progetto        | ≥ -5%              | ≥ 0%                |
| MPCR06  | **Schedule Variance**          | Differenza tra il valore acquisito e il valore pianificato         | Valutare l'aderenza ai tempi di progetto            | ≥ -5%              | ≥ 0%                |

#### Budget Variance

**Metrica**: MPCR01

**Formula:** $\text{Budget Variance} = 100 \times \dfrac{\text{Budget Consuntivo} − \text{Budget Pianificato}}{\text{Budget Pianificato}}$
- Questo indice misura la differenza tra il budget pianificato e quello effettivamente speso.
- Un valore positivo indica un risparmio rispetto al budget, mentre un valore negativo indica un costo superiore a quanto preventivato.
---
#### Earned Value

**Metrica**: MPCR02

**Formula:** $\text{Earned Value} = \sum (\text{Percentuale Completamento} \times \text{Budget Pianificato})$
- Il valore del lavoro effettivamente completato, calcolato moltiplicando la percentuale di completamento di ciascuna attività per il suo budget pianificato.
- Rappresenta quanto valore è stato prodotto in base al lavoro effettivamente svolto.
---
#### Actual Cost

**Metrica**: MPCR03

**Formula:** $\text{Actual Cost} = \overset{\text{n° sprint}}{\underset{i=0}{\sum}} (\text{Budget Consuntivo}_i)$
- Somma di tutti i costi realmente sostenuti per il lavoro completato fino ad oggi.
- Include costi diretti e indiretti effettivamente spesi nel progetto.
---
#### Planned Value

**Metrica**: MPR04

**Formula**: $\text{Planned Value} = \text{Actual Cost}_{i-1} + \text{Budget Pianificato}_i$
- $i$ è il numero corrente di sprint.
- Rappresenta il budget autorizzato assegnato al lavoro pianificato.
- Indica quanto lavoro dovrebbe essere stato completato ad una determinata data.
---
#### Cost Variance

**Metrica**: MPR05

**Formula**: $\text{Cost Variance} = \text{Earned Value} - \text{Actual Cost}$
- Misura la differenza tra il valore del lavoro completato e il suo costo effettivo.
- Un valore positivo indica che il progetto sta spendendo meno del previsto.
---
#### Schedule Variance

**Metrica**: MPCR06

**Formula**: $\text{Schedule Variance} = \text{Earned Value} - \text{Planned Value}$
- Misura la differenza tra il lavoro completato e quello pianificato.
- Un valore positivo indica che il progetto è in anticipo sulla schedulazione.

### Processi di Supporto

| Metrica | Nome                       | Descrizione                                        | Obiettivo                                                       | Valore Accettabile         | Valore Desiderabile          |
|---------|----------------------------|----------------------------------------------------|-----------------------------------------------------------------|----------------------------|------------------------------|
| MPCS01  | **Estimate At Completion** | Stima dei costi per il completamento del progetto  | Prevedere i costi rimanenti e pianificare le risorse necessarie | ≤ Budget At Completion     | Corrispondente al preventivo |
| MPCS02  | **Estimate To Complete**   | Costo stimato per completare le attività rimanenti | Supportare la pianificazione finanziaria e delle risorse        | ≤ Budget At Completion     | ≤ Estimate At Completion     |
| MPCS03  | **Budget At Completion**   | Totale del budget allocato per il progetto         | Gestire e controllare le risorse finanziarie complessive        | ≤ +10% del budget iniziale | Corrispondente al preventivo |

#### Estimate At Completion

**Metrica**: MPCS01

**Formula**: $\text{Estimate At Completion} = \text{Actual Cost} + \text{Estimate To Complete}$
- Stima del costo totale del progetto al suo completamento
- Combina i costi già sostenuti (AC) con la stima dei costi rimanenti (ETC)
- Utile per prevedere il budget finale necessario e identificare potenziali sforamenti
---
#### Estimate To Complete

**Metrica**: MPCS02

**Formula**: $\text{Estimate To Complete} = \dfrac{\text{Budget At Completion} - \text{Earned Value}}{\text{Cost Performance Index}}$
- Stima del costo necessario per completare il lavoro rimanente
- Tiene conto dell'efficienza attuale del progetto attraverso il CPI
- Permette di pianificare le risorse necessarie per il completamento
---
#### Budget At Completion

**Metrica**: MPCS03

**Formula**: $\text{Budget At Completion} = \sum \text{(Budget Pianificato) per ogni attività}$
- Rappresenta il budget totale autorizzato per il progetto
- Serve come baseline per valutare le performance di costo
- Include tutte le riserve di contingenza allocate

### Processi Organizzativi

| Metrica | Nome                        | Descrizione                                          | Obiettivo                                                  | Valore Accettabile | Valore Desiderabile |
|---------|-----------------------------|------------------------------------------------------|------------------------------------------------------------|--------------------|---------------------|
| MPCO01  | **Rischi non preventivati** | Numero di rischi emersi non pianificati inizialmente | Identificare e gestire tempestivamente nuovi rischi        | ≤ 3                | 0                   |
| MPCO02  | **Correttezza documenti**   | Percentuale di documenti privi di errori             | Garantire la qualità e l'affidabilità della documentazione | ≥ 70%              | 100%                |

#### Rischi non preventivati

**Metrica**: MPCO01

**Formula**: $\text{Rischi non preventivati} = \text{Numero totale rischi emersi} - \text{Numero rischi previsti}$
- Monitora l'efficacia del processo di risk management
- Aiuta a valutare la completezza dell'analisi dei rischi iniziale
- Un numero elevato può indicare la necessità di migliorare il processo di identificazione dei rischi
---
#### Correttezza documenti

**Metrica**: MPCO02

**Formula**: $\text{Correttezza} = 100 \times \dfrac{\text{Numero documenti senza errori}}{\text{Numero totale documenti}}$
- Misura la qualità complessiva della documentazione prodotta
- Include errori di forma, contenuto e conformità agli standard
- Importante per garantire la comunicazione efficace e la manutenibilità del progetto
- Gli errori vengono identificati durante le revisioni e le verifiche formali

## Qualità di Prodotto

Per garantire la qualità del prodotto, il team adotta il modello di riferimento ISO/IEC 9126, che definisce un modello di qualità del software basato su sei caratteristiche fondamentali: funzionalità, affidabilità, usabilità, efficienza, manutenibilità e portabilità.

### Funzionalità

| Metrica | Nome                   | Descrizione                                      | Obiettivo                         | Valore Accettabile | Valore Desiderabile |
|---------|------------------------|--------------------------------------------------|-----------------------------------|--------------------|---------------------|
| MPRF01  | Requisiti Obbligatori  | Percentuale soddisfazione requisiti obbligatori  | Garantire funzionalità essenziali | 100%               | 100%                |
| MPRF02  | Requisiti Desiderabili | Percentuale soddisfazione requisiti desiderabili | Fornire funzionalità aggiuntive   | ≥ 0%               | ≥ 80%               |
| MPRF03  | Requisiti Opzionali    | Percentuale soddisfazione requisiti opzionali    | Implementare funzionalità extra   | ≥ 0%               | ≥ 50%               |

### Affidabilità

| Metrica | Nome               | Descrizione                                 | Obiettivo                   | Valore Accettabile | Valore Desiderabile |
|---------|--------------------|---------------------------------------------|-----------------------------|--------------------|---------------------|
| MPRA01  | Statement Coverage | Copertura dei test per gli statement        | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA02  | Branch Coverage    | Copertura dei test per i branch del codice  | Garantire test completi     | ≥ 80%              | ≥ 90%               |
| MPRA03  | Condition Coverage | Copertura dei test le condition             | Assicurare testing completo | ≥ 80%              | ≥ 90%               |
| MPRA03  | Gestione Errori    | Percentuale di errori gestiti correttamente | Garantire robustezza        | ≥ 80%              | ≥ 90%               |

### Usabilità

| Metrica | Nome               | Descrizione                                   | Obiettivo            | Valore Accettabile | Valore Desiderabile |
|---------|--------------------|-----------------------------------------------|----------------------|--------------------|---------------------|
| MPRU01  | Tempo di Risposta  | Tempo medio di risposta del modello           | Garantire reattività | ≤ 10s              | ≤ 5s                |
| MPRU02  | Errori Utente      | Tasso di errori utente per operazione         | Minimizzare errori   | ≤ 10%              | ≤ 5%                |
| MPRU03  | Prevenzione Errori | Percentuale di azioni utente errate prevenute | Proteggere da errori | ≥ 80%              | ≥ 90%               |

### Efficienza

| Metrica | Nome                 | Descrizione                           | Obiettivo             | Valore Accettabile | Valore Desiderabile |
|---------|----------------------|---------------------------------------|-----------------------|--------------------|---------------------|
| MPRE01  | Profondità Gerarchie | Livelli di profondità delle gerarchie | Ottimizzare struttura | ≤ 7                | ≤ 5                 |
| MPRE02  | Utilizzo Risorse     | Consumo medio CPU/memoria             | Minimizzare risorse   | ≤ 30%              | ≤ 20%               |
| MPRE03  | Capacità             | Numero massimo di requisiti gestibili | Garantire scalabilità | ≥ 50               | ≥ 100               |

### Manutenibilità

| Metrica | Nome        | Descrizione                              | Obiettivo            | Valore Accettabile | Valore Desiderabile |
|---------|-------------|------------------------------------------|----------------------|--------------------|---------------------|
| MPRM01  | Modularità  | Grado di accoppiamento tra moduli        | Ridurre dipendenze   | ≤ 0.5              | ≤ 0.3               |
| MPRM02  | Riusabilità | Percentuale di componenti riutilizzabili | Promuovere riuso     | ≥ 50%              | ≥ 70%               |
| MPRM03  | Complessità | Complessità ciclomatica media per modulo | Mantenere semplicità | ≤ 10               | ≤ 7                 |
| MPRM04  | Testabilità | Percentuale di codice coperto da test    | Facilitare testing   | ≥ 70%              | ≥ 85%               |

### Portabilità

| Metrica | Nome           | Descrizione                        | Obiettivo              | Valore Accettabile | Valore Desiderabile |
|---------|----------------|------------------------------------|------------------------|--------------------|---------------------|
| MPRP01  | Adattabilità   | Effort per cambio ambiente (ore)   | Facilitare portabilità | ≤ 2h               | ≤ 1h                |
| MPRP02  | Installabilità | Tempo medio di installazione       | Semplificare setup     | ≤ 15min            | ≤ 5min              |
| MPRP03  | Sostituibilità | Effort per sostituire impostazioni | Facilitare modifiche   | ≤ 10m              | ≤ 5min              |

## Specifica dei Test

I test di verifica e validazione vengono eseguiti in tutte le fasi del ciclo di sviluppo, garantendo la conformità del prodotto con i requisiti specificati e gli standard qualitativi prestabiliti dal team. I test vengono classificati in quattro categorie principali: test di unità, test di integrazione, test di sistema e test di accettazione.

## Cruscotto di valutazione

</NumberedWrapper>
