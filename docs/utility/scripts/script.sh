# I want to retrive all the file in a specific directory
# and then compress them into a zip file.

root_dir=$(pwd)
utility_dir="$root_dir/utility"
docs_dir="$root_dir/docs"
filters_dir="$utility_dir/filters"
pdfs_out_dir="$root_dir/static/pdfs"

excluded_file=$(find $utility_dir | grep "excluded.conf")
template_file=$(find $utility_dir | grep "template.latex")

# Filters
remove_block_filter=$(find $filters_dir | grep "remove-blocks-filter.lua")
modify_glossary_filter=$(find $filters_dir | grep "modify-glossary-filter.lua")
images_filter=$(find $filters_dir | grep "images-filter.lua")
header_filter=$(find $filters_dir | grep "header-filter.lua")
table_filer=$(find $filters_dir | grep "table-filter.lua")

filters="-L $remove_block_filter -L $modify_glossary_filter -L $images_filter -L $header_filter -L $table_filer"

if [ $1 == "pdf" ]; then
    echo "Creating PDFs..."
    file_type="pdf"
elif [ $1 == "tex" ]; then
    echo "Creating latex..."
    file_type="tex"
elif [ $1 == "md" ]; then
    echo "Creating md..."
    file_type="md"
else
    echo "Creating pdfs..."
    file_type="pdf"
fi

# Check if the target directory exists.
if [ ! -d $docs_dir ]; then
    echo "The target directory $docs_dir does not exist. Exiting..."
    exit 1
fi

# Check if the target directory is empty.
if [ ! "$(ls -A $docs_dir)" ]; then
    echo "The target directory is empty. Exiting..."
    exit 1
fi

# Check if the excluded_dirs.conf file exists.
if [ ! -f $excluded_file ]; then
    echo "The excluded_dirs.conf file is not present. Not excluding any directories."
    files=$(find $docs_dir -regex ".*\.md$")
else
    files=$(find $docs_dir -regex ".*\.md$" | grep -v -f $excluded_file)
fi

echo "The folder is not empty. Proceeding..."

SECTION="## Versione PDF"

echo "$files" | while read -r file; do
    echo "Processing $file..."

    pdf_out="$pdfs_out_dir/$(basename "$file" .md).$file_type"

    # pandoc "$file" -f markdown -t markdown -o "$pdf_out"
    pandoc "$file" --listings --resource-path=./static $filters -f markdown --template "$template_file" -o "$pdf_out"

    #  # Controllo se la sezione è presente
    # if ! (grep -q "$SECTION" "$file"); then
    #     echo "" >> "$file"
    #     echo "" >> "$file"
    #     echo $SECTION >> "$file"
    #     echo "[Visualizza Versione PDF](/pdfs/$(basename "$file" .md).pdf)" >> "$file"
    # fi
done