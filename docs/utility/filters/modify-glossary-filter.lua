function Str(el)

	local pattern = "(.-)%%([^|]+)|([^%s%%]+)%%(.*)"

	if string.match(el.text, pattern) then
		before, w1, w2, after = string.match(el.text, pattern)
		
		el = {string.sub(w1, 2), pandoc.Subscript(pandoc.Str("[G]"))}

		return {before, pandoc.Emph(el), string.sub(after, 2)}
	end

	return el
end