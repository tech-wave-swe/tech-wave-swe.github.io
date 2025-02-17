local layout = pandoc.layout
local literal, empty, cr, concat, blankline, chomp, space, cblock, rblock,
  prefixed, nest, hang, nowrap =
  layout.literal, layout.empty, layout.cr, layout.concat, layout.blankline,
  layout.chomp, layout.space, layout.cblock, layout.rblock,
  layout.prefixed, layout.nest, layout.hang, layout.nowrap

Inlines = {}
Inlines.mt = {}
Inlines.mt.__index = function(tbl,key)
  return function() io.stderr:write("Unimplemented " .. key .. "\n") end
end
setmetatable(Inlines, Inlines.mt)

local function inlines(ils)
	local buff = {}
	for i=1,#ils do
		local el = ils[i]
		buff[#buff + 1] = Inlines[el.tag](el)
	end
	return concat(buff)
end

function parse_size(size)
	-- to parse width and height
	size = string.gsub(size,"(%%)", "")
	-- convert height XY% into 0.XY
	size = tonumber(size)
	if (size == nil) then
	  	size = 100.0
	end
	return size / 100.0
end
  

function Figure(el)
    -- if figure's child is a RawInline is because it has changed in Image
    if el.c[1].c[1].t == "RawInline" then
      	return el.c[1].c[1]
    end
end

function RawInline(el)
	if (el.format == "html") then
		local options = {}

		local pattern = "<img src=\"(.-)\" alt=\"(.-)\" .*\"(.-)\".*>"

		local src, alt, width = string.match(el.text, pattern)
		print(src)


		if (src) then

			local caption = alt

			src = string.sub(src, 6)

			-- width = el.attributes.width
			if (width) then
				width = parse_size(width)
				table.insert(options,string.format("width=%s\\linewidth",string.format("%f", width)))
			end

			local includefile = "includegraphics"
			if (string.sub(src,-3) == "svg") then
				includefile = "includesvg"
			end

			beg_v = "\\begin{center} "
			end_v = "\\end{center}"

			if (caption == "" or caption == " ") then
				latexstring = string.format(beg_v.." \\%s[%s]{%s} " ..end_v,includefile,table.concat(options,","),src)
			else
				latexstring = string.format(beg_v.." \\%s[%s]{%s} \\captionof{figure}{%s} " ..end_v ,includefile,table.concat(options,","),src,caption)
			end
			return pandoc.RawInline("latex", latexstring)

		end
	end
end
	
function Image(el)

	local options = {}

	local caption = ""
	-- Procesar cada elemento del caption para manejar texto y enlaces
	if (pandoc.utils.stringify(el.caption) ~= "") then
		caption = pandoc.utils.stringify(el.caption)
	end

	-- width = el.attributes.width
	if (el.attributes.width) then
		width = parse_size(el.attributes.width)
		table.insert(options,string.format("width=%s\\linewidth",string.format("%f", width)))
	end
	
	-- height = el.attributes.height
	if (el.attributes.height) then
		-- I don't use pecentages with the height
		table.insert(options,string.format("height=%s",string.format(el.attributes.height)))
	end

	local framed = ""
	if (el.attributes.framed) then
		framed = "frame"
		table.insert(options,framed)
	end

	local includefile = "includegraphics"
	if (string.sub(el.src,-3) == "svg") then
		includefile = "includesvg"
	end

	beg_v = "\\begin{center} "
	end_v = "\\end{center}"

	if (el.attributes.inline) then
		beg_v = ""
		end_v = ""
	end

	if (caption == "" or caption == " ") then
		latexstring = string.format(beg_v.." \\%s[%s]{%s} " ..end_v,includefile,table.concat(options,","),el.src)
	else
		latexstring = string.format(beg_v.." \\%s[%s]{%s} \\captionof{figure}{%s} " ..end_v ,includefile,table.concat(options,","),el.src,caption)
	end
	return pandoc.RawInline("latex", latexstring)
end