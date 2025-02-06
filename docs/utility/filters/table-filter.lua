local layout = pandoc.layout

function generate_tabularray(tbl)
	local table_class = 'tblr'
  
	if (tbl.attributes['tablename'] ~= nil) then
	  table_class = tbl.attributes['tablename']
	end

	print(pandoc.utils.stringify(tbl.caption.long))
  
	local caption = pandoc.utils.stringify(tbl.caption.long)
  
	-- COLSPECS
	local col_specs = tbl.colspecs
	local col_specs_latex = ''
	for i, col_spec in ipairs(col_specs) do
	  local align = col_spec[1]
	  local width = col_spec[2]

	  if width ~= nil and width > 0.5 then
		width = 2
	  else
		width = 1
	  end

	  col_specs_latex = col_specs_latex .. 'X['

	  if align == 'AlignLeft' then
		col_specs_latex = col_specs_latex .. 'l,'
	  elseif align == 'AlignRight' then
		col_specs_latex = col_specs_latex .. 'r,'
	  else -- elseif align == 'AlignCenter' then
		col_specs_latex = col_specs_latex .. 'c,'
	  end
  
	  if width ~= 0 and width ~= nil then
		col_specs_latex = col_specs_latex .. width
	  end
  
	  col_specs_latex = col_specs_latex .. ']'
	end
  
	local result = pandoc.List:new{pandoc.RawBlock("latex", '\\noindent\\begin{table}[h]\\centering\\caption{' .. caption .. '}\\begin{'..table_class..'}{width=1\\linewidth,colspec={'..col_specs_latex..'}}')}
  
	-- HEADER
	local header_latex = get_rows_data(tbl.head.rows)
	result = result .. pandoc.List:new{pandoc.RawBlock("latex", header_latex)}
  
	-- ROWS
	local rows_latex = ''
	for j, tablebody in ipairs(tbl.bodies) do
	  rows_latex = get_rows_data(tablebody.body)
	end
	result = result .. pandoc.List:new{pandoc.RawBlock("latex", rows_latex)}
  
	-- FOOTER
	local footer_latex = get_rows_data(tbl.foot.rows)
	result = result .. pandoc.List:new{pandoc.RawBlock("latex", footer_latex)}
  
	result = result .. pandoc.List:new{pandoc.RawBlock("latex", '\\end{'..table_class..'}\\end{table}')}

	if caption == "Changelog" then
		result = result .. pandoc.List:new{pandoc.RawBlock("latex", "\\newpage")}
	end

	return result
end
  

function get_rows_data(rows)
	local data = ''
	for j, row in ipairs(rows) do
	  for k, cell in ipairs(row.cells) do
		if cell.contents[1] ~= nil then
		  content = pandoc.utils.stringify(cell.contents[1].content)
		  data = data .. content
		end
		if (k == #row.cells) then
		  data = data .. ' \\\\ \n'
		else
		  data = data .. ' & '
		end
	  end
	end
	return layout.render(data)
  end

function Table (tbl)
	return generate_tabularray(tbl)
end