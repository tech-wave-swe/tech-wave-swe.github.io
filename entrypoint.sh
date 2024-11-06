#!/bin/bash

mkdir -p output
cd src
while IFS= read -r tex_file; do
  if [ -f "$tex_file" ]; then
    output_dir="../output/$(dirname "$tex_file")"
    mkdir -p "$output_dir"
    pdflatex -interaction=nonstopmode -output-directory "$output_dir" "$tex_file" || true
    pdflatex -interaction=nonstopmode -output-directory "$output_dir" "$tex_file" || true
  fi
done < ../modified_files.txt
