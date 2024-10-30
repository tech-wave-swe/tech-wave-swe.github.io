import os
import shutil

def is_file_newer(file1, file2):
    file1_mtime = os.path.getmtime(file1)
    file2_mtime = os.path.getmtime(file2)
    return 1 if file1_mtime > file2_mtime else 0 if file1_mtime == file2_mtime else -1

def print_relation(file1, file2):
    res = is_file_newer(file1, file2)

    if res == 1:
        print(f"File compilato is newer than sorgente")
    elif res == 0:
        print(f"File compilato and sorgente have the same timestamp")
    else:
        print(f"sorgente is newer than compilato")

def update_file(compiled, source):
    if is_file_newer(source, compiled) == 1:
        print(f"- File {compiled} aggiornato.")
        copy_file(source, compiled)

def copy_file(source, destination):
    shutil.copy(source, destination)

def get_pdf_files(directory):
    pdf_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.pdf'):
                pdf_files.append(os.path.join(root, file))
    return pdf_files

def __main__():

    print("TechWave File Manager:")

    compiled_folder = {
        'candidatura': '01 - Candidature\\',
    }

    source_folder = {
        'candidatura': 'src\\' + compiled_folder['candidatura'],
    }

    source_pdfs = get_pdf_files(source_folder['candidatura'])
    compiled_pdfs = get_pdf_files(compiled_folder['candidatura'])

    for source_pdf in source_pdfs:
        file_path = source_pdf[4:]
        if (file_path not in compiled_pdfs):
            print(f"- Nuovo file {file_path} creato.")
            copy_file(source_pdf, file_path)
            continue

        update_file(file_path, source_pdf)

    print("Sincronizzazione completata.")

if __name__ == "__main__":
    __main__()