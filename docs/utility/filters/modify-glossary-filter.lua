function Str(el)
	local pattern = "(.-)%%(.-)|([^%s%%]+)%%(.*)"

	if string.match(el.text, pattern) then
		before, w1, w2, after = string.match(el.text, pattern)
		
		el = {string.sub(w1, 2), pandoc.Subscript(pandoc.Str("[G]"))}

		return {before, pandoc.Emph(el), string.sub(after, 2)}
	end

	return el
end

function Para(el)
    return check_multi_glossary(el)
end

function Inlines(el)
	
	local str = pandoc.utils.stringify(el)

	local pattern = "([^%%]+)%%([^|]+)|.*%%(.*)"
	before, match, after = string.match(str, pattern)

	if match then
		el = pandoc.Inlines({before, pandoc.Emph({string.sub(match, 2), pandoc.Subscript(pandoc.Str("[G]"))}), after})
	end

	return el

end

function check_multi_glossary(el)
	local inlines = el.content
    local new_inlines = {}
	local last_i = nil
	local check = false

    for i = 1, #inlines do
        local current = inlines[i]
        
        local pattern = "([^%%]+)%%([^|%s]+)"
        local pattern2 = "([^|]+)|([^%s%%]+)%%(.*)"
        
        if current.t == "Str" then
            local text = current.text

			if check then
				local w1, w2, after = text:match(pattern2)
				if w1 then
					check = false
					last_i = nil
					table.insert(new_inlines, pandoc.Emph(w1))
					table.insert(new_inlines, pandoc.Emph(pandoc.Subscript(pandoc.Str("[G]"))))
				else
					table.insert(new_inlines, pandoc.Emph(text))
				end
			else
				local before, w1 = text:match(pattern)

				if w1 then
					check = true
					last_i = i
					table.insert(new_inlines, pandoc.Str(before))
					table.insert(new_inlines, pandoc.Emph(string.sub(w1, 2)))
				else
					table.insert(new_inlines, current)
				end
			end
        else
            table.insert(new_inlines, current)
        end
    end

	if check then
		truncate_table(new_inlines, last_i)

		for i = last_i, #inlines do
			current = inlines[i]
			table.insert(new_inlines, current)
		end
	end

	el.content = new_inlines
    return el
end

function truncate_table(tbl, start_index)
    for i = start_index, #tbl do
        tbl[i] = nil
    end
end